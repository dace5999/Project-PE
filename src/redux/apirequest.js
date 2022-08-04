import axios from "axios"
import { useState } from "react";
import { loginFailed, loginStart, loginSuccess, logOutStart } from "./authSlice"

export const loginUser = async (user, dispatch, navigate) => {
    dispatch(loginStart());
    try {
        const res = await axios.post(`http://localhost:5000/api/v1/Account/Login?namePage=customerpage`, user);
        dispatch(loginSuccess(res.data));
        navigate("/");
    } catch (error) {
        console.log(error.response.data)
        dispatch(loginFailed(error.response.data));
    }
}


