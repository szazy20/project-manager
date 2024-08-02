import React, { useState, useTransition, useEffect } from 'react'
import { useAuthContext } from '../hooks/useAuthContext'
import Avatar from '../components/Avatar'
import '../styles/SettingsAvatar.css'
import SettingsAvatar from '../components/SettingsAvatar'
import { storage, db, timestamp } from '../firebase/firebase'
import { useDocument } from '../hooks/useDocument'
import { useCollection } from '../hooks/useCollection'
import Invitations from '../components/Invitations'

export default function Settings() {

    const {user} = useAuthContext()
    
    const {documents} = useCollection('users', ['id', '==', user.uid])
    const [member, setMember] = useState()
    var docRef = db.collection("users").doc(user.uid);

    docRef.get().then((doc) => {
        if (doc.exists) {
            console.log("Document data:", doc.data());
            setMember(doc.data().createdAt) 
        } else {
            
            console.log("No such document!");
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });
    
  
    
    const imageName = 'name'
    
    const [file, setFile] = useState(null);
    const [url, setURL] = useState("");
    const state = new Date().toLocaleString()

    // const handleUpload = () => {
    //   const imageRef = storage.ref(`/images/${imageName}.png`).put(image)
    //   imageRef.on("state_changed", snapshot => {},
    //   error => {
    //     console.log(error)
    //   },
    //   () => {
    //     storage.ref("images").child(imageName).getDownloadURL().then(url => {
    //       console.log(url)
    //     })
    //   })

    //   console.log(imageRef)
      
    // }
    const handleChange = (e) => {
      if (e.target.files[0])
          setFile(e.target.files[0]);
    }
  
    const handleUpload = async (e) => {
      e.preventDefault();
      const path = `/images/${user.uid}.png`;
      const ref = storage.ref(path);
      await ref.put(file);
      
      const url = await ref.getDownloadURL();
      setURL(url);
      setFile(null);
      
      db.collection('users').doc(user.uid).update({photoURL: url})

      user.updateProfile({ photoURL: url })
        .then(function() { console.log(user) })
        .catch(function(error) { console.log(error) });
    }

  return (
    <div className="w-1/2 mx-auto py-8 px-4 rounded-md shadow-md">
  <div className="flex items-center mb-6">
    <SettingsAvatar className="h-12 w-12 rounded-full" src={user.photoURL} />
    <div className="ml-4">
      <h1 className="text-2xl font-bold text-gray-800">{user.displayName}</h1>
      <p className="text-gray-600">Member since {member}</p>
    </div>
  </div>
  <div className="mb-4">
    <p className="text-gray-800 font-bold mb-2">Email address</p>
    <p className="text-gray-600">{user.email}</p>
  </div>
  <div className="mb-4">
    <p className="text-gray-800 font-bold mb-2">Profile picture</p>
    <input
      type="file"
      onChange={handleChange}
      className="border rounded-md py-2 px-3"
    />
    <button
      className="mt-5 border-2 border-slate-600 py-2 px-4 rounded-full text-black bg-gray-100 hover:bg-gray-200 focus:outline-none focus:shadow-outline-gray active:bg-gray-300 transition duration-150 ease-in-out"
      onClick={handleUpload}
    >
      Change profile picture
    </button>
  </div>
  

{/* <div>
<Invitations />
</div> */}
</div>
  )
}
