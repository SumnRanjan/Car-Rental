import { NavLink, useLocation } from "react-router-dom";
import { assets, dummyUserData, ownerMenuLinks } from "../../assets/assets";
import { useEffect, useState } from "react";

export const Sidebar = () => {
  const location = useLocation();
  const [user, setUser] = useState(dummyUserData);
  const [image, setImage] = useState('');
  const [previewUrl, setPreviewUrl] = useState('');

  useEffect(() => {
    if (image) {
      const objectUrl = URL.createObjectURL(image);
      setPreviewUrl(objectUrl);

      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [image]);

  const updateImage = () => {
    setUser((prev) => ({ ...prev, image: previewUrl }));
    setImage('');
  };

  return (
    <div className="relative min-h-screen md:flex flex-col items-center pt-8 max-w-13 md:max-w-60 w-full border-r border-borderColor text-sm">
      <div className="group relative">
        <label htmlFor="image">
          <img
            src={previewUrl || user?.image || assets.user_profile}
            alt="profile"
            className="rounded-full w-24 h-24 object-cover"
          />
          <input
            type="file"
            id="image"
            accept="image/*"
            hidden
            onChange={(e) => setImage(e.target.files[0])}
          />
          <div className="absolute hidden top-0 right-0 left-0 bottom-0 bg-black/10 rounded-full group-hover:flex items-center justify-center cursor-pointer">
            <img src={assets.edit_icon} alt="edit icon" />
          </div>
        </label>
      </div>

      {image && (
        <button
          onClick={updateImage}
          className="absolute top-0 right-0 flex gap-1 bg-primary/10 text-primary cursor-pointer p-1 px-2 rounded-md text-xs"
        >
          Save <img src={assets.check_icon} alt="check" width={13} />
        </button>
      )}

      <p className="mt-2 text-base max-md:hidden">{user?.name}</p>

      <div className="w-full">
        {ownerMenuLinks.map((link, index) => (
          <NavLink
            key={index}
            to={link.path}
            className={`relative flex items-center gap-2 w-full py-3 pl-4 first:mt-6 ${
              link.path === location.pathname
                ? "bg-primary/10 text-primary"
                : "text-gray-500"
            }`}
          >
            <img
              src={
                link.path === location.pathname ? link.coloredIcon : link.icon
              }
              alt="icon"
            />
            <span className="max-md:hidden">{link.name}</span>
            {link.path === location.pathname && (
              <div className="bg-primary w-1.5 h-8 rounded-l right-0 absolute" />
            )}
          </NavLink>
        ))}
      </div>
    </div>
  );
};
