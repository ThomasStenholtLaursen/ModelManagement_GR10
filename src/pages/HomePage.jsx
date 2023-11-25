import MenuDrawer from "../contexts/MenuDrawer";
import { useAuth } from "../hooks/useAuth";

const HomePage = () => {
  const { user, logoutUser } = useAuth();

  return (
    <MenuDrawer>
      <h1>{user.role}</h1>
      <h1>{user.email}</h1>
      <button onClick={logoutUser}>Logout</button>
    </MenuDrawer>
  );
};

export default HomePage;
