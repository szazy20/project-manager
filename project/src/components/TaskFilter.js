import React, { useState } from 'react'
import '../styles/ProjectDetails.css'



export default function TaskFilter({currentFilter, changeFilter}) {

    const filterList = ['all', 'mine', 'done', 'in progress']
  

  const handleClick = (newFilter) => {
    changeFilter(newFilter)
  }
  console.log(currentFilter)

  return (
    <div className="project-filter">
      <nav>
        <p>Filter by: </p>
        {filterList.map((f) => (
          <p clasName="mr-2">
          <button key={f}
            onClick={() => handleClick(f)}
            className={currentFilter === f ? 'active' : ''}
          > {f} </button></p>
        ))}
      </nav>
    </div>
  )
}
