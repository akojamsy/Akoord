import { Avatar } from '@mui/material'
import React from 'react'
import './message.css'

function Message({ message }) {
  return (
    <div className="message">
      <Avatar />
      <div className="message__info">
        <h4>
          {message.user.displayName}
          <span className="message__timestamp">
            {new Date(message.timestamp?.toDate()).toString()}
          </span>
        </h4>
        <p>{message.message}</p>
      </div>
    </div>
  )
}

export default Message
