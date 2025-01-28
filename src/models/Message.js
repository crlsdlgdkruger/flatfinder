export class Message {
  constructor(creationTime, content, senderId, receiverId, flatId) {
    this.creationTime = creationTime
    this.content = content
    this.senderId = senderId
    this.receiverId = receiverId
    this.flatId = flatId
  }
}