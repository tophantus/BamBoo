import { Home, MessageCircle, Settings, LogOut, Users } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import { useNavigate, NavLink } from 'react-router-dom';

const NavBar = ({img}) => {
  const {authUser} = useAuthStore();
  const navigate = useNavigate();

  const display = authUser ? "" : "hidden";

  const navLinkClass = ({ isActive }) =>
    `relative w-full flex flex-col py-4 px-1 items-center ${display} ${
      isActive 
        ? "bg-oldBamboo text-bamboo after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-full after:h-1 after:bg-textbox" +
        " lg:after:right-0 lg:after:-translate-x-0 lg:after:top-1/2 lg:after:-translate-y-1/2 lg:after:h-full lg:after:w-1 lg:after:left-auto lg:after:bg-textbox lg:after:rounded-full" 
                    
        : "text-milk hover:text-bamboo hover:bg-oldBamboo"
    }`;

  const {logout} = useAuthStore();
  return (
    <div className="flex flex-row lg:flex-col items-center justify-between bg-bamboo w-full h-full lg:mx-[10px] mt-[10px] lg:m-0 lg:my-[10px]  px-2 lg:p-0 lg:py-6 rounded-[10px]">
      {/* Top section: Avatar */}
      <div className="flex flex-row lg:flex-col justify-between items-center w-full lg:gap-4">
        <img
          src={img}
          alt="Avatar"
          className={`w-12 h-12 rounded-full hover:cursor-pointer hover:scale-105 object-cover ${display}`}
          onClick={() => navigate("/profile")}
        />
        {/* Middle section: Navigation icons */}
        <div className="flex flex-row lg:flex-col px-2 lg:p-0 items-center justify-center gap-6 lg:mt-4 w-full">
            <NavLink to={"/"} className={navLinkClass}>
              <Home size={25} />
            </NavLink>
            <NavLink to={"/chat"} className={navLinkClass}>
              <MessageCircle size={25} />
            </NavLink>
            <NavLink to={"/settings"} className={navLinkClass}>
              <Settings size={25} />
            </NavLink>
            <NavLink to={"/explore"} className={navLinkClass}>
              <Users size={25}/>
            </NavLink>
          
        </div>
      </div>

      

      {/* Bottom section: Logout */}
      
      <div className="flex flex-col items-center lg:w-full">
        <button onClick={() => logout()} className={`text-milk hover:text-error hover:bg-oldBamboo w-full flex flex-col py-4 px-1 items-center ${display}`}>
          <LogOut size={28} />
        </button>
      </div>
    </div>
  );
};

export default NavBar;
