import React from 'react'
import './sidebarChannel.css'
import { useDispatch } from 'react-redux'
import { setChannnelInfo } from '../../features/appSlice'

function SidebarChannel({ id, channelName }) {
  const dispatch = useDispatch()

  return (
    <div
      className="sidebarChannel"
      onClick={() =>
        dispatch(
          setChannnelInfo({
            channelId: id,
            channelName: channelName,
          }),
        )
      }
    >
      <h4>
        <span className="sidebarChannel__hash">#</span>
        {channelName.channelName}
      </h4>
    </div>
  )
}
export default SidebarChannel
