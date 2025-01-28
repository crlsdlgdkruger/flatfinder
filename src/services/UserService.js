import { db } from "../config/firebase";
import { collection, getDocs, addDoc, query, where, updateDoc, doc, getDoc } from "firebase/firestore";
import { Utils } from "./Utils";
export class UserService {
  constructor() {
    this.usersCollectionRef = collection(db, "users");
  }
  async getUsers(filters) {
    console.log('filters', filters);
    const conditions = [];
    let birthDate;
    let countFlatsCreated;
    if (filters.firstName) {
      const startText = filters.firstName;
      const endText = filters.firstName + '\uf8ff';
      conditions.push(where("firstName", ">=", startText));
      conditions.push(where("firstName", "<=", endText));
    }
    if (filters.role) {
      conditions.push(where("role", "==", filters.role));
    }
    if (filters.minAge) {
      birthDate = Utils.calculateBirthDate(filters.minAge);
      conditions.push(where("birthDate", "<=", birthDate));
    }
    if (filters.maxAge) {
      birthDate = Utils.calculateBirthDate(filters.maxAge);
      conditions.push(where("birthDate", ">=", birthDate));
    }
    console.log('conditions', conditions);
    const setQuery = query(this.usersCollectionRef, ...conditions);
    console.log('setQuery', setQuery);
    const data = await getDocs(setQuery);
    const result = Utils.getData(data);
    console.log('result', result);
    return result;
  }

  async getAllUsers() {
    const data = await getDocs(this.usersCollectionRef);
    return Utils.getData(data);
  }

  async login(email, password) {
    const q = query(
      this.usersCollectionRef,
      where("email", "==", email),
      where("password", "==", password)
    );
    console.log('q', q);
    const data = await getDocs(q);
    return Utils.getData(data);
  }

  async getUserById(id) {
    const docRef = doc(this.usersCollectionRef, id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      // console.log("Document data:", docSnap);
      return { ...docSnap.data(), id: docSnap.id };
    } else {
      return null;
    }
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
    // console.log('toggleFavorite', userLogged, flatId);

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
      try {
        await updateDoc(docRef, user);
        return [user];
      } catch (error) {
        console.error('Error al actualizar favoritos en Firestore:', error);
        throw new Error('No se pudo actualizar los favoritos. Inténtalo de nuevo más tarde.');
      }
    }
  }
}

