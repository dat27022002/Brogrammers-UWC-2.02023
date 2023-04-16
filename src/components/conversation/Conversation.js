import React, { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import GlobalContext from "../../context/GlobalContext";
import Navbar from "../navbar/Navbar";
import styles from './conversation.module.css'
import moment from "moment";

const Conversation = () => {
  const { user, getPersonById, 
    getConversationById, formatDateTimeToISO } = useContext(GlobalContext);
  const navigate = useNavigate()
  const { id: conversationId } = useParams();
  const conversation = getConversationById(conversationId);
  const messages = conversation.messages;
  const person = getPersonById(
    conversation.users.filter((userId) => userId !== user.id)[0]
  );

  const userIsSender = (message) => message.senderId === user.id;
  
  const isWithin60m = (datetime) => {
    return (Date.now() - new Date(formatDateTimeToISO(datetime))) < 60 * 60 * 1000;
  }

  const classStatus = person.status ? 'statusOnline' : 'statusOffline';

  return (
    <>
      <Navbar/>
      <div className={styles.messContainer}>
        <section className={styles.messFrame}>
          <header className={styles.messHeader}>
            <div className={styles.backBtnContainer}>
              <button 
                className={styles.backBtn} 
                onClick={() => navigate("/chat")}
              >
                <i className="fas fa-arrow-left"/>
              </button>
            </div>

            <div
              className={styles.messImage}
              style = {{backgroundImage: `url(${person.avatar})`}}
            >
              <div className={`${styles.statusCircles} ${styles[classStatus]}`}></div>
            </div>

            <div className={styles.messUserContainer}>
              <h1 className={styles.messUserName}> 
                {`${person.firstName} ${person.lastName}`}
                <p className={styles.messUserPosition}>{person.position ? "(Collector)" : "(Janitor)"}</p>
              </h1>
              <p className={styles.messUserStatus}>{person.status ? "Online" : "Offline"}</p>
            </div>

            <div className={styles.messInfoBtn}>
              <i className="fa-solid fa-circle-info"/>
            </div>
          </header>

          <div style={{display: 'flex', justifyContent: 'center'}}>
            <main className={styles.chatFrameContent}>
              {messages.map((message, index) => 
                {
                  const nameClass = userIsSender(message) ? 'chatLineRight' : '';

                  return (
                    <span key={index} className={styles.chatLine}>
                      <div className={`${styles.chatLineContainer} ${styles[nameClass]}`}>
                        <div
                          className={styles.chatLineAvatar}
                          style = {{backgroundImage: `url(${userIsSender(message) ? user.avatar : person.avatar})`}}>
                        </div>

                        <div className={styles.chatBubble}>
                          <div className={styles.chatText}>{message.content}</div>
                        </div>
                      </div>
                    </span>
                  );
                })
              }
            </main>
          </div>

          <div className={styles.messInputContainer}>
            <input type="text" className={styles.messInputBox} placeholder="Enter your message..."/>
            <button type="button" className={styles.sendBtn}>Send</button>
          </div>
        </section>
      </div>
    </>
  );
};

export default Conversation;

