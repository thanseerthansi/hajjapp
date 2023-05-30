import React, { useContext, useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import "react-data-table-component-extensions/dist/index.css";
import moment from 'moment';
import { BiEdit } from 'react-icons/bi';
import { FaEye } from 'react-icons/fa';
import { Simplecontext } from './Simplecontext';
import Axioscall from './Axioscall';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

export default function Home() {
  const { Userhandler } = useContext(Simplecontext)
  const [hajjdata, sethajjdata] = useState([])
  const [selectdata, setselectdata] = useState('')
  const [status, setstatus] = useState({ departmentname: "", status: "", remark: "" })
  const [load, setload] = useState(true)
  const [modal, setmodal] = useState(false)
  const [modal2, setmodal2] = useState(false)
  // console.log("status", status)
  // console.log("selsecteddata", selectdata)
  useEffect(() => {
    Userhandler()
    Gethajjdata()
  }, [])
  const notify = (msg) => toast.success(msg, {
    position: "top-left",
    theme: "dark",
  });
  const notifyerror = (msg) => toast.error(msg, {
    position: "top-left",
    theme: "dark",
  });
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setstatus(prevState => ({ ...prevState, [name]: value }));
  };
  const Gethajjdata = async () => {
    try {
      let data = await Axioscall("get", "passenger")
      // console.log("hajjdata",data)
      if (data.status === 200) {
        sethajjdata(data.data.data)
        setload(false)
      } else {
        notifyerror(data.message)
        setload(false)
      }
    } catch (error) {
      console.log(error)
      setload(false)
    }
  }
  const rowNumber = (row) => hajjdata.indexOf(row) + 1;
  const columns = [
    {
      name: <div>SR.NO
      </div>,
      selector: (row) => rowNumber(row),
      width: "70px",
    },
    {
      name: "DATE",
      selector: (itm) => <div className='d-flex-col text-center'>{moment(itm['Date']).format("MM-DD-YYYY")}</div>,
      // selector : (itm)=><div>F{orderdata.created_date.split('T')[1].split('.')[1]}f{orderdata.id}</div>,
      width: "110px"
    },
    {
      name: "FLIGHT SNO",
      selector: (itm) => <div>{itm.Flight_Sno}</div>,
      width: "105px"
    },
    {
      name: "FLIGHT NO",
      selector: (itm) => <div>{itm.Flight_No}</div>,
    },
    {
      name: "EMPARCATION",
      selector: (itm) => <div>{itm.Emparcation}</div>,
      width: "120px",
    },
    {
      name: "COVER NO",
      selector: (itm) => <div>{itm.Cover_No}</div>,
    },
    {
      name: "PP NO",
      selector: (itm) => <div>{itm.PP_No}</div>,
    },
    {
      name: "NAME",
      selector: (itm) => <div style={{ whiteSpace: "normal" }}>{itm.Name}</div>,
      width: "150px",
    },
    {
      name: "ADDRESS",
      selector: (itm) => <div style={{ whiteSpace: "normal" }}>{itm.Address} </div>,
      width: "150px",
      // style: { overflowWrap: "break-word" }
    },
    {
      name: "DISTRICT",
      selector: (itm) => <div>{itm.District}</div>,
      width: "130px",
    },
    {
      name: "AGE",
      selector: (itm) => <div>{itm.Age}</div>,
      // width:"150px",
    },
    {
      name: "GENDER",
      selector: (itm) => <div>{itm.Gender}</div>,
      // width:"150px",
    },
    {
      name: "MOBILE",
      selector: (itm) => <div>{itm.Mobile_No}</div>,
      width: "130px",
    },
    {
      name: "Status",
      selector: (itm) => <div className='d-flex'><div>
        <button onClick={()=>setmodal(!modal) & setselectdata(itm)} className='btn btn-primary btn-xs '><FaEye size={15} /></button>
      </div>
        <div className='ml-5' style={{ marginLeft: "2px" }}>
          <button onClick={()=>setmodal2(!modal2) & setselectdata(itm)} className='btn btn-warning btn-xs' ><BiEdit size={15} /></button>
        </div></div>,
      width:"130px"
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
  const changestatus = async (e) => {
    e.preventDefault();
    setload(true)
    try {
      let datalist = {...status}
      let department = window.localStorage.getItem("hajjtoken")
      datalist.departmentname=department
      datalist.passenger_id = selectdata._id
      let data = await Axioscall("put","status",datalist)
      try {
        if (data.status === 200) {
          notify("Successfully added")
          Gethajjdata()
          setmodal2(!modal2)
          setload(false)
          setallnull()
        } else {
          notifyerror("Something went wrong")
          setload(false)
        }
      } catch (error) {
        notifyerror(data.response.data.message)
        setload(false)
      }

    } catch (error) {
      notifyerror("Something went wrong")
      setload(false)
    }
  }
  const setallnull = () => {
    setstatus({ departmentname: "", status: "", remark: "" });
    setselectdata('')
  }
  return (
    <div className='page-wrapper p-3 mt-5'>
      <ToastContainer />
      <div className="row">
        <div className="col-lg-12 grid-margin stretch-card">

          <div className="card">
            <div className="card-body">
              <h6 className="card-title text-start text-bold">Passengers</h6>
              <div className="">
                <DataTableExtensions
                  columns={columns}
                  data={hajjdata}
                  print={false}
                  export={false}
                >
                  <DataTable
                    pagination
                    defaultSortField="_id"
                    defaultSortAsc={false}
                    // fixedHeader
                    className="tablereact"
                    customStyles={customStyles}
                  />
                </DataTableExtensions>

              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="modal " id="exampleModalCenter" tabIndex={1} aria-labelledby="exampleModalCenterTitle" aria-modal="true" role="dialog" style={modal === true ? { display: 'block', paddingRight: 17 } : { display: 'none' }}>
        <div className="modal-dialog modal-dialog-centered modal-lg box-shadow-blank" >
          <div className="modal-content"><div className="modal-header">
            <h5 className="modal-title" id="exampleModalCenterTitle">Status</h5>
            <button onClick={() => setmodal(!modal)& setallnull()} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="btn-close" />
          </div>
          <div className='modal-body'>
          <div className="table-responsive pt-3">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Department</th>
                <th>Status</th>
                <th>Remark</th>
              </tr>
            </thead>
            <tbody>
            {selectdata? selectdata.Status.length ?selectdata.Status.map((itm,k)=>(
                <tr key={k}>
                <td>{itm.departmentname}</td>
                <td>{itm.status}</td>
                <td>{itm.remark}</td>
              </tr>          
              )) :<tr><td colSpan={3} className='text-center'>No Status Found</td></tr>:<tr colSpan={3} className='text-center'><td>No Found</td></tr>}             
            </tbody>
          </table>
        </div>
            </div>
          </div>
        </div>
      </div>
      <div className="modal " id="exampleModalCenter" tabIndex={1} aria-labelledby="exampleModalCenterTitle" aria-modal="true" role="dialog" style={modal2 === true ? { display: 'block', paddingRight: 17 } : { display: 'none' }}>
        <div className="modal-dialog modal-dialog-centered modal-sm box-shadow-blank" >
          <div className="modal-content"><div className="modal-header">
            <h5 className="modal-title" id="exampleModalCenterTitle">Status</h5>
            <button onClick={() => setmodal2(!modal2)& setallnull()} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="btn-close" />
          </div>
            <div>
              <form className="forms-sample" onSubmit={(e)=>changestatus(e)}  >
                <div className="modal-body">
                  <div className='row text-start'>
                    <div className="mb-3 col-12">
                      <label htmlFor="Status" className="form-label ">Status </label>
                      <select required name="status" onChange={handleInputChange} value={status.status} className="form-select" >
                        <option hidden value='' >Select status</option>
                        <option value='confirm' >Confirm</option>
                        <option value='cancel' >Cancel</option>
                        <option value='reject' >Reject</option>
                      </select>
                    </div>
                    {status.status==="confirm" ?null:
                    <div className="mb-3 col-12">
                      <label htmlFor="remark" className="form-label ">Reason</label>
                      <input name="remark" onChange={handleInputChange} value={status.remark} type="text"required  className="form-control" placeholder="reason" />
                    </div>
                    }
                  </div>
                  <div />
                </div>
                <div className="modal-footer">
                  <button onClick={() => setmodal2(!modal2) & setallnull()} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                  <button type="submit" className="btn btn-primary">Save</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {load ? <div className="spinner-container">
        <div className="spinner " />
      </div> : null}

    </div>
  )
}
