import React, { useEffect, useState } from "react"
import "./App.css"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Header from "./common/header/Header"
import Pages from "./pages/Pages"
import Data from "./components/Data"
import Cart from "./common/Cart/Cart"
import Footer from "./common/footer/Footer"
import Sdata from "./components/shops/Sdata"
import Login from "./common/authenticator/login/Login"
import ProductAPI from "./api/ProductAPI"
import Productlist from "./components/listproductbycate/Productlist"
import ProductDetail from "./components/productdetail/productdetail"
import Register from "./common/authenticator/login/Register"
import ProductbySublist from "./components/listproductbycate/Productlistbysubcate"
import VerifyOtp from "./common/authenticator/login/VerifyOtp"
import AccountManager from "./common/authenticator/account/AccountManager"
import HistoryOrder from "./common/authenticator/account/HistoryOrder"
import SubmitPhone from "./common/authenticator/account/submitphone"
import SubmitEmail from "./common/authenticator/account/submitemail"
import ChangePassword from "./common/authenticator/account/ChangePassword"
import ForgetPass from "./common/authenticator/login/Otpforget"
import ChangePsForget from "./common/authenticator/login/ChangePwForget"
const cartFromLocalStorage = JSON.parse(localStorage.getItem("cart"))
function App() {
  const [CartItem, setCartItem] = useState(cartFromLocalStorage)
  const addToCart = (product) => {
    const productExit = CartItem.find((item) => item.productId === product.productId)
    if (productExit) {
      setCartItem(CartItem.map((item) => (item.productId === product.productId ? { ...productExit, qty: productExit.qty + 1 } : item)))
    } else {
      setCartItem([...CartItem, { ...product, qty: 1 }])
    }

  }
  const decreaseQty = (product) => {

    const productExit = CartItem.find((item) => item.productId === product.productId)

    if (productExit.qty === 1) {
      setCartItem(CartItem.filter((item) => item.productId !== product.productId))
    } else {

      setCartItem(CartItem.map((item) => (item.productId === product.productId ? { ...productExit, qty: productExit.qty - 1 } : item)))
    }
  }
  localStorage.setItem("cart", JSON.stringify(CartItem))
  const removeToCart = (product) => {
    setCartItem(CartItem.filter((item) => item.productId !== product.productId))
    localStorage.setItem("cart", JSON.stringify(CartItem))
  }
  const [Product, setproductList] = useState([]);
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(CartItem))
  }, [CartItem])
  useEffect(() => {
    const fetchCategoryList = async () => {
      try {
        const response = await ProductAPI.getAll();
        setproductList(response);
      } catch (error) {
        console.log('Failed to fetch product list: ', error)
      }
    }
    fetchCategoryList();
  }, [])
  const { ShopItem } = Product
  return (
    <>
      <Router>
        <Header CartItem={CartItem} shopItem={Product} />
        <Routes>
          <Route path='/' element={<Pages productItems={Product} addToCart={addToCart} shopItem={ShopItem} />} exact>
          </Route>
          <Route path='/login' element={<Login />} exact>
          </Route>
          <Route path='/cart' element={<Cart CartItem={CartItem} addToCart={addToCart} decreaseQty={decreaseQty} removeToCart={removeToCart} />} exact>
          </Route>
          <Route path='/category/:id' element={<Productlist addToCart={addToCart} />} />
          <Route path='/product/:id' element={<ProductDetail addToCart={addToCart} />} />
          <Route path='/register' element={<Register />} exact></Route>
          <Route path='/subcate/:id' element={<ProductbySublist addToCart={addToCart} />} />
          <Route path='/verifyaccount' element={<VerifyOtp />} />
          <Route path='/account/*' element={<AccountManager />} />
          <Route path='/order' element={<HistoryOrder />} />
          <Route path='/submitphone' element={<SubmitPhone />} />
          <Route path='/submitemail' element={<SubmitEmail />} />
          <Route path='/changepassword' element={<ChangePassword />} />
          <Route path='/forgotpass' element={<ForgetPass />} />
          <Route path='/changepasswordforget/:phone' element={<ChangePsForget />} />
        </Routes>
        <Footer />
      </Router>
    </>
  )
}

export default App
