import { db } from "../config/firebase";
import { collection, getDocs, addDoc, query, where } from "firebase/firestore";
import { Utils } from "./Utils";

export class FlatService {
  constructor() {
    this.usersCollectionRef = collection(db, "flats");
  }

  async getFlats() {
    const data = await getDocs(this.usersCollectionRef);
    return Utils.getData(data);
  }

  async createFlat(flat) {
    return await addDoc(this.usersCollectionRef, flat);
  }
}