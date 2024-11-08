import axios from "axios";

export const loginCall = async (user, dispatch) => {
  dispatch({ type: "LOGIN_START" });
  try {
    const res = await axios.post("/api/auth/login", user);
    dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
  } catch (err) {
    dispatch({ type: "LOGIN_FAIL", payload: err });
  }
};

export const registerCall = async (user, dispatch) => {
  try {
    await axios.post("/api/auth/register", user);
    loginCall({email: user.email, password: user.password}, dispatch);
  } catch (err) {
    console.log("Register unsuccessful");
  }
}

export const likeCall = async (postId, currentUserId) => {
  try {
    await axios.put(`/api/posts/${postId}/like`, { userId: currentUserId });
  } catch (err) {
    console.log("An error occured with the like button");
  }
}

export const uploadCall = async (file) => {
  try {
    await axios.post(`/api/upload`, file);
  } catch (err) {
    console.log("There was an error while uploading the file");
  }
}

export const newPostCall = async (post) => {
  try {
    await axios.post("/api/posts", post);
  } catch (err) {
    console.log("An error occured while creating the new post");
  }
}

export const getFollowingsCall = async (user) => {
  try {
    const res = await axios.get("/api/users/followings/" + user._id);
    return res;
  } catch (err) {
    console.log("An error occured while retrieving list of followings");
  }
}

export const followCall = async (user, currentUser) => {
  try {
    await axios.put(`/users/${user._id}/follow`, {
      userId: currentUser._id,
    });
  } catch (err) {
    console.log("An error occured while following the user");
  }
}

export const unFollowCall = async (user, currentUser) => {
  try {
    await axios.put(`/users/${user._id}/unfollow`, {
      userId: currentUser._id,
    });
  } catch (err) {
    console.log("An error occured while unfollowing the user");
  }
}