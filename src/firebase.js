import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore, collection } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyAMdA6XYM4lKfeR9AxFPWXGtfftACoFJpc',
  authDomain: 'netflix-clone-ef268.firebaseapp.com',
  databaseURL: 'https://netflix-clone-ef268.firebaseio.com',
  projectId: 'netflix-clone-ef268',
  storageBucket: 'netflix-clone-ef268.appspot.com',
  messagingSenderId: '320686722570',
  appId: '1:320686722570:web:750fff09b261ed8bae59f3',
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

// collection ref
const collectionRef = collection(db, 'channels')

const auth = getAuth()
const provider = new GoogleAuthProvider()

export { auth, provider, collectionRef }
export default db
