import { Route, Routes } from "react-router-dom";
import { Home } from "../pages/home/Home";
import { Login } from "../pages/login/Login";
import { Register } from "../pages/register/Register";
import { UserContextProvider } from "../context/UserContext";
import { MyProfile } from "../pages/myProfile/MyProfile";
import { NewFlat } from "../pages/newFlat/NewFlat";
import { MyFlats } from "../pages/myFlats/MyFlats";
import { Favorites } from "../pages/favorites/Favorites";
import { ViewFlat } from "../pages/viewFlat/ViewFlat";
import { EditFlat } from "../pages/editFlat/EditFlat";
import { EditUser } from "../pages/editUser/EditUser";
import { UpdatePassword } from "../pages/updatePassword/UpdatePassword";

const AppRouter = () => {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/myProfile/userId/:userId" element={<MyProfile />} />
        <Route path="/newFlat" element={<NewFlat />} />
        <Route path="/myFlats/userId/:userId" element={<MyFlats />} />
        <Route path="/favorites/userId/:userId" element={<Favorites />} />
        <Route path="/viewFlat/flatId/:flatId" element={<ViewFlat />} />
        <Route path="/editflat" element={<EditFlat />} />
        <Route path="/editUser" element={<EditUser />} />
        <Route path="/updatePassword" element={<UpdatePassword />} />
      </Routes>
    </UserContextProvider>
  );
}

export default AppRouter;
