import './App.css';
import React from 'react'
import Nav from './Components/Nav'
import About from './Components/About'
import Footer from "./Components/Footer"
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import { useState, useRef } from 'react'
import Data from './full_detections.json'
import ReactPlayer from 'react-player'

// 7781 detections

function App() {

  // For initalizing the base frame and letting the functions reset the value
  const [frame, setFrame] = useState(1)

  const playerRef = useRef(null)

  // Gets the data at the given frame and filters it to only display number of 'person:'s identified
  const temp = Data[frame]
  let numPeople = 0
  for (let i = 0; i < temp.length; i++) {
    if (temp[i]['person:']) {
      numPeople += 1
    }
  }

  // Function for going to the next frame
  function nextFrame(){
    // Protecting upper bounds
    if (frame === 7781){
        console.log('End of Frames')
        return
    }
    setFrame(frame + 1)
    console.log('Next Frame')
    playerRef.current.seekTo(frame / 60)
    console.log(frame)
    console.log(frame / 60)
  }

  // Function for going to the previous frame
  function prevFrame(){
    // Protecting lower bounds
    if (frame === 1){
        console.log('No Previous Frame')
        return
    }
    setFrame(frame - 1)
    console.log('Previous Frame')
    playerRef.current.seekTo(frame / 60)
    console.log(frame)
    console.log(frame / 60)
  }

  // Function for jumping to the entered frame
  function jumpFrame(){
    const newFrame = document.getElementById('newFrame').value
    if (isNaN(newFrame) || !newFrame || parseInt(newFrame) > 7781 || parseInt(newFrame) < 1){
        console.log('Out of Bounds')
    }
    else{
        setFrame(parseInt(newFrame))
        playerRef.current.seekTo(parseInt(newFrame) / 60)
    }
  }

  const [playing, setPlaying] = useState(false)
  const [intervalID, setIntervalID] = useState(0)
  var testing = 1

  function play(){
    setPlaying(true)
    document.getElementById("play_button").disabled = true
    document.getElementById("prev_button").disabled = true
    document.getElementById("next_button").disabled = true
    testing = frame
    setIntervalID(setInterval(updateDisplay,16.6))
  }

  function updateDisplay(){
    if(playing === true){
      testing++
      setFrame(testing)
      console.log('Updating')
    }
  }

  function pause(){ 
    setPlaying(false)
    document.getElementById("play_button").disabled = false
    document.getElementById("prev_button").disabled = false
    document.getElementById("next_button").disabled = false
    setIntervalID(clearInterval(intervalID))
  }


  return (
    <Router>
        <Nav/>
        <Switch>
          <Route path='/' exact render={(props) => (
            <>
              <div className='container'>
                <div className='videoComponent'>
                  <ReactPlayer 
                  ref={playerRef} 
                  url='https://youtu.be/yBum_lh7m2Y' 
                  width='70vw' 
                  height='70vh' 
                  playing={playing}
                  onPlay={play} 
                  onPause={pause}
                  config={{
                    youtube: {
                      playerVars: {
                        start: 1
                      }
                    }
                  }}/>
                </div>
                
                <div className='resultBox'>
                  <div className='resultTitle'>
                    <h4>Data at frame: {frame}</h4>
                    <div>
                        <input type="text" min='1' max='7781' placeholder='Enter Frame: 1-7781' id='newFrame'/>
                        <button onClick={jumpFrame}>Go</button>
                    </div>
                  </div>

                  <div className='dataPointBox'>
                    <div className='dataPointNames'>
                      <ul>
                        <li>Detected People:</li>
                      </ul> 
                    </div>
                    <div className='dataPointValues'>
                      <ul>
                        <li>
                          {numPeople}
                        </li>
                      </ul>
                    </div>
                  </div>

                  <controls className="controls"> {/* Added this if broken remove */}
                    <button className="control_button" id="play_button" onClick={play}>Play</button>
                    <button className="control_button" id="pause_button" onClick={pause}>Pause</button>
                    <button className="control_button" id="prev_button" onClick={prevFrame}>Prev</button>
                    <button className="control_button" id="next_button" onClick={nextFrame}>Next</button>
                  </controls>
                </div>
              </div>
            </>
          )} />
          <Route path='/about' component={About}/>
        </Switch>
        <Footer></Footer>
    </Router>
  );
}

export default App;