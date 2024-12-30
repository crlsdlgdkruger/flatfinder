import { db } from "../config/firebase";
import { collection, getDocs, addDoc } from "firebase/firestore";
export class UserService {
  constructor() {
    this.usersCollectionRef = collection(db, "users");
  }
  async getUsers() {
    const data = await getDocs(this.usersCollectionRef);
    return getData(data);
  }
}

const getData = (data) => {
  return data.docs.map((doc) => {
    return { ...doc.data(), id: doc.id };
  })
}
