import { Route, Routes } from "react-router-dom";
import { Home } from "../pages/home/Home";
import { Login } from "../pages/login/Login";
import { Register } from "../pages/register/Register";
import { UserContextProvider } from "../context/UserContext";
import { MyProfile } from "../pages/myProfile/MyProfile";
import { NewFlat } from "../pages/newFlat/NewFlat";
import { Favorites } from "../pages/favorites/Favorites";
import { ViewFlat } from "../pages/viewFlat/ViewFlat";
import { EditFlat } from "../pages/editFlat/EditFlat";

const AppRouter = () => {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/myProfile" element={<MyProfile />} />
        <Route path="/newFlat" element={<NewFlat />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/viewFlat" element={<ViewFlat />} />
        <Route path="/editflat" element={<EditFlat />} />
      </Routes>
    </UserContextProvider>
  );
}

export default AppRouter;
