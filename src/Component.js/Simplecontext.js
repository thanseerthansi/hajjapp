import { createContext } from "react";
import { useNavigate } from "react-router-dom";

export const Simplecontext= createContext();

export default function Simplecontextprovider({children}) {
    let navigate =useNavigate();
    const Userhandler =()=>{
        let user = window.localStorage.getItem("hajjtoken")
        // console.log("user",user)
        if (!user){
            return navigate("/login")
        }
        // else{
        //     console.log("user in eles")
        // }
    }
  return (
   <Simplecontext.Provider value={{Userhandler}}>{children}</Simplecontext.Provider>
  )
}
