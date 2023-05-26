import React, { useState } from 'react'
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import "react-data-table-component-extensions/dist/index.css";
import moment from 'moment';

export default function Home() {
  const [hajjdata,sethajjdata]=useState([])
  const rowNumber = (row) => hajjdata.indexOf(row) + 1;
        const columns =[
    
            {
              name: <div>SR.NO
              </div>,
              selector: (itm) =>itm['SR.NO'],
              width:"70px",
            },
            {
              name:"DATE",
              selector : (itm)=><div className='d-flex-col text-center'>{moment(itm.created_date).format("MM-DD-YYYY")}</div>,
              // selector : (itm)=><div>F{orderdata.created_date.split('T')[1].split('.')[1]}f{orderdata.id}</div>,
              width:"110px"
            },
            {
              name:"FLIGHT SNO",
              selector : (itm)=><div>{itm['Fligth Sno']}</div>,
              width:"105px"
            },
            {
              name:"FLIGHT NO",
              selector : (itm)=><div>{itm['Flight No']}</div>,
            },
            {
              name:"EMPARCATION",
              selector : (itm)=><div>{itm['Emparcation']}</div>,
              width:"120px",
            },
            {
              name:"COVER NO",
              selector : (itm)=><div>{itm['Cover No']}</div>,
            },
            {
              name:"PP NO",
              selector : (itm)=><div>{itm['PP NO']}</div>,
            },
            {
              name:"NAME",
              selector : (itm)=><div style={{ whiteSpace: "normal" }}>{itm['Name']}</div>,
              width:"150px",
              
            },
            {
              name:"ADDRESS",
              selector : (itm)=><div style={{ whiteSpace: "normal" }}>{itm['Address']} </div>,
              width:"150px",
              // style: { overflowWrap: "break-word" }
            },
            {
              name:"DISTRICT",
              selector : (itm)=><div>{itm['District']}</div>,
              width:"130px",
            },
            {
              name:"AGE",
              selector : (itm)=><div>{itm['Age']}</div>,
              // width:"150px",
            },
            {
              name:"GENDER",
              selector : (itm)=><div>{itm['Gender']}</div>,
              // width:"150px",
            },
            {
              name:"MOBILE",
              selector : (itm)=><div>{itm['Mobile No']}</div>,
              width:"130px",
            },
            // {
            //   name:"Status",
            //   selector : (itm)=><div className='p-2'>
            //   <button  disabled className='h-auto w-auto rounded  p-1 btn btn-secondary ' >{itm.status}</button>
            //   <br/><select onChange={(e)=>changestatus(itm.id,e.target.value)} className='form-select mt-1' >
            //     <option value='' hidden>Change Status</option>
            //     <option value="new">New</option>
            //     <option value="dispatch">Dispatch</option>
            //     <option value="delivered">Delivered</option>
            //     <option value="delete">Delete</option>
            //   </select>
            //   </div>,
        
            // },
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
        border:"0.5px solid #e8e2e2 ",
        borderTopWidth: '1.5px'
      },
    
    },
    filter:{
      style:{
        border:"1px solid gray",
      }
    }
 
  };
  const changestatus=()=>{

  }
  return (
    <div className='page-wrapper p-3 mt-5'>

      
     
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
            fixedHeader
            className="tablereact  "
            customStyles={customStyles}
          />
        </DataTableExtensions>
          
        </div>
      </div>
    </div>
  </div>
</div>

 </div>
  )
}
