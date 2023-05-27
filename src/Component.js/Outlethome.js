import React, { useContext, useEffect } from 'react'
import Header from './Header'
import Scripts from './Scripts'
import { Outlet } from 'react-router-dom'

export default function Outlethome() {
    useEffect(() => {
        Scripts( )
      }, [])
  return (
    <>
        <Header/>
        <div className='main-wrapper'>
        <Outlet />
        </div>

    </>
  )
}
