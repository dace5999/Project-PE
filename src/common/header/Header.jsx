import React from "react";
import "./Header.css";
import Head from "./Head";
import Search from "./Search";
import Navbar from "./Navbar";
import Login from "../authenticator/login/Login";

const Header = ({ CartItem, shopItem }) => {
  return (
    <>
      {/* <Head /> */}
      <Search CartItem={CartItem} shopItem={shopItem} />
      <Navbar />
    </>
  );
};

export default Header;
