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
  startAt,
  where,
} from "firebase/firestore";
// Get matches for all the product
export const getMatchesForProducts = async (req, res) => {
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

// Get a match by id
export const getMatchById = async ({ id }) => {
  const docRef = doc(db, "matches", id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    console.log("No such document!");
  }
};

// Create a new match
export const createMatch = async (data) => {
  let docRef = collection(db, "matches");
  let newDoc = await addDoc(docRef, data);
  let newMatch = await getProductById(newDoc);
  console.log("🖥️  newMatch : ", newMatch )
  console.log("🖥️  newMatch : ", newMatch )
};
