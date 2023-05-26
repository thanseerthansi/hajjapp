import React, { useContext, useEffect, useState } from 'react'
// import Callaxios from './Callaxios'
// import { Simplecontext } from './Simplecontext'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { BiSearch, BiAddToQueue, BiEdit } from 'react-icons/bi';
import { RiDeleteBin6Line } from 'react-icons/ri';
// import Scripts from './Scripts';
import DataTable from 'react-data-table-component';
// import Callaxios from './Callaxios';
// import { Simplecontext } from './Simplecontext';

export default function Department() {
  const { departmentdata, setdepartmentdata } = useState([])
  const [modal, setmodal] = useState(false)
  const [username, setusername] = useState('')
  const [password, setpassword] = useState('')
  const [department, setdepartment] = useState('')
  const [searchvalue, setsearchvalue] = useState('')
  // console.log("selectframe",selectframe)
  useEffect(() => {
    // Getframe()
    // accesscheck()
    // Scripts()
  }, [])
  const notify = (msg) => toast.success(msg, {
    position: "top-left",
    theme: "dark",
  });
  const notifyerror = (msg) => toast.error(msg, {
    position: "top-left",
    theme: "dark",
  });

  // const rowNumber = (row) => departmentdata.filter(t=>t.framename.toUpperCase().includes(searchvalue.toUpperCase())).indexOf(row) + 1;
  const rowNumber = (row) => departmentdata.indexOf(row) + 1;
  const columns = [

    {
      name: <div>#</div>,
      selector: (row) => rowNumber(row),
      width: "50px",
    },
    {
      name: "Frame Name",
      selector: (itm) => <div>{itm.framename}</div>,
      // width:"20%",
    },
    {
      name: "Background Frame",
      selector: (itm) => <div className='d-flex-col text-center'><img src={itm.image} width={70} className="img-thumbnail" alt="layout images" />
      </div>,
    },
    {
      name: "Main Image",
      selector: (itm) => <div className='d-flex-col text-center'><img src={itm.main_image} width={70} className="img-thumbnail" alt="layout mainimages" />
      </div>,
    },
    {
      name: "Action",
      selector: (itm) => <div className='d-flex'><div>
        <button className='btn btn-warning btn-xs '><BiEdit size={15} /></button>
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
                  <div className='text-start'><button onClick={() => setmodal(!modal)} className='btn btn-success btn-sm' ><BiAddToQueue size={20} />&nbsp; Add New</button></div>
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
                  data={departmentdata}
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
                    <label htmlFor="userEmail" className="form-label ">Department</label>
                    <input onChange={(e) => setdepartment(e.target.value)} value={department} type="text" required className="form-control" placeholder="Frame name" />
                  </div>
                  <div className="mb-3 col-12">
                    <label htmlFor="userEmail" className="form-label ">Name</label>
                    <input onChange={(e) => setusername(e.target.value)} value={username} type="text" required className="form-control" placeholder="Username" />
                  </div>
                  <div className="mb-3 col-12">
                    <label htmlFor="password" className="form-label ">Password</label>
                    <input onChange={(e) => setpassword(e.target.value)} value={password} type="text" required className="form-control" placeholder="Password" />
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
