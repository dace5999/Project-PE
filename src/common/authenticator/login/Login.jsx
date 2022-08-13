import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../../redux/apirequest";
import { useDispatch } from "react-redux";
import "./style.css";
import { Link } from "react-router-dom"
import { useEffect } from "react";
import { useSelector } from "react-redux";
const Login = () => {
  let errorLogin = useSelector((state) => state.auth.login.errormsg);
  const initalValues = {
    username: "",
    password: ""
  }
  const [formValue, setformValue] = useState(initalValues);
  const [formError, setFormError] = useState(initalValues)
  const [errorMsg, setErrorMsg] = useState("");
  const [isSubmit, setisSubmit] = useState(false);
  const [username1, setUsername] = useState("");
  const [password2, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleChange = (e) => {
    setErrorMsg("");
    console.log(e.target)
    setFormError(initalValues);
    const { name, value } = e.target;
    setformValue({ ...formValue, [name]: value });
    console.log(formValue)
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError(validate(formValue));
    setisSubmit(true);

  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (Object.keys(formError).length == 0 && isSubmit === true) {
          const login = await loginUser(formValue, dispatch, navigate);
          if (!login && errorLogin === "Invalid password") {
            setErrorMsg("Sai mật khẩu");
          } else {
            setErrorMsg("");
          }
          // if (errorLogin == "Invalid password") {
          //   setErrorMsg("Sai mật khẩu");
          // }
        }
      } catch (error) {
        console.log("Failed to fetch data", error);
      }
    }
    fetchData()
  }, [formError])
  const validate = (values) => {
    let errors = {};
    if (!values.username) {
      setErrorMsg("");
      errors.username = "Vui lòng nhập số điện thoại!";
    }
    if (!values.password) {
      setErrorMsg("");
      errors.password = "Vui lòng nhập mật khẩu!";
    }
    return errors;
  }

  return (
    <>
      <div className="login-page-background">
        <section className="login-page-form">
          <form onSubmit={handleSubmit}>
            <img className="logo-page" src="https://i.chungta.vn/2017/12/22/LogoFPT-2017-copy-3042-1513928399.jpg" width={"30%"} style={{ 'margin-left': '35%' }} />
            <h5 className="page-items-title">
              Đăng nhập
            </h5>
            <div class="group-input">
              <input
                id="user"
                type="text"
                name="username"
                className="input-form"
                placeholder="Vui lòng nhập số điện thoại"
                value={formValue.username}
                // onChange={(e) => setUsername1(e.target.value)}
                onChange={handleChange}
              />
            </div>
            <p className="error-warning">{formError.username}</p>
            <div class="group-input">
              <input
                id="pass"
                type="password"
                name="password"
                className="input-form"
                data-type="password"
                placeholder="Vui lòng nhập mật khẩu"
                value={formValue.password}
                // onChange={(e) => setPassword2(e.target.value)}
                onChange={handleChange}
              />
            </div>
            <p className="error-warning">{formError.password}</p>
            <p className="error-warning">{errorMsg}</p>
            <a href="/forgotpass" className="forgetps-title">Quên mật khẩu?</a>
            <div class="group-button">
              <input type="submit" class="button" value="Đăng nhập" onClick={console.log("Clicked")} />
            </div>
            <div class="foot-link">
              <Link to='/register'>
                <a >Tạo tài khoản</a>
              </Link>
            </div>
          </form>
        </section>
      </div>
    </>
  );
};
export default Login;
