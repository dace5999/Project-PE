import { useState } from "react"
import { useEffect } from "react"
import UserAPI from "../../../api/UserAPI";
import Sidebarmanager from "./Sidebarmanager"
import { useSelector } from "react-redux";
import RegisterApi from "../../../api/RegisterApi";
import axios from "axios";
const SubmitEmail = () => {
    const user = useSelector((state) => state.auth.login.currentUser);
    const [userinfo, setuserinfo] = useState([]);
    const [emailchange, setemailchange] = useState("");
    const [otpcode, setotpcode] = useState("");
    const [isSubmitPhone, setisSubmitPhone] = useState(false);
    const [isSubmit, setIsSubmit] = useState(false);
    const [sucessMsg, setSuccessMsg] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [successSend, setSuccessSend] = useState("");
    const [errorSend, setErrorSend] = useState("");
    const EmailChange = {
        emailOrPhoneChange: emailchange,
        codeVerify: otpcode,
        phonenumber: userinfo.phonenumber
    }
    useEffect(() => {
        const FetchData = async () => {
            try {
                const res = await axios.get(`http://192.168.162.202:5000/api/v1/Customer/GetCustomer?id=${user.id}`, {
                    headers: { "Authorization": `Bearer ${user.token}` }
                })
                setuserinfo(res.data)
                console.log(res)
            } catch (error) {
                console.log("Failed to fetch data", error)
            }
        }
        FetchData()
    }, [])
    const [formError, setFormError] = useState(EmailChange);
    const HandleClick = (e) => {
        e.preventDefault();
        setFormError(validate(EmailChange));
        setisSubmitPhone(true);
        setIsSubmit(false);
        setErrorMsg("")
        setSuccessMsg("")
    }
    useEffect(() => {
        if (Object.keys(formError).length === 0 && isSubmitPhone === true) {
            const FetchData = async () => {
                try {
                    const res = await RegisterApi.getotpemail(emailchange);
                    console.log(res)
                    if (res === true) {
                        setErrorSend("");
                        setSuccessSend("Đã gửi mã xác nhận");
                    } else if (res == "False with sending code to email") {
                        setSuccessSend("")
                        setErrorSend("Không thể gữi mã xác nhận");
                    } else if (res == "Email is already exist") {
                        setSuccessSend("")
                        setErrorSend("Email đã tồn tại");
                    }
                } catch (error) {
                    console.log("Failed to fetch Data")
                }
            }
            FetchData()
        }
    }, [formError])

    const SubmitEmail = (e) => {
        e.preventDefault();
        setFormError(validateemmail(EmailChange));
        setIsSubmit(true)
        setisSubmitPhone(false)
        setErrorSend("");
        setSuccessSend("");
    }
    useEffect(() => {
        if (Object.keys(formError).length === 0 && isSubmit === true) {
            const FetchData = async () => {
                try {
                    const res = await axios.post(`http://192.168.162.202:5000/api/v1/Account/ChangeOrAddEmail`, EmailChange, {
                        headers: { "Authorization": `Bearer ${user.token}` }
                    })
                    if (res.data === true) {
                        setErrorMsg("");
                        setSuccessMsg("Thay đổi thành công");
                    } else if (res.data === false) {
                        setSuccessMsg("");
                        setErrorMsg("Thay đổi không thành công")
                    }
                } catch (error) {
                    console.log("Failed to fetch data", error)
                }
            }
            FetchData()
        }
    }, [formError])
    const validate = (values) => {
        const errors = {};
        const regexemail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        if (!values.emailOrPhoneChange) {
            setSuccessSend("");
            setErrorSend("");
            errors.emailOrPhoneChange = "Vui lòng nhập Email";
        } else if (!regexemail.test(values.emailOrPhoneChange)) {
            setSuccessSend("");
            setErrorSend("");
            errors.emailOrPhoneChange = "Vui lòng nhập đúng định dạng email"
        }
        return errors;
    }
    const validateemmail = (values) => {
        const errors = {};
        const regexemail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        if (!values.emailOrPhoneChange) {
            setErrorSend("");
            setSuccessSend("");
            errors.emailOrPhoneChange = "Vui lòng nhập Email";
        } else if (!regexemail.test(values.emailOrPhoneChange)) {
            setSuccessSend("");
            setErrorSend("");
            errors.emailOrPhoneChange = "Vui lòng nhập đúng định dạng email"
        }
        if (!values.codeVerify) {
            setSuccessSend("");
            setErrorSend("");
            errors.codeVerify = "Vui lòng nhập mã xác thực";
        } else if (values.codeVerify.length < 6 || values.codeVerify.length > 6) {
            setSuccessSend("");
            setErrorSend("");
            errors.codeVerify = "Mã OTP gồm 6 ký tự"
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
                    <div className="page-title">Thay đổi Email</div>
                    <form onSubmit={SubmitEmail}>
                        <div className="form-group">
                            <label className="page-label-title">Email<span className="red-text">*</span></label>
                            <input className="input-getvalue" defaultValue={userinfo.email} readOnly />
                        </div>
                        <div className="form-group">
                            <label className="page-label-title">Email mới<span className="red-text">*</span></label>
                            <input type="text" className="input-getvalue" onChange={(e) => setemailchange(e.target.value)} /> <button className="button-verify" onClick={HandleClick}>Nhận mã OTP</button>
                        </div>
                        <p className="success-message">{successSend}</p>
                        <p className="error-warning-account">{errorSend}</p>
                        <p className="error-warning-account">{formError.emailOrPhoneChange}</p>
                        <div className="form-group">
                            <label className="page-label-title">Mã Otp<span className="red-text">*</span></label>
                            <input type="text" className="input-getvalue" onChange={(e) => setotpcode(e.target.value)} />
                        </div>
                        <p className="error-warning-account">{formError.codeVerify}</p>
                        <div className="form-group">
                            <button type="submit" className="button-update">Thay đổi</button>
                        </div>
                        <p className="successsend-message">{sucessMsg}</p>
                        <p className="error-warning-message">{errorMsg}</p>
                    </form>
                </div>
            </div>
        </div >
    )
}
export default SubmitEmail