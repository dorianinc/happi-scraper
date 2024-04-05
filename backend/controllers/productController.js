const { Product, Match } = require("../db/models/index.js");
const { doesNotExist } = require("../utils/helpers.js");

// Get all products
exports.getAllProducts = async (req, res) => {
  //  start of querying settings //
  ////////// start of page and size logic /////////////
  let { page, size } = req.query;

  // set defaults for page and sizes
  if (!page) page = 1;
  if (!size) size = 20;

  // convert page and size into numbers
  page = parseInt(page);
  size = parseInt(size);

  // declare limits for page and size
  if (page > 10) page = 10;
  if (size > 20) size = 20;

  let pagination = {};
  pagination.limit = size;
  pagination.offset = size * (page - 1);
  ////////// end of page and size logic /////////////
  // end of querying settings //

  const products = await Product.findAll({
    ...pagination,
    raw: true,
  });

  for (const product of products) {
    const matches = await Match.findAll({
      where: {
        productId: product.id,
      },
      raw: true,
    });

    if (matches.length) product.imgSrc = matches[0].imgSrc;
    else product.imgSrc = null;
    product.matches = matches;
  }

  res.status(200).json(products);
};

// Get product count
exports.getProductCount = async (req, res) => {
  const productCount = await Product.count();
  res.status(200).json(productCount);
};

// Get single product Details
exports.getProductById = async (req, res) => {
  console.log("getting single product");
  const productId = req.params.id;
  const product = await Product.findByPk(productId, { raw: true });

  if (!product) res.status(404).json(doesNotExist("Product"));
  else {
    const matches = await Match.findAll({
      where: {
        productId: productId,
      },
    });
    product.matches = matches;

    if (matches.length) product.imgSrc = matches[0].imgSrc;
    else product.imgSrc = null;

    res.status(200).json(product);
  }
};

// Create a new Product
exports.createProduct = async (req, res) => {
  for (property in req.body) {
    let value = req.body[property];
    data[property] = value;
  }
  const newProduct = await Product.create({ ...reqData });
  res.status(201).json(newProduct);
};

// Delete a Product
// under construction
exports.deleteProductById = async (req, res) => {
  console.log("🖥️  req.params: ", req.params);
  const product = await Product.findByPk(req.params.id);
  console.log("🖥️  product: ", product);
  if (!product) res.status(404).json(doesNotExist("Product"));
  else {
    await product.destroy();
    res.status(200).json({
      message: "Successfully deleted",
      statusCode: 200,
    });
  }
};
