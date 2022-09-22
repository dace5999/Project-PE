import { React, useEffect, useState } from "react";
import RegisterApi from "../../../api/RegisterApi";
import { useNavigate } from "react-router-dom";
import axios from "axios"
const Register = () => {
    const initalValues = {
        phoneNumber: ""
    }
    const [formValue, setformValue] = useState(initalValues);
    const [formError, setFormError] = useState(initalValues);
    const [isSubmit, setIsSubmit] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [errorMsgExist, setErrorMsgExist] = useState("");
    let nevigate = useNavigate();
    const HandleClick = () => {
        nevigate(`/verifyaccount`);
    }
    const handleChange = (e) => {
        setFormError(initalValues)
        const { name, value } = e.target;
        console.log(e.target)
        setformValue({ ...formValue, [name]: value });
        console.log(formValue)
    }
    const HandleSubmit = async (e) => {
        e.preventDefault()
        setFormError(validate(formValue));
        console.log(formValue.phoneNumber)
        setIsSubmit(true);
        console.log(formError)

    }
    useEffect(() => {
        if (Object.keys(formError).length == 0 && isSubmit === true) {
            console.log("aaa")
            const phoneNumber1 = formValue.phoneNumber;
            const fetchData = async () => {
                try {
                    const res = await axios.get(`http://localhost:5000/api/v1/Account/VerifyPhone?phoneNum=${phoneNumber1}`)
                    if (res.data == "Phone number is already exist") {
                        setErrorMsgExist("Số điện thoại đã tồn tại");
                    } else if (res.data == true) {
                        nevigate(`/verifyaccount/${phoneNumber1}`)
                    } else if (res.data == "False with sending code to phone") {
                        setErrorMsg("");
                        setFormError("");
                        setErrorMsgExist("Không thể gửi mã kích hoạt")
                    }
                } catch (error) {
                    console.log(error.response.data)
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
            setErrorMsgExist("");
            errors.phoneNumber = "Vui lòng nhập số điện thoại";
        } else if (!regex.test(values.phoneNumber)) {
            setErrorMsg("");
            setErrorMsgExist("");
            errors.phoneNumber = "Vui lòng nhập đúng số điện thoại"
        }
        return errors;
    }
    return (
        <div className="login-page-background">
            <section className="login-page-form">
                <form onSubmit={HandleSubmit}>
                    <img className="logo-page" src="https://i.chungta.vn/2017/12/22/LogoFPT-2017-copy-3042-1513928399.jpg" width={"30%"} style={{ 'margin-left': '35%' }} />
                    <h5 className="page-items-title">
                        Đăng Ký
                    </h5>
                    <div class="group-input">
                        <input id="user" type="text" name="phoneNumber" className="input-form" placeholder="Nhập số điện thoại" value={formValue.phoneNumber} onChange={handleChange} />
                    </div>
                    <p className="error-warning">{formError.phoneNumber}</p>
                    <p className="verify-success">{errorMsg}</p>
                    <p className="error-warning">{errorMsgExist}</p>
                    <div className="group-button">
                        <button type="submit" class="button" >Nhận mã kích hoạt</button>
                    </div>
                </form>
            </section>
        </div>
    )
}
export default Register;