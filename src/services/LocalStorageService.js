export class LocalStorageService {
  constructor() {

  }

  addLoggedUser(user) {
    localStorage.setItem('loggedUser', JSON.stringify(user));
  }

  getLoggedUser() {
    return JSON.parse(localStorage.getItem('loggedUser'));
  }

  isAuthenticated() {
    return localStorage.getItem('loggedUser') !== null ? true : false;
  }
}