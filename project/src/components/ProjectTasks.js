import React, { useEffect, useState } from 'react'
import '../styles/CreateProject.css'
import Select from 'react-select'
import {useCollection} from '../hooks/useCollection'
import { timestamp } from '../firebase/firebase'
import {useAuthContext} from '../hooks/useAuthContext'
import {useFirestore} from '../hooks/useFirestore'
import {Link, useNavigate} from 'react-router-dom'
import { db } from '../firebase/firebase'
import Avatar from './Avatar'
import { useDocument } from '../hooks/useDocument'
import { formatDistanceToNow } from 'date-fns'




export default function ProjectTasks({project, tasks, projectid}) {

    const [name, setName] = useState('')
  const [details, setDetails] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [category, setCategory] = useState('')
  const [assignedUsers, setAssignedUsers] = useState([])
  const [formError, setFormError] = useState(null)
  const navigate = useNavigate()
  const {user} = useAuthContext()
  const {addDocument, response} = useFirestore('tasks')
  const [taskVar, setTaskVar] = useState(false)
  const [addTask, setAddTask] = useState(false)
  const [creator, setCreator] = useState('')
  var { documents } = useCollection('users')
  var { document } = useDocument('projects', projectid)

  

  const handleArray = (e) => {
    e.preventDefault()
    console.log(document.createdBy.id)
    console.log(creator)
    // console.log(myArray)
  }

  const [users, setUsers] = useState([])

  useEffect(() => {
    if(document){
      const options = document.assignedUsersList.map(user => {
        return  {value: user, label: user.displayName}
      })
      setUsers(options)
    }
    if(document){
      setCreator(document.createdBy.id)
      
    }
   
  }, [documents])
  
  const newTask = async (e) => {
    e.preventDefault()
    setFormError(null)

    if(assignedUsers.length < 1){
      setFormError("Assign users")
      return
    }

    const createdBy = {
      displayName: user.displayName,
      photoURL: user.photoURL,
      id: user.uid
    }

    const assignedUsersList = 
      assignedUsers.map((usr) => {
        return {
          displayName: usr.value.displayName,
          photoURL: usr.value.photoURL,
          id: usr.value.id
        }
      })

    const snapik = await db.collection("tasks").doc().set({
      name: name,
      details: details,
      assignedUsersList,
      projectId: projectid,
      state: 'in progress'
  })
  .then(() => {
      setTaskVar(false)
      console.log("Document successfully written!");
  })
  .catch((error) => {
      console.error("Error writing document: ", error);
  });
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setFormError(null)
  

    if(assignedUsers.length < 1){
      setFormError("Assign users")
      return
    }

    const createdBy = {
      displayName: user.displayName,
      photoURL: user.photoURL,
      id: user.uid
    }

    const assignedUsersList = 
      assignedUsers.map((usr) => {
        return {
          displayName: usr.value.displayName,
          photoURL: usr.value.photoURL,
          id: usr.value.id
        }
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

  const handleStatus = () => {
    console.log("Hello")
  }
  const check = () => {
    console.log()
  }

  function updateTask(taskId) {
    const taskRef = db.collection('tasks').doc(taskId);
    
    taskRef.update({
      state: 'done',
    });
  }

  return (
    
    <div>
    {creator == user.uid && <button className="border-2 border-slate-600 py-2 px-4 rounded-full text-black bg-gray-100 hover:bg-gray-200 focus:outline-none focus:shadow-outline-gray active:bg-gray-300 transition duration-150 ease-in-out" onClick={(e) => setTaskVar(true)}>New task</button>}
      <div className="project-list">
      {taskVar == false && 
      <div className="project-list">
      
    {tasks.length === 0 && <p>No tasks</p>}
    {tasks.map(task => {
      const isAssigned = task.assignedUsersList.some(usr => usr.id === user.uid);

      return(
      <span key={task.name}>
            <h1>{task.name}</h1>
            <h4>{task.details}</h4>
            
            <div className="assigned-to">
                <ul>
                    {task.assignedUsersList.map(usr => (
                        <li key={usr.id}>
                            <Avatar src={usr.photoURL} />
                        </li>
                    ))}
                </ul>
                
            </div>
            {console.log(task.assignedUsersList)}
            
            {!isAssigned && task.state === 'in progress' && (
              <h1>In progress</h1>
            )}
            {isAssigned && task.state!=='done' && (
              <div>
              <h1>In progress</h1>
            <button className="border-2 border-slate-600 py-2 px-4 rounded-full text-black bg-gray-100 hover:bg-gray-200 focus:outline-none focus:shadow-outline-gray active:bg-gray-300 transition duration-150 ease-in-out" onClick={() => updateTask(task.id)}>Mark as done</button>
            </div>
            )}
            {isAssigned && task.state === 'done' && (
              <h1>Completed</h1>
            )}
            
        </span>
    );
    })}
      </div>
      }
      

      {taskVar == true && 
        <div className=" w-1/2 mx-auto py-8 px-4 rounded-md shadow-md">
  <h2 className="page-title text-2xl font-bold text-gray-800 mb-4">New task</h2>
  <form onSubmit={newTask}>
    <label className="block font-bold text-gray-800 mb-2">
      <span>Task name: </span>
      </label>
      <input required type="text" onChange={(e) => setName(e.target.value)} value={name} className="border rounded-md py-2 px-3 w-full" />
    
    <label className="block font-bold text-gray-800 mb-2">
      <span> Task details: </span>
      <textarea required type="text" onChange={(e) => setDetails(e.target.value)} value={details} className="border rounded-md py-2 px-3 w-full" />
    </label>
    <label className="block font-bold text-gray-800 mb-2">
      <span>Assign to: </span>
      <Select onChange={(option) => setAssignedUsers(option)} options={users} isMulti className="w-full" />
    </label>
    <button className="border-2 border-slate-600 py-2 px-4 rounded-full text-black bg-gray-100 hover:bg-gray-200 focus:outline-none focus:shadow-outline-gray active:bg-gray-300 transition duration-150 ease-in-out">Create task</button>
    {formError && <p className="error mt-2 text-red-600">{formError}</p>}
  </form>
</div>
      }

      
    </div>
    </div>
    
  )
}
