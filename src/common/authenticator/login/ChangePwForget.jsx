import React, { useState } from "react"
import axios from "axios";
import { useEffect } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom"
const ChangePsForget = () => {
    const { phone } = useParams();
    const navigate = useNavigate();
    const PhoneChangePass = {
        phonenumber: phone,
        code: "",
        newPassword: ""
    }
    const [formValue, setFormValue] = useState(PhoneChangePass);
    const [formError, setFormError] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const [errorConf, setErrorConf] = useState("");
    const [newPass, setNewPass] = useState("");
    const [errorChange, setErrorChange] = useState("");
    const HandleChange = (e) => {
        const { name, value } = e.target;
        setFormValue({ ...formValue, [name]: value })
        console.log(formValue)
    }
    const HandleSubmit = (e) => {
        e.preventDefault();
        setFormError(validate(formValue))
        setIsSubmit(true)
        console.log(formError)
        if (newPass != formValue.newPassword) {
            setErrorConf("Mật khẩu xác nhận phải giống mật khẩu mới")
        }
    }
    useEffect(() => {
        if (Object.keys(formError).length == 0 && isSubmit === true && errorConf == "") {
            const fetchData = async () => {
                try {
                    const res = await axios.post(`http://localhost:5000/api/v1/Account/CheckCodeVerifyForPhone`, formValue)
                    console.log(res.data)
                    if (res.data === true) {
                        navigate("/login")
                    } else if (res.data === false) {
                        setErrorChange("Sai mã kích hoạt");
                    }
                } catch (error) {
                    console.log("Failed to fetch data", error)
                }
            }
            fetchData()
        }
    }, [formError])
    const validate = (values) => {
        const errors = {};
        if (!values.code) {
            setErrorConf("")
            setErrorChange("")
            errors.code = "Vui lòng nhập mã OTP"
        }
        if (!values.newPassword) {
            errors.newPassword = "Vui lòng nhập mật khẩu mới"
        } else if (values.newPassword.length < 8) {
            setErrorConf("")
            setErrorChange("")
            errors.newPassword = "Mật khẩu phải trên 8 ký tự"
        }
        return errors
    }
    return (
        <div className="login-page-background">
            <section className="login-page-form">
                <form onSubmit={HandleSubmit}>
                    <img className="logo-page" src="https://i.chungta.vn/2017/12/22/LogoFPT-2017-copy-3042-1513928399.jpg" width={"30%"} style={{ 'margin-left': '35%' }} />
                    <h5 className="page-items-title">
                        Thay đổi mật khẩu
                    </h5>
                    <div class="group-input">
                        <input id="user" type="text" name="phoneNumber" className="input-form" defaultValue={phone} readOnly />
                    </div>
                    <p className="error-warning"></p>
                    <div class="group-input">
                        <input id="otp" type="text" name="code" className="input-form" value={formValue.code} onChange={HandleChange} placeholder="Nhập Otp" />
                    </div>
                    <p className="error-warning">{formError.code}</p>
                    <div class="group-input">
                        <input id="pass" type="password" name="newPassword" className="input-form" value={formValue.newPassword} onChange={HandleChange} placeholder="Nhập mật khẩu" />
                    </div>
                    <p className="error-warning">{formError.newPassword}</p>
                    <div class="group-input">
                        <input id="comfirmpassword" type="password" name="Confirmpassword" className="input-form" onChange={(e) => setNewPass(e.target.value)} placeholder="Xác nhận mật khẩu" />
                    </div>
                    <p className="error-warning">{errorConf}</p>
                    <p className="verify-success"></p>
                    <div className="group-button">
                        <button type="submit" class="button" >Cập nhật mật khẩu</button>
                    </div>
                    <p className="error-warning-register">{errorChange}</p>
                </form>
            </section>
        </div>
    )
}
export default ChangePsForget