import React, { useState } from 'react'
import '../styles/Signup.css'
import { useSignup } from '../hooks/useSignup';

export default function Signup() {

    const [displayName, setDisplayName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {signup, isPending, error} = useSignup();

    const handleSubmit = (e) => {
        e.preventDefault();
        signup(email, password, displayName);
        
        setDisplayName('')
        setEmail('')
        setPassword('')
        
    }
  
    return (
    <form className="auth-form" onSubmit={handleSubmit}>
        <h2> Sign up </h2>
        {error && <div className="text-red-500 text-center py-2 px-3 rounded-lg">{error}</div>}
        <label>
            <span>Name: </span>
            <input required type="text" onChange={(e) => setDisplayName(e.target.value)} value={displayName} />
        </label>
        <label>
            <span>Email: </span>
            <input required type="email" onChange={(e) => setEmail(e.target.value)} value={email} />
        </label>
        <label>
            <span>Password: </span>
            <input required type="password" onChange={(e) => setPassword(e.target.value)} value={password} />
        </label>
        
        {!isPending && <button className="border-2 border-slate-600 py-2 px-4 rounded-full text-black bg-gray-100 hover:bg-gray-200 focus:outline-none focus:shadow-outline-gray active:bg-gray-300 transition duration-150 ease-in-out">Sign up</button>}
        {isPending && <button className="border-2 border-slate-600 py-2 px-4 rounded-full text-black bg-gray-100 hover:bg-gray-200 focus:outline-none focus:shadow-outline-gray active:bg-gray-300 transition duration-150 ease-in-out" disabled>Loading...</button>}
        <br /><a className="text-indigo-600 font-medium mb-4" href="/login">Already have an account?</a>
    </form>
  )
}
