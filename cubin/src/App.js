import logo from './logo.svg';
import './App.css';

const Side = class {
  constructor(index) {
    this.rows = [[index,index,index],[index,index,index],[index,index,index]];
  }

  value(x, y) {
    return this.rows[x][y];

  }

  // foo() {
  //   return 'bar';
  // },

};

function App() {
  const cubeState = [new Side(0),new Side(1),new Side(2),new Side(3),new Side(4),new Side(5)]

  return (
    <div className="App">
      <header className="Cube">
        <div>
          <ShowSide side={cubeState[0]}/>
        </div>
        <div className='Main-Cube-row'>
        <ShowSide side={cubeState[1]}/>
        <ShowSide side={cubeState[2]}/>
        <ShowSide side={cubeState[3]}/>
        <ShowSide side={cubeState[4]}/>


        </div>
        <div>
        <ShowSide side={cubeState[5]}/>


        </div>
      </header>
    </div>
  );
}

function ShowSide({side}) {
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
