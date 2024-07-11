import { db } from "../config/db"
import { faker } from "@faker-js/faker";
import {
  collection,
  doc,
  getDocs,
  addDoc,
  deleteDoc,
} from "firebase/firestore";

export const addMatchSeeds = async () => {
  const productsSnapshot = await getDocs(collection(db, "products"));
  const productIds = productsSnapshot.docs.map(doc => doc.id);

  for (const productId of productIds) {
    for (let i = 0; i < 3; i++) {
      await addDoc(collection(db, "matches"), {
        productId: productId,
        name: faker.commerce.productName(),
        imgSrc: faker.image.urlLoremFlickr({ category: 'abstract' }),
        url: faker.internet.url(),
        price: faker.number.int({ min: 10, max: 100 }),
        websiteName: faker.company.buzzPhrase(),
        similarityRating: faker.number.int({ min: 10, max: 100 }),
        excluded: false,
      });
    }
  }
};

export const deleteMatchSeeds = async () => {
  const querySnapshot = await getDocs(collection(db, "matches"));
  querySnapshot.forEach(async (matchDoc) => {
    await deleteDoc(doc(db, "matches", matchDoc.id));
  });
};