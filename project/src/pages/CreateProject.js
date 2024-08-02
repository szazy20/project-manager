import React, { useEffect, useState } from 'react'
import '../styles/CreateProject.css'
import Select from 'react-select'
import {useCollection} from '../hooks/useCollection'
import { timestamp } from '../firebase/firebase'
import {useAuthContext} from '../hooks/useAuthContext'
import {useFirestore} from '../hooks/useFirestore'
import {useNavigate} from 'react-router-dom'
import { db } from '../firebase/firebase'


export default function CreateProject() {
  
  const [name, setName] = useState('')
  const [details, setDetails] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [category, setCategory] = useState('')
  const [assignedUsers, setAssignedUsers] = useState([])
  const [formError, setFormError] = useState(null)
  const navigate = useNavigate()
  var [assignedUsersList, setAssignedUsersList] = useState([])

  const {user} = useAuthContext()
  const {addDocument, response} = useFirestore('projects')

  const categories = [
    {value: "development", label: "Development"},
    {value: "design", label: "Design"},
    {value: "planning", label: "Planning"},
    {value: "administration", label: "Administration"},
    {value: "marketing", label: "Marketing"}
  ]
  
  const {documents } = useCollection('users')

  const [users, setUsers] = useState([])

  useEffect(() => {
    if(documents){
      const options = documents.map(user => {
        return  {value: user, label: user.displayName}
      })
      setUsers(options)
    }
    console.log(user)
  }, [documents])
  
  const usersRef = db.collection('projects').get();
  console.log(usersRef)

      // const projusers = async (e) => {
      //   e.preventDefault()
      //   const isCapital = usersRef.where("assignedUsersList", "array-contains", {displayName: user.displayName, id: user.uid, photoURL: user.photoURL}).get();
      //   const isItalian = usersRef.where("createdBy.id", "==", user.uid).get();

      //   const [firstsnap, secondsnap] = await Promise.all([
      //     isCapital,
      //     isItalian
      //   ]);

      //   const usrArr = firstsnap.docs;
      //   const usr2Arr = secondsnap.docs;

      //   const usersArray = usrArr.concat(usr2Arr);

      //   return usersArray;
      // }

      // //We call the asychronous function
      // projusers().then(result => {
      //   result.forEach(docSnapshot => {
      //     console.log(docSnapshot.data());
      //   });
      // });

  const handleSubmit = async (e) => {
    e.preventDefault()
    setFormError(null)
    
    if(!category){
      setFormError("Select a category")
      return 
    }


    const createdBy = {
      displayName: user.displayName,
      photoURL: user.photoURL,
      id: user.uid
    }
    console.log(assignedUsers)
    
    assignedUsersList = 
      assignedUsers.map(usr => {
        return {
          displayName: usr.value.displayName,
          photoURL: usr.value.photoURL,
          id: usr.value.id
        }
      })

    assignedUsersList.push({displayName:user.displayName, photoURL: user.photoURL, id: user.uid})

      // await setAssignedUsersList(items => ({
      //   assignedUsersList: [...assignedUsersList.items, {displayName: user.displayName, id: user.uid, photoURL: user.photoURL}]
      // }));
     await setAssignedUsersList((prevItems) => {
         
        return [...prevItems, {displayName: user.displayName, id: user.uid, photoURL: user.photoURL}]
    })
    

    const project = {
      name,
      details,
      category: category.value,
      dueDate: timestamp.fromDate(new Date(dueDate)),
      comments: [],
      createdBy,
      assignedUsersList
    }

    await addDocument(project)
    if(!response.error){
      navigate('/')
    }
    

    console.log(project)

    console.log(name, details, dueDate, category.value, assignedUsers)
  }

  return (
    <div className="w-1/2 mx-auto py-8 px-4 rounded-md shadow-md">
  <h2 className="page-title text-2xl font-bold text-black-800 mb-4">New project</h2>
  <form onSubmit={handleSubmit}>
    <div className="mb-4">
      <label
        className="block font-bold text-black-800 mb-2"
        htmlFor="name"
      >
        Project name:
      </label>
      <input
        required
        type="text"
        onChange={(e) => setName(e.target.value)}
        value={name}
        className="border rounded-md py-2 px-3 w-full"
      />
    </div>
    <div className="mb-4">
      <label
        className="block font-bold text-black-800 mb-2"
        htmlFor="details"
      >
        Project details:
      </label>
      <textarea
        required
        type="text"
        onChange={(e) => setDetails(e.target.value)}
        value={details}
        className="border rounded-md py-2 px-3 w-full"
      />
    </div>
    <div className="mb-4">
      <label
        className="block font-bold text-black-800 mb-2"
        htmlFor="due-date"
      >
        Set due date:
      </label>
      <input
        type="date"
        onChange={(e) => setDueDate(e.target.value)}
        value={dueDate}
        className="border rounded-md py-2 px-3 w-full"
      />
    </div>
    <div className="mb-4">
      <label
        className="block font-bold text-black-800 mb-2"
        htmlFor="category"
      >
        Project category:
      </label>
      <Select
        onChange={(option) => setCategory(option)}
        options={categories}
        className="w-full"
      />
    </div>
    
    <button className="border-2 border-slate-600 py-2 px-4 rounded-full text-black bg-gray-100 hover:bg-gray-200 focus:outline-none focus:shadow-outline-gray active:bg-gray-300 transition duration-150 ease-in-out">Create project</button>
    </form>
    </div>
  )
}
