import { db } from "../config/firebase";
import { collection, getDocs, addDoc, query, where, doc, updateDoc, getDoc } from "firebase/firestore";
import { Utils } from "./Utils";

export class FlatService {
  constructor() {
    this.usersCollectionRef = collection(db, "flats");
  }

  async getFlats(filters, sortBy, ascDesc) {

    const conditions = [];
    if (filters.city) {
      const startText = filters.city.toLowerCase();
      const endText = startText + '\uf8ff';
      conditions.push(where("city", ">=", startText));
      conditions.push(where("city", "<=", endText));
    }
    if (filters.minArea) {
      conditions.push(where("areaSize", ">=", filters.minArea));
    }
    if (filters.maxArea) {
      conditions.push(where("areaSize", "<=", filters.maxArea));
    }
    if (filters.minRentPrice) {
      conditions.push(where("rentPrice", ">=", filters.minRentPrice));
    }
    if (filters.maxRentPrice) {
      conditions.push(where("rentPrice", "<=", filters.maxRentPrice));
    }
    console.log('conditions', conditions);
    const q = query(this.usersCollectionRef, ...conditions);
    const data = await getDocs(q);
    const result = Utils.getData(data);

    if (ascDesc === "asc") {
      result.sort((a, b) => {
        if (a[sortBy] < b[sortBy]) {
          return -1;
        }
        if (a[sortBy] > b[sortBy]) {
          return 1;
        }
        return 0;
      });
    } else {
      result.sort((a, b) => {
        if (a[sortBy] < b[sortBy]) {
          return 1;
        }
        if (a[sortBy] > b[sortBy]) {
          return -1;
        }
        return 0;
      });
    }

    result.forEach(flat => {
      if (flat.dateAvailable && flat.dateAvailable.seconds) {
        const date = new Date(flat.dateAvailable.seconds * 1000);
        flat.dateAvailable = date.toISOString().split("T")[0];
      }
    });
    return result;
  }


  // async getFlatsByIds(flatIds, filters, sortBy, ascDesc) {
  //   // console.log('getFlatsByIds', flatIds);

  //   // const flats = [];
  //   // for (const flatId of flatIds) {
  //   //   const docRef = doc(this.usersCollectionRef, flatId);
  //   //   const docSnap = await getDoc(docRef);
  //   //   if (docSnap.exists()) {
  //   //     const flat = docSnap.data();
  //   //     flat.id = docSnap.id;
  //   //     flats.push(flat);
  //   //   }
  //   // }

  //   // flats.forEach(flat => {
  //   //   if (flat.dateAvailable && flat.dateAvailable.seconds) {
  //   //     const date = new Date(flat.dateAvailable.seconds * 1000);
  //   //     flat.dateAvailable = date.toISOString().split("T")[0];
  //   //   }
  //   // });
  //   // return flats;

  //   const conditions = [];
  //   if (filters.city) {
  //     const startText = filters.city.toLowerCase();
  //     const endText = startText + '\uf8ff';
  //     conditions.push(where("city", ">=", startText));
  //     conditions.push(where("city", "<=", endText));
  //   }
  //   if (filters.minArea) {
  //     conditions.push(where("areaSize", ">=", filters.minArea));
  //   }
  //   if (filters.maxArea) {
  //     conditions.push(where("areaSize", "<=", filters.maxArea));
  //   }
  //   if (filters.minRentPrice) {
  //     conditions.push(where("rentPrice", ">=", filters.minRentPrice));
  //   }
  //   if (filters.maxRentPrice) {
  //     conditions.push(where("rentPrice", "<=", filters.maxRentPrice));
  //   }
  //   const q = query(this.usersCollectionRef, where("id", "in", flatIds), ...conditions);
  //   const data = await getDocs(q);
  //   const result = Utils.getData(data);

  //   if (ascDesc === "asc") {
  //     result.sort((a, b) => {
  //       if (a[sortBy] < b[sortBy]) {
  //         return -1;
  //       }
  //       if (a[sortBy] > b[sortBy]) {
  //         return 1;
  //       }
  //       return 0;
  //     });
  //   } else {
  //     result.sort((a, b) => {
  //       if (a[sortBy] < b[sortBy]) {
  //         return 1;
  //       }
  //       if (a[sortBy] > b[sortBy]) {
  //         return -1;
  //       }
  //       return 0;
  //     });
  //   }

  //   result.forEach(flat => {
  //     if (flat.dateAvailable && flat.dateAvailable.seconds) {
  //       const date = new Date(flat.dateAvailable.seconds * 1000);
  //       flat.dateAvailable = date.toISOString().split("T")[0];
  //     }
  //   })
  //   return result;
  // }

  async getFlatsByIds(flatIds, filters, sortBy, ascDesc) {
    const flats = [];

    // Obtener los documentos por ID manualmente
    for (const flatId of flatIds) {
      const docRef = doc(this.usersCollectionRef, flatId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const flat = docSnap.data();
        flat.id = docSnap.id;
        flats.push(flat);
      }
    }

    // Aplicar filtros en memoria
    let filteredFlats = flats.filter(flat => {
      return (
        (!filters.city || flat.city.toLowerCase().includes(filters.city.toLowerCase())) &&
        (!filters.minArea || Number(flat.areaSize) >= filters.minArea) &&
        (!filters.maxArea || Number(flat.areaSize) <= filters.maxArea) &&
        (!filters.minRentPrice || Number(flat.rentPrice) >= filters.minRentPrice) &&
        (!filters.maxRentPrice || Number(flat.rentPrice) <= filters.maxRentPrice)
      );
    });

    // Ordenar los resultados
    filteredFlats.sort((a, b) => {
      if (a[sortBy] < b[sortBy]) return ascDesc === "asc" ? -1 : 1;
      if (a[sortBy] > b[sortBy]) return ascDesc === "asc" ? 1 : -1;
      return 0;
    });

    // Convertir dateAvailable a formato ISO si es necesario
    filteredFlats.forEach(flat => {
      if (flat.dateAvailable && flat.dateAvailable.seconds) {
        const date = new Date(flat.dateAvailable.seconds * 1000);
        flat.dateAvailable = date.toISOString().split("T")[0];
      }
    });

    return filteredFlats;
  }

  async createFlat(flat) {
    flat.city = flat.city.toLowerCase();
    if (flat.dateAvailable) {
      flat.dateAvailable = new Date(flat.dateAvailable);
    }
    if (flat.areaSize) {
      flat.areaSize = Number(flat.areaSize);
    }
    if (flat.rentPrice) {
      flat.rentPrice = Number(flat.rentPrice);
    }
    return await addDoc(this.usersCollectionRef, flat);
  }

  async updateFlat(flat) {
    console.log('updateFlat', flat);
    if (flat.dateAvailable) {
      flat.dateAvailable = new Date(flat.dateAvailable);
    }
    if (flat.areaSize) {
      flat.areaSize = Number(flat.areaSize);
    }
    if (flat.rentPrice) {
      flat.rentPrice = Number(flat.rentPrice);
    }
    const docRef = doc(db, "flats", flat.id);
    return await updateDoc(docRef, flat);
  }

  async getFlatById(flatId) {
    const docRef = doc(this.usersCollectionRef, flatId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const flat = docSnap.data();
      flat.id = docSnap.id;
      if (flat.dateAvailable && flat.dateAvailable.seconds) {
        const date = new Date(flat.dateAvailable.seconds * 1000);
        flat.dateAvailable = date.toISOString().split("T")[0];
      }
      return flat;
    } else {
      return null;
    }
  }

  async getFlatsByUserId(userId, filters, sortBy, ascDesc) {
    // const q = query(this.usersCollectionRef, where("userId", "==", userId));
    // const data = await getDocs(q);
    // const response = data.docs.map((doc) => {
    //   const flat = doc.data();
    //   if (flat.dateAvailable && flat.dateAvailable.seconds) {
    //     const date = new Date(flat.dateAvailable.seconds * 1000);
    //     flat.dateAvailable = date.toISOString().split("T")[0];
    //   }
    //   return { ...flat, id: doc.id };
    // });
    // return response;
    const conditions = [where("userId", "==", userId)];
    if (filters.city) conditions.push(where("city", "==", filters.city.toLowerCase()));
    if (filters.minArea) conditions.push(where("areaSize", ">=", filters.minArea));
    if (filters.maxArea) conditions.push(where("areaSize", "<=", filters.maxArea));
    if (filters.minRentPrice) conditions.push(where("rentPrice", ">=", filters.minRentPrice));
    if (filters.maxRentPrice) conditions.push(where("rentPrice", "<=", filters.maxRentPrice));
    const q = query(this.usersCollectionRef, ...conditions);
    const data = await getDocs(q);
    const response = data.docs.map((doc) => {
      const flat = doc.data();
      if (flat.dateAvailable && flat.dateAvailable.seconds) {
        const date = new Date(flat.dateAvailable.seconds * 1000);
        flat.dateAvailable = date.toISOString().split("T")[0];
      }
      return { ...flat, id: doc.id };
    });
    if (sortBy) {
      response.sort((a, b) => {
        if (a[sortBy] < b[sortBy]) return ascDesc === "asc" ? -1 : 1;
        if (a[sortBy] > b[sortBy]) return ascDesc === "asc" ? 1 : -1;
        return 0;
      });
    }
    return response;
  }

  async countFlatsCreated(userId) {
    const q = query(this.usersCollectionRef, where("userId", "==", userId));
    const data = await getDocs(q);
    return data.docs.length;
  }
}