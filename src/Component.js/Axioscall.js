import React from 'react'
import { BaseURL } from './Baseurl'
import axios from 'axios'

export default async function Axioscall(method,url,datalist) {
  
    let body = {
        method:method,
        url:BaseURL+url,
        data: datalist
    }
    try {
        if(method==="get"){
            let data = await axios.get(BaseURL+url,{params:datalist})
            return data
        }else{
            let data = await axios(body)
            return data
        }
    
    } catch (error) {
        console.log(error.message)
        return error
    } 
  
}
