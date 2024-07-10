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
  where,
  increment,
} from "firebase/firestore";

// Get settings
export const getSettings = async () => {
  const docRef = doc(db, "settings", "3TjhP3WPz1lRpgIbjfto");
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    console.log("No such document!");
  }
};

// Get dark mode boolean
export const getDarkModeBoolean = async (req, res) => {
  const settings = getSettings();
  res.status(200).json(settings.darkMode);
};

// Update Settings
export const updateSettings = async (settings) => {
  const docRef = doc(db, "settings", "3TjhP3WPz1lRpgIbjfto");
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    await updateDoc(docRef, settings);
  }

  return getSettings();
};
