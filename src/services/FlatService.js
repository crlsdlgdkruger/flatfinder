import { db } from "../config/firebase";
import { collection, getDocs, addDoc, query, where, doc, updateDoc, getDoc } from "firebase/firestore";
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

  async getFlatsByIds(flatIds) {
    console.log('getFlatsByIds', flatIds);

    const flats = [];
    for (const flatId of flatIds) {
      const docRef = doc(this.usersCollectionRef, flatId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const flat = docSnap.data();
        flat.id = docSnap.id;
        flats.push(flat);
      }
    }

    flats.forEach(flat => {
      if (flat.dateAvailable && flat.dateAvailable.seconds) {
        const date = new Date(flat.dateAvailable.seconds * 1000);
        flat.dateAvailable = date.toISOString().split("T")[0];
      }
    });
    return flats;
  }

  async createFlat(flat) {
    if (flat.dateAvailable) {
      flat.dateAvailable = new Date(flat.dateAvailable);
    }
    return await addDoc(this.usersCollectionRef, flat);
  }

  async updateFlat(flat) {
    console.log('updateFlat', flat);
    if (flat.dateAvailable) {
      flat.dateAvailable = new Date(flat.dateAvailable);
    }
    const docRef = doc(db, "flats", flat.id);
    return await updateDoc(docRef, flat);
  }

  async getFlatsByUserId(userId) {
    const q = query(this.usersCollectionRef, where("userId", "==", userId));
    const data = await getDocs(q);
    const response = data.docs.map((doc) => {
      const flat = doc.data();
      if (flat.dateAvailable && flat.dateAvailable.seconds) {
        const date = new Date(flat.dateAvailable.seconds * 1000);
        flat.dateAvailable = date.toISOString().split("T")[0];
      }
      return { ...flat, id: doc.id };
    });
    return response;
  }
}