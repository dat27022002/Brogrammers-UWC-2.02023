import * as api from "../model/api/api";

export const formatDateToInput = (dateString) => {
  // change date format from dd/mm/yyyy to yyyy-mm-dd to put in html input[type="date"]
  return dateString.split("/").reverse().join("-");
}

export const formatDateTimeToISO = (dateTimeString) => {
  // change date format from dd/mm/yyyy to yyyy-mm-ddThh:MM:ssto put in new Date()
  return formatDateToInput(dateTimeString.slice(0, 10)) + "T" + dateTimeString.slice(11)
}

const compareDates = (firstDate, secondDate) => {
  return new Date(formatDateTimeToISO(firstDate)) > new Date(formatDateTimeToISO(secondDate)) ? -1 : 1;
}

const compareMessages = (firstMessage, secondMessage) => {
  return compareDates(firstMessage.timestamp, secondMessage.timestamp);
}

export const getLoggedInUser = () => {
  const loggedInUserId = localStorage.getItem("userId");
  const user = api.BackOfficerAPI.get_by_id(loggedInUserId);
  return user;
};

export const validateLogin = (username, password) => {
  const users = api.BackOfficerAPI.filter({
    username: username,
    password: password,
  });
  if (users.length) {
    return {user: users[0], status: 1};
  }
  return {user: null, status: 0};
};

export const validateChangePassword = (user, oldPassword, newPassword, newPasswordAgain) => {
  if (!(oldPassword && newPassword && newPasswordAgain)) return {msg: "You must fill in all fields!", status: -1};
  if (newPassword.length < 4) return {msg: "New password must be longer than 4 characters!", status: -1};
  const userPassword = user.password;
  if (oldPassword !== userPassword) return {msg: "Wrong password!", status: 0};
  else if (newPassword !== newPasswordAgain) return {msg: "Passwords don't match!", status: -1};
  else return {msg: "Password changed successfully!", status: 1};
}

export const getConversationsList = (userId) => {
  
  const allConversations = api.MessageAPI.all();

  const personalConversations = allConversations.filter(conversation => {
    return conversation.users.includes(userId);
  })

  const sortedPersonalConversations = personalConversations.sort((a, b) => {
    const aLastMessage = a.messages.sort(compareMessages).at(-1);
    const bLastMessage = b.messages.sort(compareMessages).at(-1);
    return compareDates(aLastMessage.timestamp, bLastMessage.timestamp);
  })
  return sortedPersonalConversations;
}

export const getLastConversationMessage = (conversationId) => {
  const selectedConversation = api.MessageAPI.get_by_id(conversationId);
  return selectedConversation.messages.sort(compareMessages).at(-1);
}

export const getConversationById = (conversationId) => {
  return api.MessageAPI.get_by_id(conversationId);
}

export const getPersonById = (userId) => {
  const resultCollector = api.CollectorAPI.get_by_id(userId)
  if (!resultCollector) {
    return api.JanitorAPI.get_by_id(userId);
  }
  else return resultCollector;
}

