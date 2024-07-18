// Require necessary modules
const { initializeApp } = require("firebase/app");
const { getAuth } = require("firebase/auth");
const { getFirestore } = require("firebase/firestore");
const { firebaseConfig } = require("./firebaseConfig");

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Export modules using module.exports
module.exports = {
  auth,
  db
};
