import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDocument } from '../hooks/useDocument'
import ProjectSummary from '../components/ProjectSummary'
import ProjectComments from '../components/ProjectComments'
import ProjectTasks from '../components/ProjectTasks'
import { db } from '../firebase/firebase'
import { useCollection } from '../hooks/useCollection'

import '../styles/ProjectDetails.css'

import TaskFilter from '../components/TaskFilter'
import { useAuthContext } from '../hooks/useAuthContext'
import ProjectMembers from '../components/ProjectMembers'





export default function ProjectDetails() {

  const { id } = useParams()
  const { error, document } = useDocument('projects', id)
  const { documents } = useCollection('tasks', ["projectId", "==", id])
  const [choice, setChoice] = useState('project-overview')
  const [currentFilter, setCurrentFilter] = useState('all')
  const {user} = useAuthContext()

  var docRef = db.collection("projects").doc(id);

  docRef.get().then((doc) => {
    if (doc.exists) {
        console.log("Document data:", doc.data());
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
  }).catch((error) => {
      console.log("Error getting document:", error);
  });

  const props = {
    doc: document,
    pid: id
  }

  if(error){
    console.log("siema")
    return <div className="error">{error}</div>
  }

  if(!document){
    return <div className="loading">Loading...</div>
  }

  const showQuery = async (e) => {
    console.log(document)
    console.log(documents)
    console.log(id)
    // console.log(myArray)
    // console.log(t)
  }

  

  const changeFilter = (newFilter) => {
    setCurrentFilter(newFilter)
  }

  const filteredTasks = documents ? documents.filter((document) => {
    switch(currentFilter){
      case 'all':
        return true
      case 'mine':
        return document.assignedUsersList.some(usr => usr.id === user.uid);
      case 'done':
        return document.state === currentFilter
      case 'in progress':
        return document.state === currentFilter
      default:
        return true
    }
  }) : null

  return (
    
    <div>
    
      
     
  <div className="flex justify-between items-center">
  <button className="border-2 border-slate-600 py-2 px-4 rounded-full text-white bg-red-800 hover:bg-red-900 focus:outline-none focus:shadow-outline-red active:bg-red-900 transition duration-150 ease-in-out mr-4" onClick={(e) => setChoice('project-overview')}>
    Project overview
  </button>
  <button className="border-2 border-slate-600 py-2 px-4 rounded-full text-white bg-red-800 hover:bg-red-900 focus:outline-none focus:shadow-outline-red active:bg-red-900 transition duration-150 ease-in-out" onClick={(e) => setChoice('members')}>
    Members
  </button>
  <button className="border-2 border-slate-600 py-2 px-4 rounded-full text-white bg-red-800 hover:bg-red-900 focus:outline-none focus:shadow-outline-red active:bg-red-900 transition duration-150 ease-in-out" onClick={(e) => setChoice('discussion')}>
    Discussion
  </button>
  <button className="border-2 border-slate-600 py-2 px-4 rounded-full text-white bg-red-800 hover:bg-red-900 focus:outline-none focus:shadow-outline-red active:bg-red-900 transition duration-150 ease-in-out" onClick={(e) => setChoice('tasks')}>
    Tasks
  </button>

</div>
      {choice == 'project-overview' && 
      <div>
      <ProjectSummary project={props.doc} projectid={props.pid} />
      
      </div>
      }
      {choice == 'members' && 
      <div>
      
      <ProjectMembers project={props.doc} projectid={props.pid} />
      </div>
      }
      {choice == 'discussion' && 
      <div>
      
      <ProjectComments project={document} />
      </div>
      }
      {choice == 'tasks' && <div>
      
      <TaskFilter currentFilter={currentFilter} changeFilter={changeFilter} />
      <ProjectTasks project={document} tasks={filteredTasks} projectid={props.pid}/>
      </div>
      }
      
      
    </div>
  )
}


