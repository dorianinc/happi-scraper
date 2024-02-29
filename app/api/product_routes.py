import asyncio
from flask import Blueprint, request, make_response, jsonify
from app.models import db, Product, Website
from app.forms import ProductForm, MatchForm
from app.controllers.product_scraper import create_match


product_routes = Blueprint("products", __name__)

# ---------------------------- helper function --------------------------------------#

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = {}
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages[f"{field}"] = f"{error}"
    return errorMessages
# ------------------------------------------------------------------------------------#


@product_routes.route("/", methods=['GET'])
def get_all_products():
    """"Get all products"""
    print("query string 👉👉", request.query_string)
    offset = request.args.get('offset')
    print(f"offset 👉👉 {offset}")
    products = Product.query.offset(9).limit(9)
    return [product.to_dict(include_matches=False) for product in products]


@product_routes.route("/<int:product_id>", methods=['GET'])
def get_product_by_id(product_id):
    """"Get single product by id"""
    product = Product.query.get(product_id)
    if not product:
        error = make_response("Product does not exist")
        error.status_code = 404
        return error
    return product.to_dict(include_matches=True)


@product_routes.route("/new", methods=["POST"])
def create_a_product():
    """"Create a product"""
    form = ProductForm()
    csrf_token = request.cookies["csrf_token"]
    form["csrf_token"].data = csrf_token
    if form.validate_on_submit():
        data = form.data
        product = Product(
            name=data["name"],
        )
        db.session.add(product)
        db.session.commit()

        avg_price = asyncio.run(create_match(product))
        if avg_price:
            product.avg_price = avg_price
            db.session.commit()
            return product.to_dict()
        else:
            db.session.delete(product)
            db.session.commit()
            res = make_response(jsonify({"message": "Successfully deleted"}), 200)
            return res       
    errors = validation_errors_to_error_messages(form.errors)
    print("FORM ERRORS ==> ", errors)
    return {"errors": errors}, 400
