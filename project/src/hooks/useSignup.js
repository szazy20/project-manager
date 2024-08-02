import { useState, useEffect } from 'react'
import { projectAuth, db } from '../firebase/firebase'
import { useAuthContext } from './useAuthContext'
import profile from '../assets/profile.jpg'

export const useSignup = () => {
  const [isCancelled, setIsCancelled] = useState(false)
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const { dispatch } = useAuthContext()

  const currDate = new Date().toLocaleString()
  const time = currDate.toString()

  const signup = async (email, password, displayName) => {
    setError(null)
    setIsPending(true)
  
    try {
      // signup
      console.log("elo")
      const res = await projectAuth.createUserWithEmailAndPassword(email, password)
      console.log(res.error)

      if (!res) {
        throw new Error('Could not complete signup')
      }

      const imgURL = "https://t4.ftcdn.net/jpg/03/46/93/61/360_F_346936114_RaxE6OQogebgAWTalE1myseY1Hbb5qPM.jpg"

      // add display name to user
      await res.user.updateProfile({ displayName, photoURL: imgURL })

      await db.collection('users').doc(res.user.uid).set({
        displayName,
        email,
        id: res.user.uid,
        photoURL: imgURL,
        createdAt: time
      })

      // dispatch login action
      dispatch({ type: 'LOGIN', payload: res.user })

      if (!isCancelled) {
        setIsPending(false)
        setError(null)
      }
    } 
    catch(err) {
        console.log(err.message)
        setError(err.message)
        setIsPending(false)
      
    }
  }

  useEffect(() => {
    return () => setIsCancelled(true)
  }, [])

  return { signup, error, isPending }
}