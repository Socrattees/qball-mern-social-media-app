import axios from "axios";
import {
  LoginStart,
  LoginSuccess,
  LoginFail
} from "./context/UserActions";

// Call that deals with logging a user in and sets them online
export const loginCall = async (user, dispatch) => {
  dispatch(LoginStart());
  try {
    const res = await axios.post("/api/auth/login", user);
    dispatch(LoginSuccess(res.data));
  } catch (err) {
    dispatch(LoginFail(err));
  }
};

// Call that logs the user off and sets them offline
export const logOutCall = async (user) => {
  try {
    await axios.put("/api/auth/logout", { id: user._id });
  } catch (err) {
    console.error("Failed to log the user out", err);
  }
}

// Call that deals with creating a new user account
export const registerCall = async (user, dispatch) => {
  try {
    await axios.post("/api/auth/register", user);
    loginCall({ email: user.email, password: user.password }, dispatch);
  } catch (err) {
    console.error("Register unsuccessful", err);
  }
}

// Call that retrieves a user's details
export const getUserCall = async (userId) => {
  try {
    const res = await axios.get(`/api/users?userId=${userId}`);
    return res;
  } catch (err) {
    console.error("An error occured while retrieving the user", err);
  }
}

// Call that deals with liking/unliking a user
export const likeCall = async (postId, currentUserId) => {
  try {
    await axios.put(`/api/posts/${postId}/like`, { userId: currentUserId });
  } catch (err) {
    console.error("An error occured with the like button", err);
  }
}

// Call that deals with the uploading of a file
export const uploadCall = async (file) => {
  try {
    await axios.post(`/api/upload`, file);
  } catch (err) {
    console.error("There was an error while uploading the file", err);
  }
}

// Call that creates a new post
export const newPostCall = async (post) => {
  try {
    await axios.post("/api/posts", post);
  } catch (err) {
    console.error("An error occured while creating the new post", err);
  }
}

// Call that grabs the list of a user's followings
export const getFollowingsCall = async (user) => {
  try {
    const res = await axios.get("/api/users/followings/" + user._id);
    return res;
  } catch (err) {
    console.error("An error occured while retrieving list of followings", err);
  }
}

// Call that grabs the list of a user's followings that are online
export const getFollowingsOnlineCall = async (user) => {
  try {
    const res = await axios.get("/api/users/followings/" + user._id + "/online");
    return res;
  } catch (err) {
    console.error("An error occured while retrieving list of online followings", err);
  }
}

// Call that deals with following a user
export const followCall = async (user, currentUser) => {
  try {
    await axios.put(`/api/users/${user._id}/follow`, {
      userId: currentUser._id,
    });
  } catch (err) {
    console.error("An error occured while following the user", err);
  }
}

// Call that deals with unfollowing a user
export const unFollowCall = async (user, currentUser) => {
  try {
    await axios.put(`/api//users/${user._id}/unfollow`, {
      userId: currentUser._id,
    });
  } catch (err) {
    console.error("An error occured while unfollowing the user", err);
  }
}

// Call that handles the searchbar in the navbar
export const searchCall = async (query) => {
  try {
    const res = await axios.get(`/api/users/search?q=${query}`);
    return res;
  } catch (err) {
    console.error("Failed to fetch search results", err);
  }
}

// Call that retrieves a conversation
export const getConversationCall = async (userId) => {
  try {
    const res = await axios.get(`/api/conversations/${userId}`);
    return res;
  } catch (err) {
    console.error("Failed to get the conversation", err);
  }
}

// Call that retrieves a conversation based on two users
export const getConversationTwoUsersCall = async (firstUserId, secondUserId) => {
  try {
    const res = await axios.get(`/api/conversations/find/${firstUserId}/${secondUserId}`);
    return res;
  } catch (err) {
    console.error("Failed to get the conversation based on two users", err);
  }
}

// Call that gets a friend's details from a conversation
export const getFriendConversationCall = async (friendId) => {
  try {
    const res = await axios.get(`/api/users?userId=${friendId}`);
    return res;
  } catch (err) {
    console.error("Failed to get friend's details from a conversation", err);
  }
}

// Call that gets the messages of a conversation
export const getMessagesCall = async (conversationId) => {
  try {
    const res = axios.get(`/api/messages/${conversationId}`);
    return res;
  } catch (err) {
    console.error("Failed to get the messages from the conversation", err);
  }
}

// Call that gets a friend's details from a message (similar to getFriendConversationCall)
export const getFriendMessageCall = async (friendId) => {
  try {
    const res = await axios.get(`/api/users?userId=${friendId}`);
    return res;
  } catch (err) {
    console.error("Failed to get friend's details from a conversation", err);
  }
}

// Call that creates a new message to be stored in the current conversation
export const newMessageCall = async (message) => {
  try {
    await axios.post(`/api/messages`, message);
  } catch (err) {
    console.error("Failed to create a new message for the current conversation", err);
  }
}