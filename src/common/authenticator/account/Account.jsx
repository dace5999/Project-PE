import React from "react"
import { BrowserRouter } from "react-router-dom"
import AccountManager from "./AccountManager"
const Account = () => {
    return (
        <BrowserRouter>
            <AccountManager />
        </BrowserRouter>
    )
}
export default Account