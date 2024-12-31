import { createContext, useState } from 'react';
import { User } from '../models/User';

const UserContext = createContext();
export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(new User());
  const updateUser = (user) => setUser(user);
  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContext;