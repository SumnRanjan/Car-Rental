import { useLocation } from "react-router-dom"
import { assets, dummyUserData } from "../../assets/assets"
import { useState } from "react"

export const Sidebar = () => {

  const user = dummyUserData
  const location = useLocation
  const [image , setImage] = useState('')

  const updateImage = async () =>{
    user.image = URL.createObjectURL(image);
    setImage('')
  }

  
  return (
    <div className="relative min-h-screen md:flex flex-col items-center pt-8 max-w-13 md:max-w-60 w-full border-r border-borderColor text-sm ">
        <div className="group relative">
            <label htmlFor="image">
                <img src={image ? URL.createObjectURL(image) : user?.image || assets.user_profile } alt="" />
                <input type="file" id="image" accept="image/*"  hidden onChange={(e) => setImage(e.target.files[0])}  />

                <div className="absolute hidden top-0 right-0 left-0 bottom-0 bg-black/10 rounded-full group-hover:flex items-center justify-center cursor-pointer ">

                </div>
            </label>
        </div>
    </div>
  )
}
