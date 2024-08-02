import '../styles/Avatar.css'


import React from 'react'

export default function Avatar({src}) {
  return (
    <div className="avatar" data-testid="avatar">
    
        <img src={src} alt="avatar"></img>
    
    </div>
  )
}
