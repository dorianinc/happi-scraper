import { db } from "../config/db.js";
import {
  collection,
  updateDoc,
  getDocs,
  query,
  limit,
} from "firebase/firestore";

// Get settings
export const getSettings = async () => {
  const collectionRef = collection(db, "settings");
  const q = query(collectionRef, limit(1));

  const querySnapshot = await getDocs(q);
  if (!querySnapshot.empty) {
    const doc = querySnapshot.docs[0];
    return doc.data();
  } else {
    console.log("No such document!");
  }
};
// Get dark mode boolean
export const getDarkModeBoolean = async () => {
  const settings = await getSettings();

  return settings.darkMode;
};

// Update settings
export const updateSettings = async (settings) => {
  const collectionRef = collection(db, "settings");
  const q = query(collectionRef, limit(1));

  const querySnapshot = await getDocs(q);
  if (!querySnapshot.empty) {
    const doc = querySnapshot.docs[0];
    const docRef = doc.ref;

    await updateDoc(docRef, settings);
  } else {
    console.log("No such document to update!");
  }

  return getSettings();
};