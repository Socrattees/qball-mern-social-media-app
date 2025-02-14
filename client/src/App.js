import Home from "./pages/home/Home.jsx";
import Login from "./pages/login/Login.jsx";
import Register from "./pages/register/Register.jsx";
import Profile from "./pages/profile/Profile.jsx";
import PublicFeed from "./pages/publicFeed/PublicFeed.jsx";
import { createBrowserRouter, RouterProvider, Navigate, Route, createRoutesFromElements } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "./context/UserContext.js";
import Messenger from "./pages/messenger/Messenger.jsx";

function App() {
  const { user } = useContext(UserContext);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />
        <Route path="/public-feed" element={ <PublicFeed /> } />
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route path="/register" element={user ? <Navigate to="/" /> : <Register />} />
        <Route path="/messenger" element={user ? <Messenger /> : <Navigate to="/login" />} />
        <Route path="/profile/:id" element={user ? <Profile /> : <Navigate to="/login" />} />
      </>
    )
  );

  return <RouterProvider router={ router } />;
}

export default App;
