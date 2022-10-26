import BCGovLogo from '../public/BCGovLogo.png'
import Diversity from '../public/diversity.jpg'
import Heart from '../public/heart.png'
import './App.css'

function App() {

  return (
    <div className="App">
      <div className='imgs'>
        <img src={BCGovLogo} alt="BC Government Logo" />
        <img src={Diversity} alt="Diversity" />
        <img src={Heart} alt="Heart" />
      </div>
      <h1>Build with us!</h1>
    </div>
  )
}

export default App
