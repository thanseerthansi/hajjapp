import React, { useContext, useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { BiSearch, BiAddToQueue, BiEdit } from 'react-icons/bi';
import { RiDeleteBin6Line } from 'react-icons/ri';
import DataTable from 'react-data-table-component';
import { Simplecontext } from './Simplecontext';
import Axioscall from './Axioscall';

export default function Department() {
  const {Userhandler} = useContext(Simplecontext)
  const [departmentdata, setdepartmentdata]= useState([])
  const [modal, setmodal] = useState(false)
  // const [username, setusername] = useState('')
  // const [password, setpassword] = useState('')
  const [department, setdepartment] = useState({departmentname:"",username:"",password:""})
  const [searchvalue, setsearchvalue] = useState('')
  console.log("department",department)
  useEffect(() => {
    Userhandler()
    Getdeppartment()
  }, [])
  const Getdeppartment=async()=>{
    try {
      let data =await Axioscall("get","department")
      console.log("data",data)
      try {
        if (data.status===200){
          setdepartmentdata(data.data.data)
        }else{
          console.log("Something Went Wrong")
        }
      } catch (error) {
        console.log(error)
      }
      
    } catch (error) {
      console.log(error)
    }
  }
 
  const notify = (msg) => toast.success(msg, {
    position: "top-left",
    theme: "dark",
  });
  const notifyerror = (msg) => toast.error(msg, {
    position: "top-left",
    theme: "dark",
  });

  const rowNumber = (row) => departmentdata.filter(t=>t.departmentname.toUpperCase().includes(searchvalue.toUpperCase())).indexOf(row) + 1;
  // const rowNumber = (row) => departmentdata.indexOf(row) + 1;
  const columns = [

    {
      name: <div>#</div>,
      selector: (row) => rowNumber(row),
      width: "50px",
    },
    {
      name: "Department",
      selector: (itm) => <div>{itm.departmentname}</div>,
      // width:"20%",
    },
    {
      name: "Name",
      selector: (itm) => <div>{itm.username}</div>,
      // width:"20%",
    },
    {
      name: "Password",
      selector: (itm) => <div>{itm.password}</div>,
    },
    {
      name: "Action",
      selector: (itm) => <div className='d-flex'><div>
        <button onClick={()=>setmodal(!modal)} className='btn btn-warning btn-xs '><BiEdit size={15} /></button>
      </div>
        <div className='ml-5' style={{ marginLeft: "2px" }}>
          <button className='btn btn-danger btn-xs' ><RiDeleteBin6Line size={15} /></button>
        </div></div>,
    },
  ]

  const customStyles = {
    cells: {
      style: {
        border: "0.5px solid #f5f2f2 ",

      },
    },

    headCells: {
      style: {
        minHeight: '40px',
        border: "0.5px solid #e8e2e2 ",
        borderTopWidth: '1.5px'
      },

    },
    filter: {
      style: {
        border: "1px solid gray",
      }
    }

  };
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setdepartment(prevState => ({ ...prevState, [name]: value }));
  };
  const Postdepartrment=async(e)=>{
    e.preventDefault();
    try {
      let data =await Axioscall("put","department")
    } catch (error) {
      
    }
  }
  return (
    <div className='page-wrapper p-3 mt-5'>
      <ToastContainer />
      <div className="row">
        <div className="col-md-12 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <div className='row ' >
                <div className='col-6' >
                  <h6 className="card-title text-start text-bold">Department</h6>
                  <div className='text-start'><button onClick={() => setmodal(!modal)} className='btn btn-success btn-sm' ><BiAddToQueue size={20} />&nbsp; Add Department</button></div>
                </div>
                <div className='col-6'>
                  <form className="search-form ml-auto">
                    <div className="input-group">
                      <div className="input-group-text">
                        <BiSearch />
                      </div>
                      <input type="text" onChange={(e) => setsearchvalue(e.target.value)} className="form-control" id="navbarForm" placeholder="Search here..." />
                    </div>
                  </form>
                </div>
              </div>

              <div className="table-responsive pt-3">
                <DataTable
                  pagination
                  // highlightOnHover
                  columns={columns}
                  data={departmentdata.filter(t=>t.departmentname.toUpperCase().includes(searchvalue.toUpperCase()))}
                  defaultSortField="_id"
                  defaultSortAsc={false}
                  paginationRowsPerPageOptions={[10, 20, 50, 100]}
                  // fixedHeader
                  // fixedHeaderScrollHeight='63vh'
                  // className="tablereact  tablereact "
                  customStyles={customStyles}
                />
                {/* <div className="spinner-container">
  <div className="spinner " />
</div> */}


              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="modal " id="exampleModalCenter" tabIndex={1} aria-labelledby="exampleModalCenterTitle" aria-modal="true" role="dialog" style={modal === true ? { display: 'block', paddingRight: 17 } : { display: 'none' }}>
        <div className="modal-dialog modal-dialog-centered modal-lg box-shadow-blank" >
          <div className="modal-content"><div className="modal-header">
            <h5 className="modal-title" id="exampleModalCenterTitle">Department</h5>
            <button onClick={() => setmodal(!modal)} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="btn-close" />
          </div>
            <form className="forms-sample"  >
              <div className="modal-body">
                <div className='row text-start'>
                  <div className="mb-3 col-12">
                    <label htmlFor="Department"  className="form-label ">Department</label>
                    <input name="departmentname" onChange={handleInputChange} value={department.departmentname} type="text" required className="form-control" placeholder="Frame name" />
                  </div>
                  <div className="mb-3 col-12">
                    <label htmlFor="username"  className="form-label ">Name</label>
                    <input  name="username" onChange={handleInputChange} value={department.username} type="text" required className="form-control" placeholder="Username" />
                  </div>
                  <div className="mb-3 col-12">
                    <label htmlFor="password" className="form-label ">Password</label>
                    <input name="password"  onChange={handleInputChange} value={department.password} type="text" required className="form-control" placeholder="Password" />
                  </div>
                </div>
                <div />
              </div>
              <div className="modal-footer">
                <button onClick={() => setmodal(!modal)} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="submit" className="btn btn-primary">Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
