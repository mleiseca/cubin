
import { Cube} from './Cube.js'

let cube = new Cube()
let solved = false;
 

console.log(cube.correctCount());


let high = 0; 
while(!solved) {
    cube.randomMove();
    // console.log("correct count...");
    let correct = cube.correctCount();
    if (correct === 54) {
        solved = true
    }
    if (correct > high) {
        high = correct
    }
    if (cube.moveCount % 1000000 === 0) {
        console.log(`${cube.moveCount} moves, ${correct} correct (${high} high)`)
    }
}

console.log(`Solved in ${cube.moveCount} moves`)
