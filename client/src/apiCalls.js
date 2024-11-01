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

export const newPostCall = async (post) => {
  try {
    await axios.post("/api/posts", post);
  } catch (err) {
    console.log("An error occured while creating the new post");
  }
}