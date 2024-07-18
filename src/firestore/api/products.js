import { db } from "../config/db.js";
import { ipcRenderer } from 'electron';

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
  getCountFromServer,
  Timestamp,
} from "firebase/firestore";
import { getMatchesByProductId } from "./matches.js";
// import { scrapeForPrices } from "../../utils/scraper.js";
import { calculateAverage, doesNotExist } from "../../utils/helpers.js";

export const getAllProducts = async ({ page, size }) => {
  console.log("🖥️  page, size: ", page, size);

  // Set defaults for page and size
  if (!page) page = 1;
  if (!size) size = 20;

  // Convert page and size into numbers
  page = parseInt(page);
  size = parseInt(size);

  // Declare limits for page and size
  if (page > 10) page = 10;
  console.log("🖥️  page : ", page);
  if (size > 20) size = 20;
  console.log("🖥️  size: ", size);

  let offset = size * (page - 1);

  // Create query for products with pagination
  const productsRef = collection(db, "products");
  
  // Adjust query based on pagination
  let productsQuery = query(
    productsRef,
    orderBy("createdOn"),
    limit(size)
  );

  if (page > 1) {
    // Use startAfter to paginate based on the last document in the previous page
    const lastVisibleProduct = await getLastVisibleProduct(page, size);
    productsQuery = query(
      productsRef,
      orderBy("createdOn"),
      startAfter(lastVisibleProduct),
      limit(size)
    );
  }

  const productsSnapshot = await getDocs(productsQuery);
  const products = productsSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  console.log("🖥️  products: ", products);

  // Fetch matches for each product
  for (const product of products) {
    const matchesRef = collection(db, "matches");
    const matchQuery = query(
      matchesRef,
      where("productId", "==", product.id),
      limit(1)
    );
    const matchSnapshot = await getDocs(matchQuery);
    const match = matchSnapshot.docs.map((doc) => doc.data());

    if (match.length > 0) {
      product.imgSrc = match[0].imgSrc;
    } else {
      product.imgSrc = null;
    }
  }

  return products;
};

// Helper function to get the last visible product for pagination
const getLastVisibleProduct = async (page, size) => {
  const offset = size * (page - 1);
  const productsRef = collection(db, "products");
  const querySnapshot = await getDocs(query(
    productsRef,
    orderBy("createdOn"),
    limit(offset + 1)
  ));
  
  if (querySnapshot.docs.length > offset) {
    return querySnapshot.docs[offset];
  } else {
    throw new Error("No such document!");
  }
};

// Create a new Product
export const createProduct = async ({ name, imgSrc }) => {
  let docRef = collection(db, "products");
  let data = await addDoc(docRef, {
    name,
    imgSrc,
    createdOn: Timestamp.fromDate(new Date()),
  });
  let newProduct = await getProductById(data);
  // const productPrices = await scrapeForPrices(newProduct);
  const productPrices = [10, 20, 30];

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
    await updateDoc(docRef, matches);
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
export const getProductCount = async () => {
  const products = collection(db, "products");
  const snapshot = await getCountFromServer(products);
  return snapshot.data().count;
};
