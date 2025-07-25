import { useState } from "react"
import { Navbar } from "./components/Navbar"
import { Route, Routes, useLocation } from "react-router-dom"
import { Home } from "./pages/Home"
import { Cars } from "./pages/Cars"
import { CarDetails } from "./pages/CarDetails"
import MyBookings from "./pages/MyBookings"


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
        </Routes>

      </>
    )
  }
 