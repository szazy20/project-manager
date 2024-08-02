import Avatar from "./Avatar"
import { useFirestore } from "../hooks/useFirestore"
import { useAuthContext } from "../hooks/useAuthContext"
import { useNavigate } from "react-router-dom"
import { useCollection } from "../hooks/useCollection"
import { useState } from "react"

export default function ProjectSummary({ project, projectid }) {
    const {deleteDocument} = useFirestore('projects')
    const { user } = useAuthContext()
    const navigate = useNavigate()
    const { documents, error } = useCollection("users")

    const handleClick = (e) => {
        deleteDocument(project.id)
        navigate('/')

    }
  
  return (
    <div className="bg-white rounded-md shadow-md p-8 mt-7">
  <h2 className="font-bold text-2xl text-gray-800 mb-20">{project.name}</h2>
  <p className="text-black-600 mb-20">Category:  {project.category}</p>
  <p className="text-black-600 mb-20">Created by {project.createdBy.displayName}</p>
  <p className="text-black-600 mb-20">
    Project due by {project.dueDate.toDate().toDateString()}
  </p>
  <p className="text-black-800 mb-4">{project.details}</p>

  {/* <h4 className="font-bold text-gray-800 mb-4">Project members</h4> */}
  {/* <div className="flex flex-wrap -mx-4">
    {project.assignedUsersList.map(user => (
      <div key={user.id} className="px-4 mb-4 w-1/2">
        <Avatar src={user.photoURL} className="mb-2 rounded-full" />
        <p className="text-gray-800">{user.displayName}</p>
      </div>
    ))}
  </div> */}
  {user.uid === project.createdBy.id && ( 
    <button className="border-2 border-slate-600 py-2 px-4 rounded-full text-black bg-gray-100 hover:bg-gray-200 focus:outline-none focus:shadow-outline-gray active:bg-gray-300 transition duration-150 ease-in-out" onClick={handleClick}>Mark as complete</button>
  )}
</div>
  )
}