import { useState } from "react"
import { Navbar } from "./components/Navbar"
import { Route, Routes, useLocation } from "react-router-dom"
import { Home } from "./pages/Home"
import { Cars } from "./pages/Cars"
import { CarDetails } from "./pages/CarDetails"
import MyBookings from "./pages/MyBookings"
import { Footer } from "./components/Footer"
import { Layout } from './pages/owner/Layout'
import { AddCar } from "./pages/owner/AddCar"
import { DashBoard } from "./pages/owner/DashBoard"
import { ManageBookings } from "./pages/owner/ManageBookings"
import { ManageCars } from "./pages/owner/ManageCars"

  export const App = () => {
    // eslint-disable-next-line no-unused-vars
    const[showLogin , setShowLogin] =  useState(false)
    const isOwnerPath = useLocation().pathname.startsWith('/owner')

    return (
      <>  
        {!isOwnerPath && <Navbar setShowLogin={setShowLogin}/>}

        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/cars" element={<Cars/>} />
          <Route path="/car-details/:id" element={<CarDetails/>} />
          <Route path="/my-bookings" element={<MyBookings/>} />

          <Route path="/owner" element={<Layout />}> 
            <Route index element={<DashBoard />}/>
            <Route path="add-car" element={<AddCar />}/>
            <Route path="manage-cars" element={<ManageCars />}/>
            <Route path="manage-bookings" element={<ManageBookings />}/>
          </Route>
          
        </Routes>
        
        {!isOwnerPath && <Footer/>}
        
      </>
    )
  }
 