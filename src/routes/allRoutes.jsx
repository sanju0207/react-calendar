import React from 'react'
import { Route, Routes } from 'react-router-dom'
import DocListPage from '../pages/docListPage'
import SlotsPage from '../pages/slotsPage'

const AllRoutes = () => {
  return (
    <Routes>
       <Route path='/' element={<DocListPage/>}/>
       <Route path='/slots/:id' element={<SlotsPage/>}/>
    </Routes>
  )
}

export default AllRoutes
