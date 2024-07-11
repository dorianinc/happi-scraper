import { db } from "../config/db"
import {
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

const defaultSettings = {
  SimilarityThreshold: 80,
  filterLimit: 5,
  selectAll: true,
  selectHighest: true,
  darkMode: false,
};

export const applyDefaultSettings = async () => {
    const docRef = doc(db, "settings", "lulAN4qzaFVViVoyu5FZ");
    const docSnap = await getDoc(docRef);
  
    if (docSnap.exists()) {
      await updateDoc(docRef, defaultSettings);
    }
};

export const deleteSettingsSeeds = async () => {
  const querySnapshot = await getDocs(collection(db, "settings"));
  querySnapshot.forEach((setting) => {
    deleteDoc(doc(db, "settings", setting.id));
  });
};
