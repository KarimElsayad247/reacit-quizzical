import { useState } from 'react'

import StartScreen from './components/StartScreen'
import GameScreen from './components/GameScreen'

function App() {

    const [start, setStart] = useState(false)

    function startGame() {
        setStart(true)
    }

  return (
    start ? <GameScreen /> : <StartScreen startGame={startGame} />
  )
}

export default App
