import { InputText } from "primereact/inputtext"
import { useEffect, useRef, useState } from "react"
import { MessageService } from "../../services/MessageService";
import { Toast } from 'primereact/toast';
import { UserService } from "../../services/UserService";
import './messages.css'

export const Messages = ({ flatId, senderId, receiverId }) => {

  const [messages, setMessages] = useState([]);
  const toast = useRef([]);
  const content = useRef(null);

  const userService = new UserService();
  const messageService = new MessageService();


  useEffect(() => {
    loadMessages();
  }, []);

  async function loadMessages() {
    const messages = await messageService.getMessages(flatId, senderId, receiverId);
    setMessages(messages);
  }

  async function getUserNameById(id) {
    if (id === senderId) {
      return 'You';
    }
    const user = await userService.getUserById(id);
    console.log('user', user);
    return user.firstName + ' ' + user.lastName;
  }

  useEffect(() => { console.log('messages', messages) }, [messages]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (content.current.value.length > 0) {
      const messageDTO = {
        creationTime: new Date(),
        content: content.current.value,
        senderId: senderId,
        receiverId: receiverId,
        flatId: flatId
      };
      const data = await messageService.sendMessage(messageDTO);
      if (data) {
        toast.current.show({ severity: 'success', summary: 'Success', detail: 'Message sent successfully', life: 3000 });
      } else {
        toast.current.show({ severity: 'error', summary: 'Error', detail: 'Error sending message', life: 3000 });
      }
      content.current.value = "";
      loadMessages();
    }
  }

  return (
    <div className="messages-container">
      <label>Messages</label>
      <Toast ref={toast} />
      <div>
        <form onSubmit={(e) => { sendMessage(e) }}>
          <InputText type="text" placeholder="Write a message" ref={content} />
        </form>
      </div>
      <div className="messages-list-container">
        {messages.length > 0 &&
          messages.map((message, index) => {
            return (
              <div className="messages-item" key={index}>
                <label>De: {message.senderName}, {new Date(message.creationTime.seconds * 1000).toLocaleString()}</label>
                <p>{message.content}</p>
              </div>
            )
          })}
      </div>
    </div>
  )
}