const { db } = require("../config/db.js");
const { ipcRenderer } = require("electron");
const {
  collection,
  doc,
  updateDoc,
  getDoc,
  getDocs,
} = require("firebase/firestore");

// Get all websites
const getWebsites = async () => {
  const websites = [];
  const querySnapshot = await getDocs(collection(db, "websites"));
  querySnapshot.forEach((website) => {
    websites.push(website.data());
  });

  return websites;
};

// Update Website
const updateWebsite = async (id, settings) => {
  const docRef = doc(db, "settings", id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    await updateDoc(docRef, settings);
  }

  return getWebsites();
};

module.exports = {
  getWebsites,
  updateWebsite,
};
