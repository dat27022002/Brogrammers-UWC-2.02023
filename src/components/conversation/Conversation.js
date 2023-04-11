import React, { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import GlobalContext from "../../context/GlobalContext";
import Navbar from "../navbar/Navbar";
import './conversation.css';
import moment from "moment";

const Conversation = () => {
  const { user, getPersonById, getConversationById, formatDateTimeToISO } =
    useContext(GlobalContext);
  const navigate = useNavigate()
  const { id: conversationId } = useParams();
  console.log(conversationId);
  const conversation = getConversationById(conversationId);
  console.log("conversation", conversation);
  const messages = conversation.messages;
  const person = getPersonById(
    conversation.users.filter((userId) => userId !== user.id)[0]
  );

  const userIsSender = (message) => {
    console.log("isSender", message.senderId, user.id);
    if (message.senderId === user.id) return true;
    return false;
  };
  const isWithin60m = (datetime) => {
    console.log(Date.now() - new Date(formatDateTimeToISO(datetime)))
    return (Date.now() - new Date(formatDateTimeToISO(datetime))) < 60 * 60 * 1000;
  }

  return (
    <>
    <Navbar/>
    <div className="message-container">
      <section className="msger">
        <header className="msger-header">
          <div className="msger-header-title">
            <div className="msg-back-button-container">
              <button className="back-button" onClick={() => navigate("/chat")}><i className="fas fa-arrow-left"/></button>
            </div>
            <div
                className="msg-img-2"
                style = {{backgroundImage: `url(${person.avatar})`}}
            ><div className={`status-circle ${person.status ? "status-color-online" : "status-color-offline"}`}/></div>
            <div className="msg-username-container">
            <br/>
            <span className="msg-username"> {`${person.firstName} ${person.lastName}`}</span>
            <span className="msg-position">{person.position ? " Collector" : " Janitor"}</span>
            <br/>
            <span className="msg-status">{person.status ? "Online" : "Offline"}</span>
            </div>
            <div className="msg-info-button-container">
              <i className="fa-solid fa-circle-info info-button"/>
            </div>
          </div>
        </header>

        <main className="msger-chat">
        {
          messages.map((message, index) => {
            if (!userIsSender(message))
            return (
              <span className="tooltip-h">
              <div key = {index} className="msg left-msg">
                <div
                className="msg-img"
                style = {{backgroundImage: `url(${userIsSender(message) ? user.avatar : person.avatar})`}}
                />
          
                <div className="msg-bubble">
                  <div className="msg-text">
                  {message.content}
                  </div>
                </div>
                <div className="chat-three-point-container"><i className="fa-solid fa-ellipsis-vertical chat-three-point"/></div>

                </div>
              <div className="msg-timestamp-left tooltip">{isWithin60m(message.timestamp) ? moment(formatDateTimeToISO(message.timestamp)).fromNow() : message.timestamp}</div>
              </span>
            );
            else
            return (
              <span className="tooltip-h">
              <div key = {index} className="msg right-msg">
              <div
              className="msg-img"
              style = {{backgroundImage: `url(${userIsSender(message) ? user.avatar : person.avatar})`}}
              >
              </div>
      
              <div className="msg-bubble">
                <div className="msg-text">
                
                {message.content}
                
                </div>
                
              </div>
              <div className="chat-three-point-container"><i className="fa-solid fa-ellipsis-vertical chat-three-point"/></div>
              
          </div>
          <div className="msg-timestamp-right tooltip">{isWithin60m(message.timestamp) ? moment(formatDateTimeToISO(message.timestamp)).fromNow() : message.timestamp}</div>
          </span>
            );
          })
        }

        </main>
        <div className="msger-inputarea-container">
          <div className="msger-inputarea">
            <input type="text" className="msger-input" placeholder="Enter your message..."/>
            <button type="button" className="msger-send-btn">Send</button>
          </div>
        </div>

      </section>
    </div>
    </>
  );
};

export default Conversation;

