export class AuthService {
  static isAuthenticated(user) {

    if (user.length !== 1 || user === null) {
      window.location.href = "/login";
    }
  }
}