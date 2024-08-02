import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../hooks/useAuthContext'
import { useCollection } from '../hooks/useCollection'
import { useDocument } from '../hooks/useDocument'
import Avatar from './Avatar'
import { db } from '../firebase/firebase'

export default function ProjectMembers({ project, projectid }) {
  
    const { user } = useAuthContext()
    const navigate = useNavigate()
    var { documents } = useCollection('users')
    var { document } = useDocument('projects', projectid)
    const [addVar, setAddVar] = useState(false)
    const [creator, setCreator] = useState('')
    const [formError, setFormError] = useState(null)
    const [email, setEmail] = useState('')

    useEffect(() => {
        if(document){
          const options = document.assignedUsersList.map(user => {
            return  {value: user, label: user.displayName}
          })
          
        }
        if(document){
          setCreator(document.createdBy.id)
          
        }
       
      }, [documents])

    const inviteUser = async (e) => {
    e.preventDefault()
    setFormError(null)

    const snapik = await db.collection("invitations").doc().set({
      name: document.name,
      email,
      projectId: projectid
    })
    .then(() => {
        setAddVar(false)
        console.log("Document successfully written!");
    })
    .catch((error) => {
        console.error("Error writing document: ", error);
    });
    }
  
    return (
        <div className="bg-white rounded-md shadow-md p-8 mt-7">
        
        <h4 className="font-bold text-black-800 mb-4">Project members</h4>
        <div className="flex flex-wrap -mx-4">
          {project.assignedUsersList.map(user => (
            <div key={user.id} className="px-4 mb-4 w-1/2" data-testid="project-member">
              <Avatar src={user.photoURL} className="mb-2 rounded-full" />
              <p className="text-gray-800">{user.displayName}</p>
            </div>
          ))}
        </div>
        {creator == user.uid && <button className="border-2 border-slate-600 py-2 px-4 rounded-full text-black bg-gray-100 hover:bg-gray-200 focus:outline-none focus:shadow-outline-gray active:bg-gray-300 transition duration-150 ease-in-out" onClick={(e) => setAddVar(true)}>Add member</button>}
        {addVar == true && 
            <div className=" w-1/2 mx-auto py-8 px-4 rounded-md shadow-md">
  
  <form onSubmit={inviteUser}>
    <label className="block font-bold text-black-800 mb-2">
      <span>User email: </span>
    </label>
      <input required type="text" onChange={(e) => setEmail(e.target.value)} className="border rounded-md py-2 px-3 w-full" />
    
    <button className="mt-5 border-2 border-slate-600 py-2 px-4 rounded-full text-black bg-gray-100 hover:bg-gray-200 focus:outline-none focus:shadow-outline-gray active:bg-gray-300 transition duration-150 ease-in-out">Send an invitation</button>
    {formError && <p className="error mt-2 text-red-600">{formError}</p>}
  </form>
</div>
      }
        </div>
  )
}


