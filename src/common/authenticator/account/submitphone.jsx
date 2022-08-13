import React, { useEffect, useState } from "react"
import "./account.css"
import Sidebarmanager from "./Sidebarmanager"
import { useSelector } from "react-redux";
import axios from "axios";
import UserAPI from "../../../api/UserAPI";
import RegisterApi from "../../../api/RegisterApi";
const SubmitPhone = () => {
    const user = useSelector((state) => state.auth.login.currentUser);
    const [userinfo, setuserinfo] = useState([]);
    const [phonechange, setphonechange] = useState("");
    const [verifyotp, setverifyotp] = useState("");
    const [successMsg, setSuccessMsg] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [successSend, setSuccessSend] = useState("");
    const [errorSend, setErrorSend] = useState("");
    const [isOtp, setIsOtp] = useState(false);
    const [isSubmit, setIsSubmit] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/v1/Customer/GetCustomer?id=${user.id}`, {
                    headers: { "Authorization": `Bearer ${user.token}` }
                })
                setuserinfo(res.data);
            } catch (error) {
                console.log("Failed to fetch Data", error)
            }
        }
        fetchData();
    }, [])
    const PhoneChange = {
        emailOrPhoneChange: phonechange,
        codeVerify: verifyotp,
        phonenumber: userinfo.phonenumber
    }
    const [formError, setFormError] = useState(PhoneChange);
    const Changphonesubmit = (e) => {
        e.preventDefault()
        setFormError(validate(PhoneChange));
        setIsSubmit(true);
        setErrorSend("");
        setIsOtp(false);
    }
    useEffect(() => {
        if (Object.keys(formError).length == 0 && isSubmit === true) {
            const FetchData = async () => {
                try {
                    const res = await axios.post(`http://localhost:5000/api/v1/Account/ChangePhoneNumber`, PhoneChange, {
                        headers: { "Authorization": `Bearer ${user.token}` }
                    })
                    console.log(res);
                    if (res.data === true) {
                        setSuccessMsg("Thay đổi thành công");
                    } else if (res.data === false) {

                        setErrorMsg("Thay đổi không thành công");
                    }

                } catch (error) {
                    console.log("Failed to fetch data", error)
                    console.log(PhoneChange)
                }
            }
            FetchData()
        }
    }, [formError])
    const HandleClick = (e) => {
        e.preventDefault();
        setFormError(validatephone(PhoneChange));
        setIsOtp(true)
        setErrorMsg("");
        setIsSubmit(false)
    }
    useEffect(() => {
        if (Object.keys(formError).length === 0 && isOtp === true) {
            const FetchData = async () => {
                try {
                    const res = await RegisterApi.get(phonechange)
                    console.log(res)
                    if (res === true) {
                        setErrorSend("")
                        setSuccessSend("Đã gửi mã kích hoạt");
                    } else if (res == "Phone number is already exist") {
                        setErrorSend("Số điện thoại đã tồn tại");
                        setSuccessSend("");
                    } else if (res == "False with sending code to phone") {
                        setErrorSend("Không thể gửi mã");
                        setSuccessSend("");
                    }
                } catch (error) {
                    console.log("Failed to fetch Data", error)
                }
            }
            FetchData()
        }
    }, [formError])
    const validatephone = (values) => {
        const errors = {};
        const regex = /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/;
        if (!values.emailOrPhoneChange) {
            setSuccessSend("");
            setErrorMsg("");
            errors.emailOrPhoneChange = "Vui lòng nhập số điện thoại";
        } else if (!regex.test(values.emailOrPhoneChange)) {
            setSuccessSend("");
            setErrorMsg("");
            errors.emailOrPhoneChange = "Vui lòng nhập đúng số điện thoại";
        }
        return errors;
    }
    const validate = (values) => {
        const errors = {};
        const regex = /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/;
        if (!values.codeVerify) {
            setSuccessSend("");
            setErrorMsg("");
            errors.codeVerify = "Vui lòng nhập mã xác thực";
        } else if (values.codeVerify.length < 6 || values.codeVerify.length > 6) {
            setSuccessSend("");
            setErrorMsg("");
            errors.codeVerify = "Mã OTP gồm 6 ký tự"
        }
        if (!values.emailOrPhoneChange) {
            setSuccessSend("");
            setErrorMsg("");
            errors.emailOrPhoneChange = "Vui lòng nhập số điện thoại";
        } else if (!regex.test(values.emailOrPhoneChange)) {
            errors.emailOrPhoneChange = "Vui lòng nhập đúng số điện thoại";
        }
        return errors;
    }
    return (
        <div className="profile">
            <div className="profile-background">
                <div className="profile-sidebar">
                    <Sidebarmanager />
                </div>
                <div className="profile-page">
                    <div className="page-title">Thay đổi số điện thoại</div>
                    <form onSubmit={Changphonesubmit}>
                        <div className="form-group">
                            <label className="page-label-title">Số điện thoại<span className="red-text">*</span></label>
                            <input className="input-getvalue" defaultValue={userinfo.phonenumber} readOnly />
                        </div>
                        <div className="form-group">
                            <label className="page-label-title">Số điện thoại mới<span className="red-text">*</span></label>
                            <input type="text" className="input-getvalue" onChange={(e) => setphonechange(e.target.value)} /><button className="button-verify" onClick={HandleClick}>Nhận mã OTP</button>
                        </div>
                        <p className="success-message">{successSend}</p>
                        <p className="error-warning-account">{errorSend}</p>
                        <p className="error-warning-account">{formError.emailOrPhoneChange}</p>
                        <div className="form-group">
                            <label className="page-label-title">Mã Otp<span className="red-text">*</span></label>
                            <input type="text" className="input-getvalue" onChange={(e) => setverifyotp(e.target.value)} />
                        </div>
                        <p className="error-warning-account">{formError.codeVerify}</p>
                        <div className="form-group">
                            <button type="submit" className="button-update">Thay đổi</button>
                        </div>
                        <p className="success-message">{successMsg}</p>
                        <p className="error-warning-message">{errorMsg}</p>
                    </form>
                </div>
            </div>
        </div >
    )
}

export default SubmitPhone