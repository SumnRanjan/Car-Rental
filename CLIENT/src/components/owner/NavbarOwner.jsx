import { Links } from "react-router-dom";
import {  assets, dummyUserData } from "../../assets/assets"

export const NavbarOwner = () => {

  const user = dummyUserData;
  return (
    <div className="flex items-center justify-between px-6 md:px-10 py-4 text-gray-500 border-b border-borderColor relative transition-all">
      <Links to='/'>
          <img src={assets.logo} alt="" className="h-7" />
      </Links>
      <p>Welcome , {user.name || "Owner"} </p>
    </div>
  )
}
