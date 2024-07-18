const { db } = require("../config/db.js");
const { ipcRenderer } = require('electron');
const {
  doc,
  collection,
  addDoc,
  updateDoc,
  getDoc,
  getDocs,
  deleteDoc,
  query,
  orderBy,
  startAt,
  where,
} = require("firebase/firestore");

// Get matches for all the product
// export const getMatchesForProducts = async (req, res) => {
//   const products = await Product.findAll({
//     ...pagination,
//     raw: true,
//   });

//   for (const product of products) {
//     const matches = await Match.findAll({
//       where: {
//         productId: product.id,
//       },
//       raw: true,
//     });

//     if (matches.length) product.imgSrc = matches[0].imgSrc;
//     else product.imgSrc = null;
//     product.matches = matches;
//   }

//   res.status(200).json(products);
// };

const getMatchesByProductId = async (productId) => {
  const matchesQuery = query(collection(db, "matches"), where("productId", "==", productId));
  const querySnapshot = await getDocs(matchesQuery);
  const matches = [];
  querySnapshot.forEach((doc) => {
    matches.push(doc.data());
  });
  return matches;
};

// Get a match by id
const getMatchById = async ({ id }) => {
  const docRef = doc(db, "matches", id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    console.log("No such document!");
  }
};

// Create a new match
const createMatch = async (data) => {
  let docRef = collection(db, "matches");
  let newDoc = await addDoc(docRef, data);
  let newMatch = await getProductById(newDoc);
};


module.exports = {
  getMatchesByProductId, 
  getMatchById,
  createMatch
}