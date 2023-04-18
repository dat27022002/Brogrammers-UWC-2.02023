import Navbar from "../navbar/Navbar";
import React, { useContext } from "react";
import GlobalContext from "../../context/GlobalContext";
import { Link } from "react-router-dom";
import momemt from "moment";
import styles from './chat.module.css'

const Chat = () => {
  const { user, getPersonById, conversationsList, 
    getLastConversationMessage, formatDateTimeToISO } = useContext(GlobalContext);

  return (
    <main>
      <Navbar />
      <div style={{display: 'flex', justifyContent: 'center'}}>
        <div className={styles.chatList}>
          {conversationsList.map((conversation, idx) => {
              const person = getPersonById(conversation.users.filter((userId) => userId !== user.id)[0]);
              
              let lastMessageContent; //Lay ra tin nhan cuoi cung
              if(getLastConversationMessage(conversation.id).senderId === user.id)  {
                lastMessageContent = `You: ${getLastConversationMessage(conversation.id).content}`;
              }
              else  {
                lastMessageContent = `${person.firstName}: ${getLastConversationMessage(conversation.id).content}`;
              }

              return (
                <Link key={idx} to={`/conversation/${conversation.id}`} className = {styles.chatItem}>
                    <div className={styles.chatContainerImage}>
                      <img className={styles.chatItemImage} src={person.avatar} alt={`${person.firstName}'s avatar`} />
                    </div>

                    <div className={styles.chatItemText}>
                      <h2 className={styles.chatName}>{`${person.firstName} ${person.lastName}`}</h2>
                      <p className={styles.chatLastMessage}>{lastMessageContent}</p>
                      <p className={styles.chatLastTime}>
                        {momemt(formatDateTimeToISO(getLastConversationMessage(conversation.id).timestamp)).fromNow()}
                      </p>
                    </div>
                    
                    <div className={styles.chatItemThreePoint}>
                      <i className="fa-solid fa-ellipsis-vertical three-point"></i>
                    </div>
                </Link>
              );
            })}
        </div>
      </div>
    </main>
  );
};

export default Chat;