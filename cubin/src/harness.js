
import { Cube} from './Cube.js'

let cube = new Cube()
cube.scramble();
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
        console.log(`${cube.moveCount} moves, ${correct} correct (${cube.highCount} high)`)
    }
}
// 2714000000
console.log(`Solved in ${cube.moveCount} moves`)
