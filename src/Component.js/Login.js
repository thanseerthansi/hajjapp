import React, { useEffect, useState } from 'react'
// import '../App.css';
// import { useNavigate } from 'react-router-dom';
import Scripts from './Scripts';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { BaseURL } from './Baseurl';
// import { BaseUrl } from './Url';
export default function Login() {
  // let navigate = useNavigate();
  const [password, setpassword] = useState('')
  const [username, setusername] = useState('')
  const [load,setload]=useState(false)
  useEffect(() => {
    Scripts()
  }, [])


  const notifyerror = (msg) => toast.error(msg, {
    position: "top-left",
    theme: "dark",
  });
  const loginfn = async (e) => {
    e.preventDefault();
    setload(true)
    // window.location='/'
    try {
      let body = {
        method: "post",
        url: BaseURL + "login",
        data: { "username": username, "password": password }
      }
      let data = await axios(body)
      console.log("data",data)
      if (data.data.code===200) {
        // console.log("dta",data.data.data) 
        window.localStorage.setItem("hajjtoken",data.data.data)
        window.location = '/'
       
      } else {
        setload(false)
        notifyerror("invalid Username or password")        
      }
    } catch (error) {
      console.log(error)
      setload(false)
      try {
        notifyerror(error.response.data.message)
      } catch (e) {
        notifyerror(error.message)
      }    
    }
  }
  return (
    <div className='main-wrapper App'>
      <ToastContainer theme="colored" />
      <div className="page-wrapper full-page">
        <div className="page-content d-flex align-items-center justify-content-center">
          <div className="row w-100 mx-0 auth-page">
            <div className="col-md-6 col-xl-6 mx-auto">
              <div className="card">
                <div className="row">

                  <div className="col-md-8 m-auto ps-md-0">
                    <div className="auth-form-wrapper px-4 py-4">
                      <a href="/" className="noble-ui-logo d-block mb-2">
                        {/* Noble<span>UI</span> */}
                        <img src="../assets/images/logo/logo1.png" alt="light theme" width={80} />
                      </a>
                      <h5 className="text-muted fw-normal mb-4">Welcome back! Log in to your account.</h5>
                      <form className="forms-sample" onSubmit={(e) => loginfn(e)} >
                        <div className="mb-3 text-start">
                          <label htmlFor="userEmail" className="form-label ">Username</label>
                          <input type="text" required onChange={(e) => setusername(e.target.value)} value={username} className="form-control" id="username" placeholder="Username" />
                        </div>
                        <div className="mb-3 text-start">
                          <label htmlFor="userPassword" className="form-label">Password</label>
                          <input type="password" className="form-control" required onChange={(e) => setpassword(e.target.value)} value={password} id="userPassword" autoComplete="current-password" placeholder="Password" />
                        </div>

                        <div>

                          <button type="submit" className="btn btn-danger btn-icon-text mb-2 mb-md-0 ">
                            Login
                          </button>
                        </div>

                      </form>
                      {load? <div className="spinner-container">
                        <div className="spinner " />
                      </div>:null}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}
