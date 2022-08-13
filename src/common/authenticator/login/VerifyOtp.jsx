import { React, useEffect, useState } from "react";
import axios from "axios";
const VerifyOtp = () => {
    const [otpcode, setotpcode] = useState("");
    const [phoneNum, setphoneNum] = useState("");
    const [password, setPassword] = useState("");
    const [fullname, setfullname] = useState("");
    const [checked, setchecked] = useState(true);
    const [birthday, setbirthday] = useState();
    const [errorMsg, setErrorMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState();
    const [isSubmit, setIsSubmit] = useState(false);
    const Register = {
        phoneNumber: phoneNum,
        password: password,
        dateofbirth: birthday,
        gender: checked,
        fullname: fullname,
    }
    const [formError, setformError] = useState(Register);
    const Handleregister = (e) => {
        e.preventDefault();
        const fetchData = async () => {
            try {
                const res = await axios.post(`http://localhost:5000/api/v1/Account/RegisterCustomer?code=${otpcode}`, Register)

            } catch (error) {
                console.log("Failed to fetch Data", error)
            }
        }
        fetchData()
    }
    const HandleClick = (e) => {
        const getid = e.target.value
        setbirthday(getid)
        console.log(birthday)
    }
    const Onchangedate = (e) => {
        setbirthday(e.target.value)
    }
    const handleregistertest = (e) => {
        e.preventDefault();
        setformError(validate(Register));
        console.log(Register.dateofbirth);
        setIsSubmit(true);
    }
    useEffect(() => {
        if (Object.keys(formError).length === 0 && isSubmit === true) {
            const fetchData = async () => {
                try {
                    const res = await axios.post(`http://localhost:5000/api/v1/Account/RegisterCustomer?code=${otpcode}`, Register)
                    if (res.data == "Code Valid False") {
                        setErrorMsg("Sai mã xác thực");
                    } else if (res.data === true) {
                        setErrorMsg("")
                        setSuccessMsg("Đăng ký thành công");
                    }
                } catch (error) {
                    console.log("Failed to fetch Data", error)
                }
            }
            fetchData()
        }
    }, [formError])
    const validate = (values) => {
        const errors = {};
        const regex = /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/;
        if (!values.phoneNumber) {
            errors.phoneNumber = "Vui lòng nhập số điện thoại";
        } else if (!regex.test(values.phoneNumber)) {
            errors.phoneNumber = "Vui lòng nhập đúng số điện thoại";
        }
        if (!values.password) {
            errors.password = "Vui lòng nhập mật khẩu";
        } else if (values.password.length < 8) {
            errors.password = "Độ dài mật khẩu trên 8 ký tự";
        }
        if (!values.fullname) {
            errors.fullname = "Vui lòng nhập họ tên";
        } else if (values.fullname < 2) {
            errors.fullname = "Tên quá ngắn";
        }
        if (!values.dateofbirth) {
            errors.dateofbirth = "Vui lòng chọn năm sinh";
        }
        return errors;
    }
    return (
        <div className="login-page-background">
            <section className="login-page-form">
                <form onSubmit={handleregistertest}>
                    <img className="logo-page" src="https://i.chungta.vn/2017/12/22/LogoFPT-2017-copy-3042-1513928399.jpg" width={"30%"} style={{ 'margin-left': '35%' }} />
                    <h5 className="page-items-title">
                        Đăng Ký
                    </h5>
                    <div class="group-input-register">
                        <input id="user" type="text" class="input" className="input-form-register" placeholder="Nhập mã OTP" onChange={(e) => setotpcode(e.target.value)} required />
                    </div>
                    <div class="group-input-register">
                        <input id="user" type="text" class="input" className="input-form-register" placeholder="Nhập họ tên" onChange={(e) => setfullname(e.target.value)} />
                    </div>
                    <p className="error-warning">{formError.fullname}</p>
                    <div class="group-input-register">
                        <input id="user" type="text" class="input" className="input-form-register" placeholder="Nhập số điện thoại" onChange={(e) => setphoneNum(e.target.value)} />
                    </div>
                    <p className="error-warning">{formError.phoneNumber}</p>
                    <div class="group-input-register">
                        <input
                            id="pass"
                            type="password"
                            class="input"
                            className="input-form-register"
                            placeholder="Mật khẩu"
                            data-type="password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <p className="error-warning">{formError.password}</p>
                    {/* <div class="group">
                                <label for="pass" class="label">
                                    Xác nhận mật khẩu
                                </label>
                                <input
                                    id="pass"
                                    type="password"
                                    class="input"
                                    data-type="password"
                                />
                            </div> */}
                    <div class="group-input-register-datepicker">
                        <label className="date-picker-label">Năm sinh</label>
                        <input type="date" class="datepicker" placeholder="Chọn ngày sinh" onChange={Onchangedate} />
                    </div>
                    <p className="error-warning">{formError.dateofbirth}</p>
                    <div class="group-input-gender">
                        <label class="gender-label">
                            Giới tính
                        </label>
                        <input type="radio" name="gender" onChange={(e) => setchecked(true)} defaultChecked /><span className="gender-title">Nam</span>
                        <input type="radio" name="gender" onChange={(e) => setchecked(false)} /> <span className="gender-title">Nữ</span>
                    </div>
                    <div class="group-button">
                        <input type="submit" class="button" value="Kích hoạt tài khoản" />
                    </div>
                    <p className="error-warning-register">{errorMsg}</p>
                    <p className="success-register">{successMsg}</p>
                </form>
            </section>
        </div>
    )
}

export default VerifyOtp;