import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { BsBuildingAdd } from 'react-icons/bs';
import { TbDatabaseExport } from 'react-icons/tb';
import { MdOutlinePeopleAlt,MdOutlineLogout } from 'react-icons/md';
import Scripts from './Scripts';
export default function Header() {
  let navigate = useNavigate();
  useEffect(() => {
    Scripts()
  }, [])
  // console.log("tokren",window.localStorage.getItem("hajjtoken"))
  const logoutfn=()=>{
    // console.log("logout")
    window.localStorage.setItem("hajjtoken",false)
    return navigate('/login');
  }
  return (
    <div>
    {/* partial:partials/_sidebar.html */}
<nav className="sidebar">
<div className="sidebar-header ">
 <Link to= "/" className="sidebar-brand">
   {/* NNPA<span>UI</span> */}
   <img src="../assets/images/logo/logo1.png" alt="light theme" width={65} height={55} style={{marginLeft: "-9px"}} />
 </Link>
 <div className="sidebar-toggler not-active">
   <span />
   <span />
   <span />
 </div>
</div>
<div className="sidebar-body">
 <ul className="nav">
   <li className="nav-item nav-category">Main</li>
   {/* <li className="nav-item">
     <Link to="/text" className="nav-link">
       <i className="link-icon" data-feather="box" />
       <span className="link-title">Dashboard</span>
     </Link>
   </li>  */}
   
   <li className="nav-item not-active colorlink ">
     <Link to="/" className="nav-link ">
       {/* <i className="link-icon" data-feather="grid" /> */}
       <MdOutlinePeopleAlt  size={28}/>
       <span className="link-title "><b>Passengers</b></span>
     </Link>
   </li>
  
   {window.localStorage.getItem("hajjtoken")==="superAdmin"?<>
   <li className="nav-item not-active colorlink ">
     <Link to="/passengerlist" className="nav-link">
       {/* <i className="link-icon" data-feather="table" /> */}
       <TbDatabaseExport size={24}/>
       <span className="link-title " style={{paddingLeft:"4px"}}><b>Export Passengers</b></span>
     </Link>
   </li>
   <li className="nav-item not-active colorlink">
     <Link to="/department" className="nav-link">
       {/* <i className="link-icon" data-feather="table" /> */}
       <BsBuildingAdd size={24}/>
       <span className="link-title " style={{paddingLeft:"4px"}}><b>Department</b></span>
     </Link>
   </li>
   </>:null}
 </ul>
</div>
</nav>

{/* partial:partials/_navbar.html */}
<div className="page-wrapper" >
<nav className="navbar">
 <a href= "/" className="sidebar-toggler">
   <i data-feather="menu" />
 </a>
 <div className="navbar-content">
 <ul className="navbar-nav" style={{marginLeft:"0px"}}>
    <li className="nav-item ">
    <h6 className="card-title text-start text-bold">{window.localStorage.getItem('hajjtoken')}</h6></li>
  </ul>
   <ul className="navbar-nav">
    
     <li className="nav-item colorlink">
     <a style={{cursor:"pointer"}} onClick={()=>logoutfn()} className="nav-link ms-0">
       {/* <i className="me-2 icon-md" data-feather="log-out" /> */}
       <MdOutlineLogout className='me-1 icon-md'/>
       <span style={{}}>Log Out</span>
     </a>
       
     </li>
   </ul>
 </div>
</nav>
</div>
</div>
  )
}
