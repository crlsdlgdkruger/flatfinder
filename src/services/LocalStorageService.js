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
    return this.getLoggedUser().role === 'admin' ? true : false;
  }

  logout() {
    localStorage.removeItem('loggedUser');
  }
}