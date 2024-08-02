import React from 'react'
import Signup from '../styles/Signup.css'
import { useState } from 'react'
import { useLogin } from '../hooks/useLogin'

export default function Login() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {login, isPending, error} = useLogin()

    const handleSubmit = (e) => {
        e.preventDefault()
        login(email, password)
        setEmail('')
        setPassword('')
    }


  return (
    <form className="auth-form" onSubmit={handleSubmit}>
        <h2> Login </h2>
        {error && <div className="text-red-500 text-center py-2 px-3 rounded-lg">{error}</div>}
        <label>
            <span>Email: </span>
            <input required type="email" onChange={(e) => setEmail(e.target.value)} value={email} />
        </label>
        <label>
            <span>Password: </span>
            <input required type="password" onChange={(e) => setPassword(e.target.value)} value={password} />
        </label>
        
        {!isPending && <button className="border-2 border-slate-600 py-2 px-4 rounded-full text-black bg-gray-100 hover:bg-gray-200 focus:outline-none focus:shadow-outline-gray active:bg-gray-300 transition duration-150 ease-in-out">Login</button>}
        {isPending && <button className="border-2 border-slate-600 py-2 px-4 rounded-full text-black bg-gray-100 hover:bg-gray-200 focus:outline-none focus:shadow-outline-gray active:bg-gray-300 transition duration-150 ease-in-out" disabled>Loading...</button>}
        <br /><a className="text-indigo-600 font-medium mb-4" href="/signup">Don't have an account?</a>
    </form>
  )
}
