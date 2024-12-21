// import logo from './logo.svg';
import './App.css';
import {Cube} from './Cube'

import { useState, useEffect } from 'react';


function App() {
  const [cube, setCube] = useState(null);
  const [count, setCount] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [running, setRunning] = useState(false);
  

  function toggleRunning() {
    console.log("toggle running");
    setRunning((oldVal) => !oldVal)
  }

  useEffect(() => {
    setCube(new Cube());
  }, []);

  useEffect(() => {
    console.log("init interval")
    if (!running){
      return;
    }
 
    const intervalId = setInterval(() => {

      // console.log("running");
      if (!running) {
        clearInterval(intervalId)
      }
      try { 
        cube.randomMove();
        // console.log("correct count...");
        let correct = cube.correctCount();
        // console.log("correct count", correct);

        setCorrectCount(correct);
        if (correct === 54) {
          setRunning(false);
          clearInterval(intervalId);
        }
      } catch (e) {
        console.log(e);
      }
      
      setCount((old) => {
        return old +1;
  
      });
 
    
    }, 5);
    return () => clearInterval(intervalId)
  }, [cube, running]);
  
  // console.log(cubeState);
  if (cube === null) {
    return;
  }
  return (
    <div className="App">
      <header className="Cube">
        <div>
          <ShowSide side={cube.sides[5]} />
        </div>
        <div className='Main-Cube-row'>
        <ShowSide side={cube.sides[1]}/>
        <div style={{marginLeft: "10px"}}>
          <ShowSide side={cube.sides[2]} />
        </div>
        <div style={{marginLeft: "10px"}}>
          <ShowSide side={cube.sides[3]}/>
        </div>
        <div style={{marginLeft: "10px"}}>
          <ShowSide side={cube.sides[4]}/>
        </div>

        </div>
        <div>
        <ShowSide side={cube.sides[0]} debug={true}/>


        </div>

        <div>
          {count} moves
        </div>
        <div>
          {correctCount} correct
        </div>
        <div>
          <div onClick={() => toggleRunning()}>
            {running ? "Stop" : "Start"}
          </div>
        </div>
      </header>
    </div>
  );
}

function ShowSide({side, debug}) {
  // if (debug ) {
  //   console.log(side.rows)
  // }
  return (<div>
    <div className='Side-row'>
      <div className={`Cube-block Cube-block-${side.value(0,0)}`}></div>
      <div className={`Cube-block Cube-block-${side.value(0,1)}`}></div>
      <div className={`Cube-block Cube-block-${side.value(0,2)}`}></div>
    </div>
    <div className='Side-row'>
      <div className={`Cube-block Cube-block-${side.value(1,0)}`}></div>
      <div className={`Cube-block Cube-block-${side.value(1,1)}`}></div>
      <div className={`Cube-block Cube-block-${side.value(1,2)}`}></div>
    </div>
    <div className='Side-row'>
      <div className={`Cube-block Cube-block-${side.value(2,0)}`}></div>
      <div className={`Cube-block Cube-block-${side.value(2,1)}`}></div>
      <div className={`Cube-block Cube-block-${side.value(2,2)}`}></div>
    </div>
  </div>);


}

export default App;
