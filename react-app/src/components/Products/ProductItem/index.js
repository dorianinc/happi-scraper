import "./ProductItem.css";

const ProductItem = ({ product }) => {
  if (!product) return null;
  
  return (
    <div className="product-item-card">
      <img
        style={{ height: "100px", width: "200px" }}
        alt={product.id}
        src={product.img_src}
      />
      <div className="product-card-body">
        <p style={{ fontSize: ".9em", fontWeight: "600" }}>{product.name}</p>
        <p style={{ fontWeight: "400" }}>average price: $60</p>
        {/* <p style={{ fontWeight: "400" }}>average price: {product.avg_price}</p> */}
      </div>
    </div>
  );
};

export default ProductItem;
