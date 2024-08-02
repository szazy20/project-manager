import React from 'react'

import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'

export default function Navbar() {

  const {logout} = useLogout()
  const {user} = useAuthContext()

  return (
    <nav className="w-full box-border mb-20 mt-5">
      <ul className="flex items-center justify-end">
        <li className="no-underline">
          {user ? <button className="border-2 border-slate-600 py-2 px-4 rounded-full text-black bg-gray-100 hover:bg-gray-200 focus:outline-none focus:shadow-outline-gray active:bg-gray-300 transition duration-150 ease-in-out" onClick={logout}>Log Out</button> : <></>}
        </li>
      </ul>
    </nav>
  )
}
