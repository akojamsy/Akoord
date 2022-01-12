import React, { useEffect, useState } from 'react'
import './sidebar.css'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import AddIcon from '@mui/icons-material/Add'
import SidebarChannel from './SidebarChannel'
import {
  Call,
  Headset,
  InfoOutlined,
  Mic,
  Settings,
  SignalCellularAlt,
} from '@mui/icons-material'
import { Avatar } from '@mui/material'
import { useSelector } from 'react-redux'
import { selectUser } from './../../features/userSlice'
import { auth, collectionRef } from '../../firebase'
import { addDoc, onSnapshot } from 'firebase/firestore'

function Sidebar() {
  const user = useSelector(selectUser)
  const [channels, setChannels] = useState([])

  useEffect(() => {
    //get collection Data

    onSnapshot(collectionRef, (snapshot) => {
      setChannels(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          channel: doc.data(),
        })),
      )
    })
    //get collection Data
    // getDocs(collectionRef).then((snapshot) => {
    //   setChannels(
    //     snapshot.docs.map((doc) => ({
    //       id: doc.id,
    //       channel: doc.data(),
    //     })),
    //   )
    // })
  }, [])

  const handleAddChannels = async () => {
    const channelName = prompt('Enter a new channel name')

    if (channelName) {
      await addDoc(collectionRef, { channelName }).catch((error) => {
        console.log(error)
      })
    }
  }

  return (
    <div className="sidebar">
      <div className="sidebar__top">
        <h3>Akoord</h3>
        <ExpandMoreIcon />
      </div>
      <div className="sidebar__channels">
        <div className="sidebar__channelsHeader">
          <div className="sidebar__header">
            <ExpandMoreIcon />
            <h4> Text Channels</h4>
          </div>
          <AddIcon
            className="sidebar__addChannel"
            onClick={handleAddChannels}
          />
        </div>
        <div className="sidebar__channelLists">
          {channels.map(({ id, channel }) => (
            <SidebarChannel key={id} channelName={channel} id={id} />
          ))}
        </div>
      </div>

      <div className="sidebar__voice">
        <SignalCellularAlt className="sidebar__voiceIcon" fontSize="large" />
        <div className="sidebar__voiceInfo">
          <h3>Voice Connected</h3>
          <p>Stream</p>
        </div>
        <div className="sidebar__voiceIcons">
          <InfoOutlined />
          <Call />
        </div>
      </div>
      <div className="sidebar__profile">
        <Avatar src={user.photo} />
        <div className="sidebar__profileInfo">
          <h3>{user.displayName}</h3>
          <p>#{user.uid.substring(0, 5)}</p>
          <span className="logout" onClick={() => auth.signOut()}>
            Logout
          </span>
        </div>
        <div className="sidebar__profileIcons">
          <Mic />
          <Headset />
          <Settings />
        </div>
      </div>
    </div>
  )
}

export default Sidebar
