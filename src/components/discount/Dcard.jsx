import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Ddata from "./Ddata";
import "./discountstyle.css";
import ProductAPI from "../../api/ProductAPI";
import {Link} from "react-router-dom"
const Dcard = ({ addToCart , product}) => {
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
  };
  const [discount, setDisCount] = useState([]);
  useEffect(()=>{
    const FetchData = async () =>{
      const res = await ProductAPI.getdiscount();
      console.log(res)
      setDisCount(res);
    }
    FetchData()
  }, [])
  return (
    <>
      <Slider {...settings}>
        {product.map((value, index) => {
          return (
            <>
              <div className="box product" key={index}>
                <div style={{"textAlign" : "center"}}>
                {
                    discount.map((values) => {
                      if (values.discountId == value.discountId && values.discountPercent == null) {
                      } else if (values.discountId == value.discountId) {
                        return <span className="discount">{values.discountPercent}% Off</span>
                      } else if (!value.discountId) {
                      }
                    })
                  }
                  <img src={value.productImgeURL} alt=""/>
                </div>
                <Link to={`/product/${value.productId}`}>
                <h4>{`${value.productName.replace(/^(.{30}[^\s]*).*/, "$1")}${value.productName.length > 30 ? `...` : ``}`}</h4>
                </Link>
                <span className="D-price">${value.price}</span>
                {
                      value.quantity == 0 ? (
                        <div className="sold-out-product">
                          Hết hàng
                        </div>
                      ):(
                        <button className="button-naa" onClick={() => addToCart(value)}>
                        <i className="fa fa-plus"></i>
                        </button>
                      ) 
                    }
              </div>
            </>
          );
        })}
      </Slider>
    </>
  );
};

export default Dcard;
