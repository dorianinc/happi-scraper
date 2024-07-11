import { db } from "../config/db.js";
import {
  doc,
  collection,
  addDoc,
  updateDoc,
  getDoc,
  getDocs,
  deleteDoc,
  query,
  orderBy,
  limit,
  startAfter,
  where,
} from "firebase/firestore";
import { getMatchesByProductId } from "./matches.js";
// import { scrapeForPrices } from "../../utils/scraper.js";
import { calculateAverage, doesNotExist } from "../../utils/helpers.js";
// const { scrapeForPrices } = require("../utils/scraper.js");
// const { calculateAverage, doesNotExist } = require("../utils/helpers.js");

// collection,
// getDocs,
// query,
// limit,
// startAfter,
// orderBy,
// where,

export const getAllProducts = async ({ page, size }) => {
  // Set defaults for page and size
  if (!page) page = 1;
  if (!size) size = 20;

  // Convert page and size into numbers
  page = parseInt(page);
  size = parseInt(size);

  // Declare limits for page and size
  if (page > 10) page = 10;
  if (size > 20) size = 20;

  // Create query for products with pagination
  const productsRef = collection(db, "products");
  let productsQuery = query(productsRef, orderBy("name"), limit(size)); // Adjust orderBy field as needed

  // Handle pagination
  if (page > 1) {
    // Get the last document from the previous page
    const previousPageQuery = query(productsRef, orderBy("name"), limit(size * (page - 1)));
    const previousPageSnapshot = await getDocs(previousPageQuery);
    const lastDoc = previousPageSnapshot.docs[previousPageSnapshot.docs.length - 1];

    if (lastDoc) {
      productsQuery = query(productsRef, orderBy("name"), startAfter(lastDoc), limit(size));
    }
  }

  const productsSnapshot = await getDocs(productsQuery);
  const products = productsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

  // Fetch matches for each product
  for (const product of products) {
    const matchesRef = collection(db, "matches");
    const matchQuery = query(matchesRef, where("productId", "==", product.id), limit(1));
    const matchSnapshot = await getDocs(matchQuery);
    const match = matchSnapshot.docs.map(doc => doc.data());

    if (match.length > 0) {
      product.imgSrc = match[0].imgSrc;
    } else {
      product.imgSrc = null;
    }
  }

  return products;
};

// Create a new Product
export const createProduct = async ({ name, imgSrc }) => {
  let docRef = collection(db, "products");
  let data = await addDoc(docRef, { name, imgSrc });
  let newProduct = await getProductById(data);
  // const productPrices = await scrapeForPrices(newProduct);
  const productPrices = [10, 20, 30]
  

  if (productPrices.length) {
    const avgPrice = calculateAverage(productPrices);
    newProduct.avgPrice = avgPrice;
  } else {
    deleteProductById(newProduct.id);
  }
};

// Get a product by id
export const getProductById = async (id) => {
  const docRef = doc(db, "products", id);
  const docSnap = await getDoc(docRef);
  const product = docSnap.data();

  if (!product) {
    return doesNotExist("Product");
  } else {
    const matches = await getMatchesByProductId(id);
    product.matches = matches;
    if (matches.length) {
      product.imgSrc = matches[0].imgSrc;
    } else {
      product.imgSrc = null;
    }
    return product;
  }
};

// Update a product by id
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

// Delete a product by id
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
