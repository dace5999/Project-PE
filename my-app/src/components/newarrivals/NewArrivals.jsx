import React, { useState } from "react";
import { useEffect } from "react";
import ProductAPI from "../../api/ProductAPI";
import Cart from "./Cart";
import "./style.css";

const NewArrivals = ({ addToCart }) => {
  const [productNA, setProductNA] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await ProductAPI.getproductNA();
        setProductNA(res);
      } catch (error) {
        console.log("Falied to fetchdata", error)
      }
    }
    fetchData();
  }, [])
  return (
    <>
      <section className="NewArrivals background">
        <div className="container">
          <div className="heading d_flex">
            <div className="heading-left row  f_flex">
              <img src="https://img.icons8.com/glyph-neue/64/26e07f/new.png" />
              <h2>New Arrivals </h2>
            </div>
            {/* <div className="heading-right row ">
              <span>View all</span>
              <i className="fa-solid fa-caret-right"></i>
            </div> */}
          </div>

          <Cart product={productNA} addToCart={addToCart} />
        </div>
      </section>
    </>
  );
};

export default NewArrivals;
