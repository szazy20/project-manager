import React from 'react'
import '../styles/Sidebar.css'
import DashboardIcon from '../assets/dashboard-icon.svg'
import AddIcon from '../assets/add_icon.svg'
import SettingsIcon from '../assets/settings-icon.svg'
import { NavLink } from 'react-router-dom'
import Avatar from './Avatar'
import { useAuthContext } from '../hooks/useAuthContext'
import ProjectsIcon from '../assets/projects-icon.svg'
import InboxIcon from '../assets/inbox.svg'

export default function Sidebar() {

    const { user } = useAuthContext()


  return (
    <div className="sidebar fixed">
        <div className="sidebar-content">
        
            <div className="navbar">
                       
            <Avatar src={user.photoURL} />
                    
            </div>
            <nav className="links">
                <ul>
                    <li>
                        <NavLink to="/">
                            <img src={DashboardIcon} alt="dashboard" className="w-6"></img>
                            <span>Dashboard</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/createproject">
                            <img src={AddIcon} alt="createproject" className="w-6"></img>
                            <span>Create project</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/inbox">
                            <img src={InboxIcon} alt="inbox" className="w-6"></img>
                            <span>Inbox</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/settings">
                            <img src={SettingsIcon} alt="settings" className="w-6"></img>
                            <span>Settings</span>
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </div>
    
    </div>

//     <div className="sidebar py-8 px-4 rounded-md shadow-md bg-gray-800 min-h-screen min-w-full flex flex-col justify-between">
//   <div className="navbar flex justify-center items-center">
//     <Avatar src={user.photoURL} className="w-24 h-24" />
//   </div>
//   <nav className="links mt-8">
//     <ul className="flex flex-col items-center">
//       <li className="mb-4">
//         <NavLink to="/" className="w-full flex items-center p-4 text-white font-bold rounded-md hover:bg-gray-700">
//           <img src={DashboardIcon} alt="dashboard" className="w-6 mr-4" />
//           <span>Dashboard</span>
//         </NavLink>
//       </li>
//       <li className="mb-4">
//         <NavLink to="/createproject" className="w-full flex items-center p-4 text-white font-bold rounded-md hover:bg-gray-700">
//           <img src={AddIcon} alt="createproject" className="w-6 mr-4" />
//           <span>Create project</span>
//         </NavLink>
//       </li>
//       <li className="mb-4">
//         <NavLink to="/settings" className="w-full flex items-center p-4 text-white font-bold rounded-md hover:bg-gray-700">
//           <img src={SettingsIcon} alt="settings" className="w-6 mr-4" />
//           <span>Projects</span>
//         </NavLink>
//       </li>
      
        
//         </ul>
//         </nav>
//         </div>
  )
}
