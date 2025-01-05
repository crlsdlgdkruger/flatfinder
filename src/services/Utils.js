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
}