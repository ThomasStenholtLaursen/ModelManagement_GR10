/* eslint-disable react/prop-types */
import MenuAppBar from "./MenuAppBar";

const Layout = ({ children }) => {
  return (
    <>
      <MenuAppBar />
      {children}
    </>
  );
};

export default Layout;
