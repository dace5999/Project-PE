import React from "react";
import Ndata from "./Ndata";

const Cart = ({ product, addToCart }) => {
  console.log(product)
  return (
    <>
      <div className="content grid product">
        {product.slice(0, 6).map((val, index) => {
          return (
            <div className="box" key={index}>
              <div className="img-cover-na">
                <img src={val.productImageURl} alt="" />
              </div>
              <h4>{`${val.productName.replace(/^(.{30}[^\s]*).*/, "$1")}${val.productName.length > 30 ? `...` : ``}`}</h4>
              <span className="N-price">${val.price}đ</span>
              <button className="button-na" onClick={() => addToCart(val)}>
                <i className="fa fa-plus"></i>
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Cart;
