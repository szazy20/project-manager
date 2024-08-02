import React from 'react'
import { useAuthContext } from '../hooks/useAuthContext'
import { useCollection } from '../hooks/useCollection'
import { useDocument } from '../hooks/useDocument'
import { db } from '../firebase/firebase'
import { updateDocument, useFirestore } from '../hooks/useFirestore'
import firebase from 'firebase/app'

export default function Inbox() {
  
    const { user } = useAuthContext()
    const { documents } = useCollection('invitations', ["email", "==", user.email])
    
    const { updateDocument, response} = useFirestore('projects')

    const acceptInvite = async (doc) => {
        await db.collection('invitations').doc(doc.id).delete();
        
        await db.collection('projects').doc(doc.projectId).update({
            assignedUsersList: firebase.firestore.FieldValue.arrayUnion({displayName: user.displayName, id: user.uid, photoURL: user.photoURL})
        });
    }
    
    const declineInvite = async (doc) => {
        await db.collection('invitations').doc(doc.id).delete();
    }
  
    return (
    <div>Invitations
    {!documents && <p>No invites</p>}
    {documents && (
        <ul>
        {documents.map(doc =>
        <li key={doc.id}>
            <p>{doc.name}</p>
            <button className="mr-5 border-2 border-slate-600 py-2 px-4 rounded-full text-black bg-gray-100 hover:bg-gray-200 focus:outline-none focus:shadow-outline-gray active:bg-gray-300 transition duration-150 ease-in-out" onClick={(e) => acceptInvite(doc)}>Accept</button>
            <button className="border-2 border-slate-600 py-2 px-4 rounded-full text-black bg-gray-100 hover:bg-gray-200 focus:outline-none focus:shadow-outline-gray active:bg-gray-300 transition duration-150 ease-in-out" onClick={(e) => declineInvite(doc)}>Decline</button>
        </li>
        )}
        </ul>
    )}
    
    </div>
  )
}