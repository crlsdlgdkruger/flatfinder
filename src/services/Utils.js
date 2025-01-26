import { LocalStorageService } from "./LocalStorageService";
import { UserService } from "./UserService";

export class Utils {
  static getData = (data) => {
    return data.docs.map((doc) => {
      return { ...doc.data(), id: doc.id };
    })
  }

  static calculateAge = (date) => {
    const today = new Date();
    let birthDate;
    if (date.seconds) {
      birthDate = new Date(date.seconds * 1000);
    } else {
      birthDate = new Date(date);
    }
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  static toggleFavorite = async (flat) => {
    const userService = new UserService();
    const localStorageService = new LocalStorageService();
    const userLogged = localStorageService.getLoggedUser();
    try {
      const us = await userService.toggleFavorite(userLogged[0], flat.id);
      console.log('US', us);
      if (us) {
        console.log('userLogged actualizado', us);
        localStorageService.addLoggedUser(us);
      } else {
        console.warn('El usuario no fue encontrado en la base de datos.');
      }
    } catch (error) {
      console.error('Ocurrió un error al intentar actualizar los favoritos:', error.message);
      alert('Hubo un problema al actualizar tus favoritos. Por favor, inténtalo de nuevo más tarde.');
    }
  };

}