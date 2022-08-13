import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom"
import "./style.css"
import ProductAPI from "../../api/ProductAPI";
const SampleNextArrow = (props) => {
  const { onClick } = props;
  return (
    <div className="control-btn" onClick={onClick}>
      <button className="next">
        <i className="fa fa-long-arrow-alt-right"></i>
      </button>
    </div>
  );
};
const SamplePrevArrow = (props) => {
  const { onClick } = props;
  return (
    <div className="control-btn" onClick={onClick}>
      <button className="prev">
        <i className="fa fa-long-arrow-alt-left"></i>
      </button>
    </div>
  );
};
const FlashCard = ({ productItems, addToCart }) => {
  const [count, setCount] = useState(0);
  const increment = () => {
    setCount(count + 1);
  };
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };
  const [discount, setDiscount] = useState([])
  useEffect(() => {
    const fechData = async () => {
      try {
        const res = await ProductAPI.getdiscount();
        setDiscount(res);
      } catch (error) {
        console.log("Failed to fetch data", error)
      }
    }
    fechData()
  }, [])
  return (
    <>
      <Slider {...settings}>
        {productItems.map((productItems) => {
          return (
            <div className="box">
              <div className="product mtop">
                {/*  */}
                <div style={{ 'text-align': 'center' }}>
                  {
                    discount.map((values) => {
                      if (values.discountId == productItems.discountId && values.discountPercent == null) {
                      } else if (values.discountId == productItems.discountId) {
                        return <span className="discount">{values.discountPercent}% Off</span>
                      } else if (!productItems.discountId) {
                      }
                    })
                  }
                  <img src={productItems.productImageURl} alt="" />
                </div>
                <div className="product-details">
                  <Link to={`/product/${productItems.productId}`}>
                    <h3 className="product-title">{`${productItems.productName.replace(/^(.{30}[^\s]*).*/, "$1")}${productItems.productName.length > 30 ? `...` : ``}`}</h3>
                  </Link>
                  <div className="price">
                    {
                      discount.map((values) => {
                        if (values.discountId == productItems.discountId) {
                          const ab = values.discountPercent * productItems.price / 100;
                          return <h4>${productItems.price - ab} </h4>
                        }
                      })
                    }
                    {
                      productItems.quantity == 0 ? (
                        <div className="sold-out-product">
                          Hết hàng
                        </div>
                      ):(
                        <button onClick={() => addToCart(productItems)}>
                        <i className="fa fa-plus"></i>
                        </button>
                      ) 
                    }
                    {/* <button onClick={() => addToCart(productItems)}>
                      <i className="fa fa-plus"></i>
                    </button> */}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </Slider>
    </>
  );
};

export default FlashCard;
