// Require necessary modules
const { db } = require("../config/db.js");
const { ipcRenderer } = require("electron");
const {
  doc,
  collection,
  addDoc,
  updateDoc,
  getDoc,
  getDocs,
  setDoc,
  deleteDoc,
  query,
  orderBy,
  limit,
  startAfter,
  where,
  getCountFromServer,
  Timestamp,
} = require("firebase/firestore");
const { getMatchesByProductId } = require("./matches.js");
// const { scrapeForPrices } = require("../../utils/scraper.js");
const { calculateAverage, doesNotExist } = require("../../utils/helpers.js");

// export const getAllProducts = async () => {
//   const collectionRef = collection(db, "products");
//   const q = query(collectionRef);

//   const querySnapshot = await getDocs(q);
//   const products = [];
//   querySnapshot.forEach((doc) => {
//     products.push({
//       id: doc.id,
//       ...doc.data(),
//     });
//   });

//   return products;
// };

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

  let offset = size * (page - 1);

  // Create query for products with pagination
  const productsRef = collection(db, "products");

  // Adjust query based on pagination
  let productsQuery = query(productsRef, orderBy("createdOn"), limit(size));

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
  const querySnapshot = await getDocs(
    query(productsRef, orderBy("createdOn"), limit(offset + 1))
  );

  if (querySnapshot.docs.length > offset) {
    return querySnapshot.docs[offset];
  } else {
    throw new Error("No such document!");
  }
};

// Create a new Product
export const createProduct = async ({ name }) => {
  let docRef = collection(db, "products");
  let data = await addDoc(docRef, {
    name,
    createdOn: Timestamp.fromDate(new Date()),
  });
  let newProduct = await getProductById(data.id);
  newProduct.id = data.id;

  const productPrices = await ipcRenderer.sendSync(
    "scrape-for-prices",
    newProduct
  );

  if (productPrices.length) {
    const avgPrice = calculateAverage(productPrices);
    newProduct.avgPrice = avgPrice;

    // Update the product in Firestore with the avgPrice
    await setDoc(
      doc(db, "products", newProduct.id),
      {
        id: newProduct.id,
        avgPrice: Number(avgPrice),
      },
      { merge: true }
    ); 

    return newProduct;
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
    product.id = id;
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
