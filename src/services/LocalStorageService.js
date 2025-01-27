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

  isAdmin() {
    if (!this.isAuthenticated()) return false;
    return this.getLoggedUser()[0].role === 'admin' ? true : false;
  }

  logout() {
    localStorage.removeItem('loggedUser');
  }
}