import "./ProductItem.css";

const ProductItem = ({ product }) => {
  console.log("🖥️  >> file: index.js:5 >> ProductItem >> product: ", product);
  if (!product.id) return null;
  return (
    <div className="product-item-card">
      <img
        style={{ height: "100px", width: "200px" }}
        src="https://i.redd.it/j2ex7z8tyqf21.jpg"
      />
      <div className="product-card-body">
        <p style={{ fontSize: ".9em", fontWeight: "600" }}>{product.name}</p>
        <p style={{ fontWeight: "400" }}>average price: $60</p>
      </div>
    </div>
  );
};

export default ProductItem;
