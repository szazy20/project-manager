import React, { useState } from 'react'



export default function ProjectFilter({currentFilter, changeFilter}) {

    const filterList = ['all', 'development', 'design', 'planning', 'administration', 'marketing' ]
  

  const handleClick = (newFilter) => {
    changeFilter(newFilter)
  }
  

  return (
    <div className="project-filter">
      <nav>
        <p>Filter by: </p>
        {filterList.map((f) => (
          <p className="mr-2">
          <button key={f}
            onClick={() => handleClick(f)}
            className={currentFilter === f ? 'active' : ''}
          > {f} </button></p>
        ))}
      </nav>
    </div>
  )
}
