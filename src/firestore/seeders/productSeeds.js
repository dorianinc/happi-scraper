import { db } from "../config/db"
import { faker } from '@faker-js/faker';
import {
  collection,
  doc,
  getDocs,
  addDoc,
  deleteDoc,
} from "firebase/firestore";

export const addProductSeeds = async () => {
  const docRef = collection(db, "products");

  for (let i = 0; i < 10; i++) {
    addDoc(docRef, {
      name: faker.commerce.productName(),
      imgSrc: null,
      avgPrice: faker.number.float({ min: 20, max: 100 }),
    });
  }
};

export const deleteProductSeeds = async () => {
  const querySnapshot = await getDocs(collection(db, "products"));
  querySnapshot.forEach((product) => {
    deleteDoc(doc(db, "products", product.id));
  });
};
