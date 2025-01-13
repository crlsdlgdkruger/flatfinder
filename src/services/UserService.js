import { db } from "../config/firebase";
import { collection, getDocs, addDoc, query, where, updateDoc, doc } from "firebase/firestore";
import { Utils } from "./Utils";
export class UserService {
  constructor() {
    this.usersCollectionRef = collection(db, "users");
  }
  async getUsers() {
    const data = await getDocs(this.usersCollectionRef);
    return Utils.getData(data);
  }

  async login(email, password) {
    const q = query(
      this.usersCollectionRef,
      where("email", "==", email),
      where("password", "==", password)
    );
    const data = await getDocs(q);
    return Utils.getData(data);
  }

  async getUser(email) {
    const q = query(
      this.usersCollectionRef,
      where("email", "==", email),
    );
    const data = await getDocs(q);
    return Utils.getData(data);
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

  async editUser(user) {
    if (user.birthDate) {
      user.birthDate = new Date(user.birthDate); // Convierte a objeto Date
    }
    const docRef = doc(db, "users", user.id);
    return await updateDoc(docRef, user);
  }

  async toggleFavorite(userLogged, flatId) {
    if (userLogged.birthDate) {
      userLogged.birthDate = new Date(userLogged.birthDate.seconds * 1000); // Convierte a objeto Date
    }


    console.log('toggleFavorite', userLogged, flatId);

    const q = query(
      this.usersCollectionRef,
      where("email", "==", userLogged.email),
    );
    const data = await getDocs(q);
    if (data.docs.length === 0) {
      return null;
    } else {
      const user = Utils.getData(data)[0];
      if (user.favoriteFlats.includes(flatId)) {
        const index = user.favoriteFlats.indexOf(flatId);
        user.favoriteFlats.splice(index, 1);
      } else {
        user.favoriteFlats.push(flatId);
      }
      const docRef = doc(db, "users", user.id);
      return await updateDoc(docRef, user);
    }
  }
}

