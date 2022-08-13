import React from "react"
import { useState } from "react";
import Sidebarmanager from "./Sidebarmanager";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
const ChangePassword = () => {
    const user = useSelector((state) => state.auth.login.currentUser);
    const [userinfo, setuserInfor] = useState([]);
    const [passwordOld, setPasswordOld] = useState("");
    const [passwordNew, setPasswordNew] = useState("");
    const [passwordConf, setPasswordConf] = useState("");
    const [formError, setFormError] = useState({});
    const [formErrorPwC, setFormErrorPwc] = useState("");
    const [successMsg, setSuccessMsg] = useState("");
    const [errorMsg, setErrorMsg] = useState("")
    const [isSubmit, setIsSubmit] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/v1/Customer/GetCustomer?id=${user.id}`, {
                    headers: { "Authorization": `Bearer ${user.token}` }
                })
                setuserInfor(res.data);
            } catch (error) {
                console.log("Failed to fetch data");
            }
        }
        fetchData();
    }, [])
    const ChangePassword = {
        phonenumber: userinfo.phonenumber,
        newPassword: passwordNew,
        oldPassword: passwordOld,
    }
    const UpdateClick = (e) => {
        e.preventDefault();
        setFormError(validate(ChangePassword));
        setIsSubmit(true);
    }
    useEffect(() => {
        if (ChangePassword.newPassword != passwordConf) {
            setFormErrorPwc("Xác nhận mật khẩu phải giống với mật khẩu mới");
        } else if (!passwordConf && ChangePassword.newPassword != passwordConf) {
            setFormErrorPwc("Xác nhận mật khẩu phải giống với mật khẩu mới");
        } else if (Object.keys(formError).length === 0 && !formErrorPwC && isSubmit === true) {
            const fetchData = async () => {
                try {
                    const res = await axios.post(`http://localhost:5000/api/v1/Account/ChangePassword`, ChangePassword);
                    if (res.data === true) {
                        setErrorMsg("");
                        setSuccessMsg("Thay đổi thành công");
                    } else if (res.data == "Incorrect old Password") {
                        setSuccessMsg("")
                        setErrorMsg("Mật khẩu cũ không chính xác");
                    }
                } catch (error) {
                    console.log("Failed to fetch Data");
                }
            }
            fetchData()
        }
    }, [formError])
    const validate = (values) => {
        const errors = {};
        if (!values.oldPassword) {
            errors.oldPassword = "Vui lòng nhập mật khẩu";
        }
        if (!values.newPassword) {
            errors.newPassword = "Vui lòng nhập mật khẩu mới";
        } else if (values.newPassword.length < 8) {
            errors.newPassword = "Mật khẩu mới phải trên 8 ký tự";
        } else if (values.newPassword == passwordConf) {
            setFormErrorPwc()
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
                    <div className="page-title">Thay đổi Mật khẩu</div>
                    <form onSubmit={UpdateClick}>
                        <div className="form-group">
                            <label className="page-label-title">Mật khẩu cũ<span className="red-text">*</span></label>
                            <input type="password" className="input-getvalue" onChange={(e) => setPasswordOld(e.target.value)} />
                        </div>
                        <p className="error-warning-account">{formError.oldPassword}</p>
                        <div className="form-group">
                            <label className="page-label-title-long">Mật khẩu mới<span className="red-text">*</span></label>
                            <input type="password" className="input-getvalue" onChange={(e) => setPasswordNew(e.target.value)} />
                        </div>
                        <p className="error-warning-account">{formError.newPassword}</p>
                        <div className="form-group">
                            <label className="page-label-title-long">Xác nhận mật khẩu mới<span className="red-text">*</span></label>
                            <input type="password" className="input-getvalue" onChange={(e) => setPasswordConf(e.target.value)} />
                        </div>
                        <p className="error-warning-account">{formErrorPwC}</p>
                        <div className="form-group">
                            <button type="submit" className="button-update">Đổi mật khẩu</button>
                        </div>
                        <p className="popup-success-update">{successMsg}</p>
                        <p className="error-warning-changepassword">{errorMsg}</p>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default ChangePassword;