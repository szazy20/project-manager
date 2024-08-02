import React from 'react'
import '../styles/ProjectList.css'
import Avatar from './Avatar'
import { Link } from 'react-router-dom'


export default function ProjectList({projects}) {
  return (
    <div className="project-list">
    
    {projects.length === 0 && <p>No projects</p>}
    {projects.map(project => (
        <Link to={`/projects/${project.id}`} key={project.id} data-testid="project-link">
            <h1>{project.name}</h1>
            <p>Due by {project.dueDate.toDate().toDateString()}</p>
            <div className="assigned-to">
                <ul>
                    {project.assignedUsersList.map(user => (
                        <li key={user.id}>
                            <Avatar src={user.photoURL} />
                        </li>
                    ))}
                </ul>
            </div>
        </Link>
    ))}
    
    </div>
  )
}
