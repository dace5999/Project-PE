import React, { useState } from "react"
import { useEffect } from "react"
import "./account.css"
import NavPage from "./NavPage"
import Sidebarmanager from "./Sidebarmanager"
import { useSelector } from "react-redux";
import axios from "axios"
import AddressAPI from "../../../api/AddressAPI"
const AccountManager = () => {
    const user = useSelector((state) => state.auth.login.currentUser);
    const [userinfo, setuserinfor] = useState([]);
    const [fullname, setfullname] = useState("");
    const [gender, setgender] = useState();
    const [country, setcountry] = useState([])
    const [countryid, setcountryid] = useState('');
    const [distric, setdistric] = useState([]);
    const [districid, setdistricid] = useState('');
    const [cwt, setcwt] = useState([]);
    const [cwtuser, setcwtuser] = useState()
    const [countryname, setcountryname] = useState("")
    const [dateofbirth, setdateofbirth] = useState("")
    const [cwtid, setcwtid] = useState("");
    const [addressuser, setaddressuser] = useState("");
    const [errorUpdate, setErrorUpdate] = useState("");
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await AddressAPI.getAll()
                setcountry(res);
                if (res) {
                    const resac = await axios.get(`http://localhost:5000/api/v1/Customer/GetCustomer?id=${user.id}`, {
                        headers: { "Authorization": `Bearer ${user.token}` }
                    })
                    if (resac) {
                        setuserinfor(resac.data);
                        setfullname(resac.data.fullname)
                        setaddressuser(resac.data.address)
                        setgender(resac.data.gender)
                        const getDate = String(resac.data.dateofbirth).split('T')[0]
                        const date = new Date(getDate);
                        const defaultValue = date.toLocaleDateString('en-CA');
                        setdateofbirth(defaultValue)
                        if (resac.data.cwtId != 0) {
                            console.log(resac.data.cwtId);
                            const resloc = await AddressAPI.getlocationbycwt(resac.data.cwtId)
                            if (resloc) {
                                const resdistric = await AddressAPI.getdisrtic(resloc.provinceId)
                                if (resdistric) {
                                    setcwtuser(resloc)
                                    setdistric(resdistric)
                                    const rescwt = await AddressAPI.getcwt(resloc.districtId)
                                    if (rescwt) {
                                        setcwt(rescwt)
                                        setcwtid(resac.data.cwtId)
                                    }
                                }
                            }
                        }
                    }
                }
            } catch (error) {
                console.log("Failed to fetch data", error)
            }
        }
        fetchData();
    }, [])
    const HandleContry = (e) => {
        const getcountryid = e.target.value;
        setcountryid(getcountryid)
    }
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res1 = await AddressAPI.getdisrtic(countryid)
                setdistric(res1);
                console.log(distric)
            } catch (error) {
                console.log("Failed to fetch data", error)
            }
        }
        fetchData();
    }, [countryid])
    const HandleDistric = (e) => {
        const getdistricid = e.target.value;
        setdistricid(getdistricid)
    }
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await AddressAPI.getcwt(districid)
                setcwt(res);
            } catch (error) {
                console.log("Failed to fetch Data", error)
            }
        }
        fetchData();
    }, [districid])
    const User = {
        customerId: user.id,
        gender: gender,
        fullname: fullname,
        address: addressuser,
        cwtId: cwtid
    }
    const HandleRegister = (e) => {
        e.preventDefault();
        console.log(User)
        const fetchdata = async () => {
            try {
                const res = await axios.post(`http://localhost:5000/api/v1/Customer/CustomerChangeInfo`, User, {
                    headers: { "Authorization": `Bearer ${user.token}` }
                })
                setErrorUpdate("Cập Nhật Thành Công");
                console.log(res)
                console.log(User)
            } catch (error) {
                console.log("Failed to fetch data", error)
            }
        }
        fetchdata()
    }
    return (
        <div className="profile">
            <div className="profile-background">
                <div className="profile-sidebar">
                    <Sidebarmanager />
                </div>
                <div className="profile-page">
                    <div className="page-title">Thông tin tài khoản</div>
                    <form onSubmit={HandleRegister}>
                        <div className="form-group">
                            <label className="page-label-title">Họ tên<span className="red-text">*</span></label>
                            <input type="text" className="input-getvalue" defaultValue={userinfo.fullname} onChange={(e) => setfullname(e.target.value)} required />
                        </div>
                        <div className="form-group">
                            <label className="page-label-title">Số điện thoại<span className="red-text">*</span></label>
                            <input className="input-getvalue" value={userinfo.phonenumber} readOnly></input><a href="/submitphone" className="blue-text">thay số điện thoại</a>
                        </div>
                        <div className="form-group">
                            <label className="page-label-title">Email</label>
                            <input className="input-getvalue" value={userinfo.email} readOnly></input><a href="/submitemail" className="blue-text">thêm email/thay email </a>
                        </div>
                        <div className="form-group">
                            <label className="page-label-title">Giới tính</label>
                            <input type="radio" name="gender" onChange={(e) => setgender(true)} checked={gender === true} /><span className="gender-title">Nam</span>
                            <input type="radio" name="gender" onChange={(e) => setgender(false)} checked={gender === false} /><span className="gender-title">Nữ</span>
                        </div>
                        <div className="form-group">
                            <label className="page-label-title">Sinh nhật</label>
                            <input className="input-getvalue" type="date" defaultValue={dateofbirth} readOnly></input>

                        </div>
                        <div className="form-group">
                            <label className="page-label-title">Tỉnh/thành phố</label>
                            <select className="province" onChange={(e) => HandleContry(e)}>
                                <option className="pro">---Tỉnh/Thành Phố</option>
                                {
                                    country.map((values, index) => {
                                        if (cwtuser && values.provinceId === cwtuser.provinceId) {
                                            return (
                                                <option key={index} value={values.provinceId} className="pro" selected >{values.name}</option>
                                            )
                                        } else {
                                            return (
                                                <option key={index} value={values.provinceId} className="pro" >{values.name}</option>
                                            )
                                        }
                                    })
                                }
                            </select>
                        </div>
                        <div className="form-group">
                            <label className="page-label-title">Quận/Huyện</label>
                            <select className="province" onChange={(e) => HandleDistric(e)}>
                                <option className="pro">---Quận/Huyện---</option>
                                {
                                    distric.map((values, index) => {
                                        if (cwtuser && values.districtId === cwtuser.districtId) {
                                            return (
                                                <option key={index} value={values.districtId} className="pro" selected>{values.name}</option>
                                            )
                                        } else {
                                            return (
                                                <option key={index} value={values.districtId} className="pro">{values.name}</option>
                                            )
                                        }
                                    })
                                }
                            </select>
                        </div>
                        <div className="form-group">
                            <label className="page-label-title">Thị Trấn/Xã</label>
                            <select className="province" onChange={(e) => setcwtid(e.target.value)} >
                                <option className="pro" >---Thị Trấn/Xã---</option>
                                {
                                    cwt.map((values, index) => {
                                        if (cwtuser && values.cwtId === cwtuser.cwtId) {
                                            return (
                                                <option key={index} value={values.cwtId} className="pro" selected>{values.name}</option>
                                            )
                                        } else {
                                            return (
                                                <option key={index} value={values.cwtId} className="pro">{values.name}</option>
                                            )
                                        }
                                    })
                                }
                            </select>
                        </div>
                        <div className="form-group">
                            <label className="page-label-title">Số nhà<span className="red-text">*</span></label>
                            <input className="input-getvalue" defaultValue={userinfo.address} onChange={(e) => setaddressuser(e.target.value)} required></input>
                        </div>
                        <div className="form-group">
                            <button type="submit" className="button-update">Cập Nhật</button>
                        </div>
                        <p className="popup-success-update">{errorUpdate}</p>
                    </form>
                </div>
            </div>
        </div >
    )
}
export default AccountManager;