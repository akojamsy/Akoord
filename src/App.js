import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './App.css'
import Chat from './components/chat/Chat'
import Sidebar from './components/sidebar/Sidebar'
import { login, logout, selectUser } from './features/userSlice'
import { auth } from './firebase'
import Login from './Login'

function App() {
  const user = useSelector(selectUser)
  const dispatch = useDispatch()
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(
          login({
            uid: authUser.uid,
            photo: authUser.photoURL,
            email: authUser.email,
            displayName: authUser.displayName,
          }),
        )
      } else {
        //the user is not logged in/ is logged out
        dispatch(logout())
      }
    })
  }, [dispatch])

  return (
    <div className="app">
      {user ? (
        <>
          <Sidebar />
          <Chat />
        </>
      ) : (
        <Login />
      )}
    </div>
  )
}

export default App
