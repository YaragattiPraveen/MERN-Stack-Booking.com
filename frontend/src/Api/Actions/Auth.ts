import { FormValues } from "../../Pages/SignUp"
import endPoints from "../Endpoints/endPoints"
import sendApiRequest from "../clientApiServer"

export function Signup(data: FormValues) {
    return sendApiRequest({
        method: 'post',
        url: endPoints.signup,
        data
    })
}

export function SignOut(){
    return sendApiRequest({
        method: "post",
        url: endPoints.signout
    })
}

export function ValidateUser() {
    return sendApiRequest({
        method: 'get',
        url: endPoints.validatetoken
    })
}

export function Signin(data:FormValues) {
    return sendApiRequest({
        method: 'post',
        url: endPoints.signin,
        data
    })   
}