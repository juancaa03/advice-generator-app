import { useState, useEffect } from 'react'
import DesktopIconDivider from '../images/pattern-divider-desktop.svg'
import MobileIconDivider from '../images/pattern-divider-mobile.svg'
import ButtonIcon from '../images/icon-dice.svg'
import './App.css'

function App() {
  const [advice, setAdvice] = useState('')
  const [adviceNumber, setAdviceNumber] = useState(0)
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  
  const getRandomAdvice = () => {
    fetch('https://api.adviceslip.com/advice')
      .then((res) => res.json())
      .then((data) => {
        setAdvice(data.slip.advice)
      })
    setAdviceNumber(adviceNumber + 1)
  }

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }
    window.addEventListener('resize', handleResize)
    getRandomAdvice()
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <>
      <div className='body-div'>
        <div className='main-div'>
          <h1>Advice #{adviceNumber}</h1>
          {advice && <p>&quot;{advice}&quot;</p>}
          {windowWidth >= 768 ? (
            <img className='divider' src={DesktopIconDivider} alt='Icon Divider' />
          ) : (
            <img className='divider' src={MobileIconDivider} alt='Icon Divider' />
          )}
          <br />
          <button className='round-button' onClick={getRandomAdvice}><img className='button-icon' src={ButtonIcon} alt="Get Advice" /></button>
        </div>
      </div>
    </>
  )
}

export default App
