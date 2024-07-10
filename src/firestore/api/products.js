import { db } from "../db/firestore.js";
import {
  doc,
  collection,
  addDoc,
  updateDoc,
  getDoc,
  getDocs,
  deleteDoc,
  query,
  where,
  increment,
} from "firebase/firestore";
const { scrapeForPrices } = require("../utils/scraper.js");
const { calculateAverage, doesNotExist } = require("../utils/helpers.js");

// Get all products
export const getAllProducts = async (req, res) => {
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
    const match = await Match.findOne({
      where: {
        productId: product.id,
      },
      attributes: ["imgSrc"],
      raw: true,
    });
    if (match) product.imgSrc = match.imgSrc;
    else product.imgSrc = null;
  }

  res.status(200).json(products);
};

// Create a new Product
export const createProduct = async ({ name, imgSrc }) => {
  let docRef = collection(db, "products");
  let data = await addDoc(docRef, { name, imgSrc });
  let newProduct = await getProductById(data);
  const productPrices = await scrapeForPrices(newProduct);

  if (productPrices.length) {
    const avgPrice = calculateAverage(productPrices);
    console.log("🖥️  avgPrice: ", avgPrice);
    newProduct.avgPrice = avgPrice;
  } else {
    deleteProductById(newProduct.id);
  }
};

// Get product by id
export const getProductById = async (id) => {
  const docRef = doc(db, "products", id);
  const docSnap = await getDoc(docRef);
  const product = docSnap.data();

  if (!product) return doesNotExist("Product");
  else {
    //  create function to get all matches then assign it to a value of match
    product.matches = matches;
    if (matches.length) product.imgSrc = matches[0].imgSrc;
    else product.imgSrc = null;
    return product;
  }
};

// Update Product by id
export const updateProductById = async (id, matches) => {
  const docRef = doc(db, "products", id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    await updateDoc(docRef, {
      imgSrc: "josie.jpg",
      matches,
    });
  }
};

// Delete a Product by id
export const deleteProductById = async (id) => {
  const docRef = doc(db, "products", id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    await deleteDoc(doc(db, "products", id));
  }
};

// Get product count
export const getProductCount = async (req, res) => {
  const productCount = await Product.count();
  res.status(200).json(productCount);
};

deleteProductById();
