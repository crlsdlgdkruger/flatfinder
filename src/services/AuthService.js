export class AuthService {
  static getData = (data) => {
    return data.docs.map((doc) => {
      return { ...doc.data(), id: doc.id };
    })
  }
}