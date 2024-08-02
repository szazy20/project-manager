import React from 'react'
import { useAuthContext } from '../hooks/useAuthContext'
import { useCollection } from '../hooks/useCollection'
import { useDocument } from '../hooks/useDocument'

export default function Invitations() {
  
    const { user } = useAuthContext()
    const { documents } = useCollection('invitations', ["email", "==", user.email])
    const { document } = useDocument('projects', )

    const showdocs = () => {
        console.log(documents)
        console.log(user.email)
    }

    const acceptInvite = (projectId) => {
        console.log(projectId)
    }

    const declineInvite = () => {
        
    }
  
    return (
    <div>Invitations
    {documents && documents.map(doc =>
        <li key={doc.id}>
            <p>{doc.name}</p>
            <button className="mr-5 border-2 border-slate-600 py-2 px-4 rounded-full text-black bg-gray-100 hover:bg-gray-200 focus:outline-none focus:shadow-outline-gray active:bg-gray-300 transition duration-150 ease-in-out" onClick={acceptInvite(doc.projectId)}>Accept</button>
            <button className="border-2 border-slate-600 py-2 px-4 rounded-full text-black bg-gray-100 hover:bg-gray-200 focus:outline-none focus:shadow-outline-gray active:bg-gray-300 transition duration-150 ease-in-out" onClick={declineInvite(doc.projectId)}>Decline</button>
        </li>
    )}
    <button onClick={showdocs}>Siema</button>
    </div>
  )
}
