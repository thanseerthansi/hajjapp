import React, { useContext, useEffect, useState } from 'react'
import { TbDatabaseExport } from 'react-icons/tb';
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import "react-data-table-component-extensions/dist/index.css";
import { Link } from 'react-router-dom';
import * as XLSX from 'xlsx';
import moment from 'moment';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Axioscall from './Axioscall';
import { Simplecontext } from './Simplecontext';
export default function Passengerlist() {
  const { Userhandler } = useContext(Simplecontext)
  const [ExcelFile, setExcelFile] = useState('');
  const [ExcelFileError, setExcelFileError] = useState('');
  const [excelData, setExcelData] = useState([]);
  const [load,setload]=useState(false)
  // console.log("datapassende", excelData)
  useEffect(() => {
    Userhandler()
  }, [])

  const notify = (msg) => toast.success(msg, {
    position: "top-left",
    theme: "dark",
  });
  const notifyerror = (msg) => toast.error(msg, {
    position: "top-left",
    theme: "dark",
  });
  const filetype = ['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet']
  const handlefile = (e) => {
    let selectfile = e.target.files[0]
    if (selectfile) {
      // console.log(selectfile.type)
      if (selectfile && filetype.includes(selectfile.type)) {
        // console.log("excel")
        let reader = new FileReader();
        reader.readAsArrayBuffer(selectfile);
        reader.onload = (e) => {
          setExcelFileError();
          setExcelFile(e.target.result);
        }
      }

      else {
        setExcelFileError('Please  select  excel file types');
        setExcelFile();
        // console.log("null")
      }

    }
    else {
      console.log("please select file")
    }
  }
  const handlesubmit = () => {
    if (ExcelFile) {
      const workbook = XLSX.read(ExcelFile, { type: 'buffer' });
      const worksheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[worksheetName];
      const data = XLSX.utils.sheet_to_json(worksheet, { raw: false, dateNF: 'dd-mm-yyyy' });
      let passdata = nullhandler(data)
      console.log("data", data)
      setExcelData(passdata);
    }
    else { setExcelFile() }
  }
  const columns = [
    {
      name: <div>SR.NO
      </div>,
      selector: (itm) => itm['SR.NO'],
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
      selector: (itm) => <div className='p-2'>
        <button disabled className='h-auto w-auto rounded  p-1 btn btn-secondary ' >{itm.status}</button>
        <br /><select onChange={(e) => Statushandler(itm._id, e)} className='form-select mt-1' >
          <option value='' hidden>Change Status</option>
          <option value="new">New</option>
          <option value="dispatch">Dispatch</option>
          <option value="delivered">Delivered</option>
          <option value="delete">Delete</option>
        </select>
      </div>,
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
  const Postpassenger = async () => {
    setload(true)
    // console.log("hajjdata", excelData)
    try {
      if (excelData) {
        let data = await Axioscall("post", "passenger", excelData)
        console.log("data", data)
        try {
          if (data.status === 200) {
            notify("Added Successfully")
            setload(false)
          } else {
            notifyerror("Something Went Wrong")
            setload(false)
          }
        } catch (error) {
          notifyerror(data.response.data.message)
          setload(false)
        }

      } else {
        notifyerror("Excel data not found upload excel again")
        setload(false)
      }
    } catch (error) {
      console.log("error", error)
      setload(false)
      // notifyerror(error.response.data.message)
    }
  }
  const nullhandler = (data) => {
    // console.log("datnull",data)
    if (data.length) {
      try {
        data.forEach(element => {
          if (!element.Address) {
            element.Address = ""
          }
        });
        return data
      } catch (error) { console.log(error) }
    } else {
      console.log("No data present")
    }
  }
  const Statushandler = () => {

  }
  return (
    <div className='page-wrapper p-3 mt-5'>
      <ToastContainer />
      <div className="row">
        <div className="col-lg-12 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <div className='container border p-2'>
                <div className='row'>
                  <label ><b>Upload Your File Here</b></label>
                  <div className='col-6'>

                    <input type='file' onChange={handlefile} placeholder='Upload Your File Here' className='form-control ' />
                  </div>
                  <div className='col-6'>
                    <button className='btn btn-primary' style={!ExcelFile ? ExcelFileError ? { cursor: 'not-allowed', opacity: "0.6" } : { cursor: 'not-allowed', opacity: "0.6" } : {}} onClick={handlesubmit} >Upload</button>
                  </div>
                </div>
                <b className='text-danger'>{ExcelFileError}</b>
              </div>
              <div className='text-end mt-2'>
                <button className='btn btn-success ' style={excelData.length ? {} : { cursor: 'not-allowed', opacity: "0.6" }} onClick={Postpassenger} ><TbDatabaseExport size={18} />&nbsp; Export </button>
              </div>
              <div className="">
                <DataTableExtensions
                  columns={columns}
                  data={excelData}
                  print={false}
                  export={false}

                >
                  <DataTable
                    // columns={columns}
                    // data={data}
                    // noHeader
                    // defaultSortField="id"
                    // defaultSortAsc={false}
                    pagination
                    // highlightOnHover
                    // columns={columns}
                    // data={filteredvalue}

                    defaultSortField="_id"
                    defaultSortAsc={false}
                    // pagination
                    // highlightOnHover
                    // pagination
                    fixedHeader
                    // fixedHeaderScrollHeight='63vh'
                    className="tablereact  "
                    // highlightOnHover
                    // subHeader
                    customStyles={customStyles}
                  />
                </DataTableExtensions>

              </div>
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
