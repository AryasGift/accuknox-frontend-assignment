import axios from "axios";
export const commonRequest=async(method,url,data)=>{
    let config={
        method,
        url,
        data
    }
    return await axios(config).then(result=>{
        return result
    }).catch(result=>{
        return result
    })
}