export class Message {
  constructor(creationTime, content, sender, receiver) {
    this.creationTime = creationTime
    this.content = content
    this.sender = sender
    this.receiver = receiver
  }
}