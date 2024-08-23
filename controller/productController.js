// const uniqid = require("uniqid");
const { Product, Match } = require("../db");
const { scrapeForPrices } = require("../utils/scraper.js");
const { calculateAverage } = require("../utils/helpers.js");

// Get all products
const getProducts = async ({ page, size }) => {
  try {
    // Start of querying settings //
    ////////// Start of page and size logic /////////////

    // Set defaults for page and sizes
    if (!page) page = 1;
    if (!size) size = 20;

    // Convert page and size into numbers
    page = parseInt(page);
    size = parseInt(size);

    // Declare limits for page and size
    if (page > 10) page = 10;
    if (size > 20) size = 20;

    const pagination = {
      limit: size,
      offset: size * (page - 1),
    };

    ////////// End of page and size logic /////////////
    // End of querying settings //

    const products = await Product.findAll({
      ...pagination,
      raw: true,
    });

    for (const product of products) {
      const match = await Match.findOne({
        where: { productId: product.id },
        attributes: ["imgSrc"],
        raw: true,
      });
      product.imgSrc = match ? match.imgSrc : null;
    }

    return products;
  } catch (error) {
    console.error("Error getting all products:", error);
    throw new Error("Unable to fetch products");
  }
};

// Get product count
const getProductCount = async () => {
  try {
    const productCount = await Product.count();
    return productCount;
  } catch (error) {
    console.error("Error getting product count:", error);
    throw new Error("Unable to fetch product count");
  }
};

// Get single product
const getProductById = async ({ id }) => {
  try {
    const product = await Product.findByPk(id, { raw: true });

    if (!product) {
      throw new Error(`Product was not not found`);
    }

    const matches = await Match.findAll({
      where: { productId: id },
      raw: true,
    });

    product.matches = matches;
    product.imgSrc = matches.length ? matches[0].imgSrc : null;

    return product;
  } catch (error) {
    console.error("Error getting product by ID:", error);
    throw new Error("Unable to fetch product details");
  }
};

// Create a new product
const createProduct = async ({ productName }) => {
  try {
    const newProduct = await Product.create({ name: productName });
    const productPrices = await scrapeForPrices(newProduct.toJSON());

    if (productPrices.length) {
      const avgPrice = calculateAverage(productPrices);
      newProduct.avgPrice = avgPrice;
      await newProduct.save();
      return newProduct.toJSON();
    } else {
      await newProduct.destroy();
      return {
        message: `No matches were found`,
      };
    }
  } catch (error) {
    console.error("Error creating product:", error);
    throw new Error("Unable to create product");
  }
};

// Delete a product
const deleteProductById = async ({ id }) => {
  try {
    const product = await Product.findByPk(id);

    if (!product) {
      throw new Error(`Product was not found`);
    }

    await product.destroy();
    return {
      message: "Successfully deleted",
    };
  } catch (error) {
    console.error("Error deleting product:", error);
    throw new Error("Unable to delete product");
  }
};

module.exports = {
  getProducts,
  getProductCount,
  getProductById,
  createProduct,
  deleteProductById,
};
