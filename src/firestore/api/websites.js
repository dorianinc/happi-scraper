import { db } from "../config/db.js";
import { ipcRenderer } from 'electron';
import { collection, doc, updateDoc, getDoc, getDocs } from "firebase/firestore";

// Get all websites
export const getWebsites = async () => {
  const websites = [];
  const querySnapshot = await getDocs(collection(db, "websites"));
  querySnapshot.forEach((website) => {
    websites.push(website.data());
  });

  return websites;
};

// Update Website
export const updateWebsite = async (id, settings) => {
  const docRef = doc(db, "settings", id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    await updateDoc(docRef, settings);
  }

  return getWebsites();
};
