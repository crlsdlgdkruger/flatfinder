import { db } from "../config/firebase";
import { collection, getDocs, addDoc, query, where, doc, updateDoc } from "firebase/firestore";
import { Utils } from "./Utils";

export class FlatService {
  constructor() {
    this.usersCollectionRef = collection(db, "flats");
  }

  async getFlats() {
    const data = await getDocs(this.usersCollectionRef);
    return data.docs.map((doc) => {
      const flat = doc.data();
      if (flat.dateAvailable && flat.dateAvailable.seconds) {
        const date = new Date(flat.dateAvailable.seconds * 1000);
        flat.dateAvailable = date.toISOString().split("T")[0];
      }
      return { ...flat, id: doc.id };
    });
  }

  async createFlat(flat) {
    if (flat.dateAvailable) {
      flat.dateAvailable = new Date(flat.dateAvailable); // Convierte a objeto Date
    }
    return await addDoc(this.usersCollectionRef, flat);
  }

  async updateFlat(flat) {
    console.log('updateFlat', flat);
    if (flat.dateAvailable) {
      flat.dateAvailable = new Date(flat.dateAvailable); // Convierte a objeto Date
    }
    const docRef = doc(db, "flats", flat.id);
    return await updateDoc(docRef, flat);
  }
}