import React from "react";
import logo from "../../components/assets/images/logo.jpg";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import localStorage from "redux-persist/es/storage";
import { useState } from "react";
const Search = ({ CartItem, shopItem }) => {
  // fixed Header
  window.addEventListener("scroll", function () {
    const search = document.querySelector(".search");
    search.classList.toggle("active", window.scrollY > 100);
  });
  const user = useSelector((state) => state.auth.login.currentUser);
  const HandleClick = () => {
    localStorage.removeItem("persist:root");
    window.location.href = "/"
  }
  const [filterData, setFilterData] = useState([]);
  const [wordSearch, setWordSearch] = useState("");
  const HandleFilter = (e) => {
    const searchword = e.target.value;
    setWordSearch(searchword);
    const newFilter = shopItem.filter((value) => {
      return value.productName.toLowerCase().includes(searchword.toLowerCase());
    });
    if (searchword === "") {
      setFilterData([]);
    }
    else {
      setFilterData(newFilter);
    }
  }
  return (
    <>
      <section className="search">
        <div className="container c_flex">
          <div className="logo width ">
            <Link to={"/"}>
              <img src={logo} alt="" />
            </Link>
          </div>

          <div className="search-box f_flex">
            <i className="fa fa-search"></i>
            <input
              className="search-input"
              type="text"
              placeholder="Search..."
              value={wordSearch}
              onChange={HandleFilter}
            />
            <span>All Category</span>
          </div>
          {user ? (
            <>
              <div className="icon f_flex width">
                <i className="fa fa-user icon-circle"></i>
                <div className="infor-user">
                  <Link to={`/account`}>
                    <p className="navbar-user">{`${user.fullname.replace(/^(.{2}[^\s]*).*/, "$1")}${user.fullname.length > 2 ? `...` : ``}`}</p>
                  </Link>
                  <button className="button-logout" onClick={HandleClick}>Đăng xuất</button>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="icon f_flex width">
                <div className="authen">
                  <Link to="/login">
                    <i className="fa fa-user icon-circle"></i>
                  </Link>
                </div>
              </div>
            </>
          )}
          <div className="cart">
            <Link to="/cart">
              <i className="fa fa-shopping-bag icon-circle"></i>
              <span>{CartItem.length === 0 ? "" : CartItem.length}</span>
            </Link>
          </div>
        </div>
        {
          filterData.length != 0 && (
            <div className="data-result">
              {
                filterData.slice(0, 5).map((values, index) => {
                  return (
                    <a className="data-item" href={`/product/${values.productId}`}>
                      <p>{values.productName}</p>
                    </a>
                  );
                })}
            </div>
          )}
      </section>
    </>
  );
};

export default Search;
