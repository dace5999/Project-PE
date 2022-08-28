import React, { useEffect } from "react";
import { useState } from "react";
import "./style.css";
import { useSelector } from "react-redux";
import UserAPI from "../../api/UserAPI";
import AddressAPI from "../../api/AddressAPI";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Cart = ({ CartItem, addToCart, decreaseQty, removeToCart }) => {
  let navigate = useNavigate();
  const user = useSelector((state) => state.auth.login.currentUser);
  // Stpe: 7   calucate total of items
  const totalPrice = CartItem.reduce(
    (price, item) => price + item.qty * item.price,
    0
  );
  const [usercwt, setusercwt] = useState("")
  const [userinfo, setuserinfo] = useState([]);
  const [errorPay, setErrorPay] = useState("");
  const [errorCart, setErrorCart] = useState("");
  const [errorMsg, setErrorMsg] = useState(CartItem);
  let date = new Date().toLocaleDateString('en-CA');
  useEffect(() => {
    const FecthData = async () => {
      try {
        const res = await axios.get(`http://192.168.162.202:5000/api/v1/Customer/GetCustomer?id=${user.id}`, {
          headers: { "Authorization": `Bearer ${user.token}` }
        })
        setuserinfo(res.data);
        if (res.data.cwtId != 0) {
          const resloc = await AddressAPI.getlocationbycwt(res.data.cwtId)
          setusercwt(resloc);
        }
      } catch (error) {
        console.log("Failed to fetch data", error)
      }
    }
    FecthData();
  }, [])
  const HandleClick = (e) => {
    e.preventDefault();
    if (!userinfo.address) {
      return navigate("/account");
    } else if (errorMsg.length === 0) {
      setErrorCart("Giỏ hàng rỗng");
    } else if (errorMsg) {
      const ab = CartItem.map((value) => {
        const productQty = value.price * value.qty
        return {
          productId: value.productId,
          quantity: value.qty,
          price: value.price,
        }
      })
      const adressloc = userinfo.address + ", " + usercwt.cwt + ", " + usercwt.district + ", " + usercwt.province;
      const CartItemPost = {
        custormerId: user.id,
        dateCreate: date,
        address: adressloc,
        paymentMethodId: 1,
        totalPrice: totalPrice,
        discountId: null,
        status: 0,
        orderdetails: ab
      }
      console.log(CartItemPost)
      console.log(adressloc)
      const FetchData = async () => {
        try {
          const res = await axios.post(`http://192.168.162.202:5000/api/v1/Order/AddOrder`, CartItemPost, {
            headers: { "Authorization": `Bearer ${user.token}` }
          })
          setErrorPay("Thanh toán thành công");
        } catch (error) {
          console.log("Failed to fetch data", error)
        }
      }
      FetchData();
    }

  }

  // prodcut qty total
  return (
    <>
      <section className="cart-items">
        <div className="container d_flex">
          {/* if hamro cart ma kunai pani item xaina bhane no diplay */}

          <div className="cart-details">
            {CartItem.length === 0 && (
              <h1 className="no-items product">No Items are add in Cart</h1>
            )}

            {/* yasma hami le cart item lai display garaaxa */}
            {CartItem.map((item) => {
              const productQty = item.price * item.qty;

              return (
                <div className="cart-list product d_flex" key={item.productId}>
                  <div className="img">
                    <img src={item.productImageURl} alt="" />
                  </div>
                  <div className="cart-details">
                    <h3>{item.productName}</h3>
                    <h4>
                      {item.price}đ * {item.qty}
                      <span>{productQty}</span>
                    </h4>
                  </div>
                  <div className="cart-items-function">
                    <div className="removeCart">
                      <button className="removeCart" onClick={() => removeToCart(item)}>
                        <i className="fa-solid fa-xmark"></i>
                      </button>
                    </div>
                    {/* stpe: 5 
                    product ko qty lai inc ra des garne
                    */}
                    <div className="cartControl d_flex">
                      <button
                        className="incCart"
                        onClick={() => addToCart(item)}
                      >
                        <i className="fa-solid fa-plus"></i>
                      </button>
                      <button
                        className="desCart"
                        onClick={() => decreaseQty(item)}
                      >
                        <i className="fa-solid fa-minus"></i>
                      </button>
                    </div>
                  </div>

                  <div className="cart-item-price"></div>
                </div>
              );
            })}
          </div>
          <div className="cart-total product">
            <h2>Cart Summary</h2>
            <div className=" d_flex">
              <h4>Total Price :</h4>
              <h3>{totalPrice}</h3>
            </div>
            {
              user ? (
                <button className="button-pay" onClick={HandleClick}>Thanh toán</button>
              ) : (
                <span className="warning-pay">Bạn phải đăng nhập để thanh toán</span>
              )
            }
            <p className="popup-success-pay">{errorPay}</p>
            <p className="warning-pay-error">{errorCart}</p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Cart;
