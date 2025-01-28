import { where, or, and, getDocs, collection, query, addDoc, orderBy } from "firebase/firestore";
import { Utils } from "./Utils";
import { db } from "../config/firebase";
import { UserService } from "./UserService";

export class MessageService {
  constructor() {
    this.usersCollectionRef = collection(db, "messages");
  }

  // async getMessages(flatId, userLoogedId, flatUserId) {
  //   let q;
  //   if (userLoogedId === flatUserId) {
  //     q = query(this.usersCollectionRef,
  //       and(
  //         where("flatId", "==", flatId),
  //         or(
  //           where("receiverId", "==", userLoogedId),
  //           where("senderId", "==", userLoogedId)
  //         )
  //       ),
  //       orderBy("creationTime", "asc")
  //     );
  //   } else {
  //     q = query(this.usersCollectionRef,
  //       where("flatId", "==", flatId),
  //       where("senderId", "==", userLoogedId),
  //       orderBy("creationTime", "asc")
  //     );
  //   }
  //   const data = await getDocs(q);
  //   return Utils.getData(data);
  // }

  async getMessages(flatId, userLoogedId, flatUserId) {
    let q;

    if (userLoogedId === flatUserId) {
      q = query(
        this.usersCollectionRef,
        and(
          where("flatId", "==", flatId),
          or(
            where("receiverId", "==", userLoogedId),
            where("senderId", "==", userLoogedId)
          )
        ),
      );
    } else {
      q = query(
        this.usersCollectionRef,
        where("flatId", "==", flatId),
        where("senderId", "==", userLoogedId),
      );
    }
    const data = await getDocs(q);
    let messages = Utils.getData(data);
    messages = await this.addSenderName(messages);
    messages = messages.sort((a, b) => b.creationTime - a.creationTime);
    return messages;
  }

  async addSenderName(messages) {
    for (let i = 0; i < messages.length; i++) {
      const sender = await this.getUserNameById(messages[i].senderId);
      messages[i].senderName = sender;
    }
    return messages;
  }

  async getUserNameById(id) {
    const userService = new UserService();
    const user = await userService.getUserById(id);
    return user.firstName + " " + user.lastName;
  }

  async sendMessage(message) {
    return await addDoc(this.usersCollectionRef, message);
  }


}