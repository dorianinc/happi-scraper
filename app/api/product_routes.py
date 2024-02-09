import asyncio
from flask import Blueprint, request, make_response, jsonify
from app.models import db, Product, Website
from app.forms import ProductForm, MatchForm
from app.controllers.product_scraper import find_matches


product_routes = Blueprint("products", __name__)

#-----------------------------helper function---------------------------------------#
def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = {}
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages[f"{field}"] = f"{error}"
    return errorMessages
#------------------------------------------------------------------------------------#

@product_routes.route("")
def get_all_products():
    """"Get all products"""
    products = Product.query.all()
    return [product.to_dict(include_matches=True) for product in products]

@product_routes.route("/<int:product_id>")
def get_product_by_id(product_id):
    """"Get single product by id"""
    product = Product.query.get(product_id)
    if not product:
        error = make_response("Product does not exist")
        error.status_code = 4041
        return error
    return product.to_dict(include_matches=True)

@product_routes.route("/<int:product_id>/products")
def get_websites_by_product_id(product_id):
    """ Get all websites of specific product """
    websites = Website.query.filter(Website.product_id == product_id).all()
    return [website.to_dict() for website in websites]

@product_routes.route("/new", methods=["POST"])
def create_a_product():
    """"Create a product"""           
    form = ProductForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        
        data = form.data
        product = Product(
            name=data["name"],
            img_src=data["img_src"]
        )
        
        db.session.add(product)
        db.session.commit()
        
        product_dict = product.to_dict()
        asyncio.run(find_matches(product_dict["name"], product_dict["id"]))       
        return product_dict
    return {"errors": validation_errors_to_error_messages(form.errors)}, 400