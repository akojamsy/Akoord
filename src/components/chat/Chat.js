import {
  AddCircle,
  CardGiftcard,
  EmojiEmotions,
  Gif,
} from '@mui/icons-material'
import React, { useState } from 'react'
import './chat.css'
import ChatHeader from './ChatHeader'
import { useSelector } from 'react-redux'
import { selectChannelId, selectChannelName } from '../../features/appSlice'
import { selectUser } from './../../features/userSlice'
import db from './../../firebase'
import { useEffect } from 'react'
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  addDoc,
  Timestamp,
} from 'firebase/firestore'
import Message from './Message'

function Chat() {
  const user = useSelector(selectUser)
  const channelId = useSelector(selectChannelId)
  const channelName = useSelector(selectChannelName)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([])

  useEffect(() => {
    if (channelId) {
      const docRef = collection(db, 'channels', channelId, 'messages')
      const queryData = query(docRef, orderBy('timestamp', 'desc'))
      onSnapshot(queryData, (snapshot) => {
        setMessages(snapshot.docs.map((doc) => doc.data()))
      })
    }
  }, [channelId])

  const sendMessage = async (e) => {
    e.preventDefault()

    const docRef = collection(db, 'channels', channelId, 'messages')

    if (input !== '') {
      await addDoc(docRef, {
        timestamp: Timestamp.fromDate(new Date()),
        message: input,
        user: user,
      })
    }
    setInput('')
  }

  return (
    <div className="chat">
      <ChatHeader channelName={channelName} />

      <div className="chat__messages">
        {messages.map((message, index) => (
          <Message key={index} message={message} />
        ))}
      </div>
      <div className="chat__input">
        <AddCircle fontSize="large" />

        <form>
          <input
            disabled={!channelId}
            type="text"
            value={input}
            placeholder={'Message #TESTCHANNEL'}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            className="chat__inputButton"
            type="submit"
            onClick={sendMessage}
          >
            Send Message
          </button>
        </form>
        <div className="chat__inputIcons">
          <CardGiftcard fontSize="large" />
          <Gif fontSize="large" />
          <EmojiEmotions fontSize="large" />
        </div>
      </div>
    </div>
  )
}

export default Chat
