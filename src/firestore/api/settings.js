// Require necessary modules
const { db } = require("../config/db.js");
const { ipcRenderer } = require('electron');
const { collection, updateDoc, getDocs, query, limit } = require("firebase/firestore");

// Get settings
const getSettings = async () => {
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
const getDarkModeBoolean = async () => {
  const settings = await getSettings();
  console.log("🖥️  settings : ", settings )

  return settings.darkMode;
};

// Update settings
const updateSettings = async (settings) => {
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


module.exports = {
  getSettings,
  getDarkModeBoolean,
  updateSettings
}
