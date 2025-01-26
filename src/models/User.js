export class User {
  construtor(email, password, firstName, lastName, birthDate, role) {
    this.email = email
    this.password = password
    this.firstName = firstName
    this.lastName = lastName
    this.birthDate = birthDate
    this.favoriteFlats = [];
    this.role = role;
  }
}