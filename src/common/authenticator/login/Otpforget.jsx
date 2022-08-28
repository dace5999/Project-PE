import axios from "axios";
import React, { useState } from "react"
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom"
const ForgetPass = () => {
    const navigate = useNavigate();
    const initalValues = {
        phoneNumber: ""
    }
    const [formValue, setFormValue] = useState(initalValues);
    const [formError, setFormError] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");
    const HandleChange = (e) => {
        const { name, value } = e.target;
        setFormValue({ ...formValue, [name]: value })
    }
    const HandleSubmit = async (e) => {
        e.preventDefault();
        setFormError(validate(formValue));
        console.log(formError)
        setIsSubmit(true);
    }
    useEffect(() => {
        if (Object.keys(formError).length === 0 && isSubmit === true) {
            const fetchData = async () => {
                try {
                    const res = await axios.get(`http://192.168.162.202:5000/api/v1/Account/VerifyPhoneChangePassword?phoneNum=${formValue.phoneNumber}`)
                    if (res.data === true) {
                        navigate(`/changepasswordforget/${formValue.phoneNumber}`);
                        // <Link to={`/changepasswordforget${formValue.phoneNumber}`}></Link>
                        // navigate(`/changepasswordforget`)
                    } else if (res.data === false) {
                        setErrorMsg("Không thể gửi mã xác thực");
                        setSuccessMsg("");
                    } else if (res.data === "The phone number does not belong to any account") {
                        setErrorMsg("Số điện thoại chưa được đăng ký");
                        setSuccessMsg("");
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
        const regex = /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/;
        if (!values.phoneNumber) {
            setErrorMsg("");
            setSuccessMsg("");
            errors.phoneNumber = "Vui lòng nhập số điện thoại";
        } else if (!regex.test(values.phoneNumber)) {
            setErrorMsg("");
            setSuccessMsg("");
            errors.phoneNumber = "Vui lòng nhập đúng số điện thoại";
        }
        return errors;
    }
    return (
        <div className="login-page-background">
            <section className="login-page-form">
                <form onSubmit={HandleSubmit}>
                    <img className="logo-page" src="https://i.chungta.vn/2017/12/22/LogoFPT-2017-copy-3042-1513928399.jpg" width={"30%"} style={{ 'margin-left': '35%' }} />
                    <h5 className="page-items-title">
                        Quên mật khẩu
                    </h5>
                    <div class="group-input">
                        <input id="user" type="text" name="phoneNumber" className="input-form" value={formValue.phoneNumber} onChange={HandleChange} placeholder="Nhập số điện thoại" />
                    </div>
                    <p className="error-warning">{formError.phoneNumber}</p>
                    <p className="verify-success">{successMsg}</p>
                    <p className="error-warning">{errorMsg}</p>
                    <div className="group-button">
                        <button type="submit" class="button" >Nhận mã kích hoạt</button>
                    </div>
                </form>
            </section>
        </div>
    )
}
export default ForgetPass;