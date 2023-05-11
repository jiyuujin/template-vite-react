import React from 'react'
import { Main } from './components/Main'
import { useFirebase } from './hooks/useFirebase'
import { JoinFirebase } from './components/JoinFirebase'

const FireApp = () => {
  useFirebase()

  return (
    <JoinFirebase>
      <Main />
    </JoinFirebase>
  )
}

const App = () => {
  return <FireApp />
}

export default App
