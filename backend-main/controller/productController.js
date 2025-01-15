const { Product, Match } = require("../../db");
const { scrapeAllWebsites } = require("../playwright/product-matcher.js");
const { calculateAverage } = require("../playwright/helpers.js");

// Get all products
const getProducts = async (data) => {
  let page = data.page;
  size = data.size;
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
      order: [["createdAt", "ASC"]],
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
    return {
      success: true,
      payload: products,
    };
  } catch (error) {
    console.error("Error getting all products:", error);
    throw new Error("Unable to fetch products");
  }
};

// Get product count
const getProductCount = async () => {
  try {
    const productCount = await Product.count();
    return {
      success: true,
      payload: productCount,
    };
  } catch (error) {
    console.error("Error getting product count:", error);
    throw new Error("Unable to fetch product count");
  }
};

// Get single product
const getProductById = async (productId) => {
  try {
    const product = await Product.findByPk(productId, { raw: true });

    if (!product) {
      return {
        success: false,
        message: "Product was not not found",
      };
    }
    return {
      success: true,
      payload: product,
    };
  } catch (error) {
    console.error("Error getting product by ID:", error);
    throw new Error("Unable to fetch product details");
  }
};

// Create a new product
const createProduct = async (data) => {
  const res = {
    success: false,
    payload: null,
    message: null,
  };
  
  try {
    // Scrape websites based on the product name
    const newProduct = await Product.create({ name: data.name });
    const newMatches = await scrapeAllWebsites(newProduct.toJSON());

    if (newMatches.length) {
      const avgPrice = calculateAverage(newMatches);
      newProduct.avgPrice = avgPrice;

      await newProduct.save();
      res.success = true;
      res.payload = newProduct.toJSON()

      return res;
    } else {
      await newProduct.destroy();
      res.message = "No matches were found"
      return res;
    }
  } catch (error) {
    console.error("Error creating product:", error);
    throw new Error("Unable to create product");
  }
};

// Update single search script by id
const updateProductById = async (data) => {
  const id = data.productId;
  const updatedFields = data.updatedProduct;
  try {
    const product = await Product.findByPk(id);
    if (!product) {
      throw new Error("Product not found");
    }

    for (const property of Object.keys(updatedFields)) {
      product[property] = updatedFields[property];
    }

    await product.save();
    return product.toJSON();
  } catch (error) {
    console.error("Error updating product:", error);
    throw new Error("Unable to update product");
  }
};

// Delete a product
const deleteProductById = async (productId) => {
  try {
    const product = await Product.findByPk(productId);
    if (!product) {
      throw new Error(`Product was not found`);
    }

    await product.destroy();
    return {
      success: true,
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
  updateProductById,
  deleteProductById,
};
