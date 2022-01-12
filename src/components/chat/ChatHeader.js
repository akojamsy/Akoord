import {
  EditLocationAltOutlined,
  HelpRounded,
  Notifications,
  PeopleAltRounded,
  SearchRounded,
  SendRounded,
} from '@mui/icons-material'
import React from 'react'
import './chatHeader.css'

function ChatHeader({ channelName }) {
  return (
    <div className="chatHeader">
      <div className="chatHeader__left">
        <h3>
          {channelName !== null ? (
            <>
              <span>#</span> <h3>{channelName.channelName}</h3>
            </>
          ) : (
            ''
          )}
        </h3>
      </div>
      <div className="chatHeader__right">
        <Notifications />
        <EditLocationAltOutlined />
        <PeopleAltRounded />
        <div className="chatHeader__search">
          <input type="text" placeholder="Search" />
          <SearchRounded />
        </div>
        <SendRounded />
        <HelpRounded />
      </div>
    </div>
  )
}

export default ChatHeader
