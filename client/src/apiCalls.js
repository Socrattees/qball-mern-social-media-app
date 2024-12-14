import axios from "axios";
import {
  LoginStart,
  LoginSuccess,
  LoginFail
} from "./context/UserActions";

// call that deals with logging a user in and sets them online
export const loginCall = async (user, dispatch) => {
  dispatch(LoginStart());
  try {
    const res = await axios.post("/api/auth/login", user);
    dispatch(LoginSuccess(res.data));
  } catch (err) {
    dispatch(LoginFail(err));
  }
};

// call that logs the user off and sets them offline
export const logOutCall = async (user) => {
  try {
    await axios.put("/api/auth/logout", { id: user._id });
  } catch (err) {
    console.log("Failed to log the user out");
  }
}

// call that deals with creating a new user account
export const registerCall = async (user, dispatch) => {
  try {
    await axios.post("/api/auth/register", user);
    loginCall({email: user.email, password: user.password}, dispatch);
  } catch (err) {
    console.log("Register unsuccessful");
  }
}

// call that deals with liking/unliking a user
export const likeCall = async (postId, currentUserId) => {
  try {
    await axios.put(`/api/posts/${postId}/like`, { userId: currentUserId });
  } catch (err) {
    console.log("An error occured with the like button");
  }
}

// call that deals with the uploading of a file
export const uploadCall = async (file) => {
  try {
    await axios.post(`/api/upload`, file);
  } catch (err) {
    console.log("There was an error while uploading the file");
  }
}

// call that creates a new post
export const newPostCall = async (post) => {
  try {
    await axios.post("/api/posts", post);
  } catch (err) {
    console.log("An error occured while creating the new post");
  }
}

// call that grabs the list of a user's followings
export const getFollowingsCall = async (user) => {
  try {
    const res = await axios.get("/api/users/followings/" + user._id);
    return res;
  } catch (err) {
    console.log("An error occured while retrieving list of followings");
  }
}

// call that grabs the list os a user's followings that are online
export const getFollowingsOnlineCall = async (user) => {
  try {
    const res = await axios.get("/api/users/followings/" + user._id + "/online");
    return res;
  } catch (err) {
    console.log("An error occured while retrieving list of online followings");
  }
}

// call that deals with following a user
export const followCall = async (user, currentUser) => {
  try {
    await axios.put(`/api/users/${user._id}/follow`, {
      userId: currentUser._id,
    });
  } catch (err) {
    console.log("An error occured while following the user");
  }
}

// call that deals with unfollowing a user
export const unFollowCall = async (user, currentUser) => {
  try {
    await axios.put(`/api//users/${user._id}/unfollow`, {
      userId: currentUser._id,
    });
  } catch (err) {
    console.log("An error occured while unfollowing the user");
  }
}

// call that handles the searchbar in the navbar
export const searchCall = async (query) => {
  try {
    const res = await axios.get(`/api/users/search?q=${query}`);
    return res;
  } catch (err) {
    console.error("Failed to fetch search results", err);
  }
}

// call that retrieves a conversation
export const getConversationCall = async (userId) => {
  try {
    const res = await axios.get(`/api/conversations/${userId}`);
    return res;
  } catch (err) {
    console.error("Failed to get the conversation", err);
  }
}

// call that gets a friend's details from a conversation
export const getFriendConversationCall = async (friendId) => {
  try {
    const res = await axios.get(`/api/users?userId=${friendId}`);
    return res;
  } catch (err) {
    console.error("Failed to get friend's details from a conversation", err);
  }
}