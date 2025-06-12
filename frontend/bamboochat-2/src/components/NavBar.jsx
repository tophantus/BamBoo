import { Home, MessageCircle, Settings, LogOut } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import { useNavigate, NavLink } from 'react-router-dom';

const NavBar = ({img}) => {
  const {authUser} = useAuthStore();
  const navigate = useNavigate();

  const display = authUser ? "" : "hidden";

  const navLinkClass = ({ isActive }) =>
    `relative w-full flex flex-col py-4 px-1 items-center ${display} ${
      isActive 
        ? "bg-oldBamboo text-bamboo after:content-[''] after:absolute after:right-0 after:top-1/2 after:-translate-y-1/2 after:h-full after:w-1 after:bg-textbox after:rounded-full" 
        : "text-milk hover:text-bamboo hover:bg-oldBamboo"
    }`;

  const {logout} = useAuthStore();
  return (
    <div className="flex flex-col items-center justify-between bg-bamboo w-full h-full py-6 rounded-[30px]">
      {/* Top section: Avatar */}
      <div className="flex flex-col items-center w-full gap-4">
        <img
          src={img}
          alt="Avatar"
          className={`w-12 h-12 rounded-full object-cover ${display}`}
          onClick={() => navigate("/profile")}
        />
        {/* Middle section: Navigation icons */}
        <div className="flex flex-col items-center gap-6 mt-4 w-full">
            <NavLink to={"/"} className={navLinkClass}>
              <Home size={25} />
            </NavLink>
            <NavLink to={"/chat"} className={navLinkClass}>
              <MessageCircle size={25} />
            </NavLink>
            <NavLink to={"/settings"} className={navLinkClass}>
              <Settings size={25} />
            </NavLink>
          
        </div>
      </div>

      

      {/* Bottom section: Logout */}
      
      <div className="flex flex-col items-center w-full">
        <button onClick={() => logout()} className={`text-milk hover:text-error hover:bg-oldBamboo w-full flex flex-col py-4 px-1 items-center ${display}`}>
          <LogOut size={28} />
        </button>
      </div>
    </div>
  );
};

export default NavBar;
