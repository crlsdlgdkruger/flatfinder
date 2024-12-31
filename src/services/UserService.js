import { db } from "../config/firebase";
import { collection, getDocs, addDoc, query, where } from "firebase/firestore";
export class UserService {
  constructor() {
    this.usersCollectionRef = collection(db, "users");
  }
  async getUsers() {
    const data = await getDocs(this.usersCollectionRef);
    return getData(data);
  }

  async login(email, password) {
    const q = query(
      this.usersCollectionRef,
      where("email", "==", email),
      where("password", "==", password)
    );
    const data = await getDocs(q);
    return getData(data);
  }

  async register(user) {
    const q = query(
      this.usersCollectionRef,
      where("email", "==", user.email)
    );
    const data = await getDocs(q);
    if (data.docs.length === 0) {
      return await addDoc(this.usersCollectionRef, user);
    } else {
      return null;
    }
  }
}

const getData = (data) => {
  return data.docs.map((doc) => {
    return { ...doc.data(), id: doc.id };
  })
}
