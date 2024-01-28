import {toast} from "react-toastify"

export const successNotify = (msg:string) => {
    toast.success(msg, {
        position: "top-right",
        autoClose: 5000
    })
}

export const errorNotify = (msg:string) => {
    toast.error(msg,{
        position: 'top-right',
        autoClose: 5000
    })
}