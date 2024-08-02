import '../styles/SettingsAvatar.css'


import React from 'react'

export default function SettingsAvatar({src}) {
  return (
    <span className="settingavatar">
    
        <img src={src} alt="settingavatar"></img>
    
    </span>
  )
}