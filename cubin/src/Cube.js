
function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  
export const Cube = class {
    constructor() {
        const white = new Side(0);
        const red = new Side(1);
        const green = new Side(2);
        const orange = new Side(3);
        const blue = new Side(4);
        const yellow = new Side(5);

        white.addNeighbors(red, orange, green, blue);
        red.addNeighbors(blue, green, yellow, white);
        green.addNeighbors(red, orange, yellow, white);
        orange.addNeighbors(green, blue, yellow, white);
        blue.addNeighbors(orange, red, yellow, white);
        yellow.addNeighbors(red, orange, blue, green);

        this.sides = [white, red, green, orange, blue, yellow];

        this.moveCount = 0;
        this.highCount = 0;
    }
    randomMove() {
        // this.sides[0].movePrime();

        if(randomIntFromInterval(0,1) === 0) {
            this.sides[randomIntFromInterval(0,5)].move();
        } else {
            this.sides[randomIntFromInterval(0,5)].movePrime();
        }
        this.moveCount++;

    }
    scramble() {
        for (let i =0; i<10; i++){
            this.randomMove();
        }
    }
    correctCount() {
        let total = 0 
        for (let i = 0; i < 6; i++) {
            total += this.sides[i].correctCount()
        }
        if (total > this.highCount) {
            this.highCount = total;
        }
        return total;
    }
}
const Side = class {
    constructor(index) {
        this.rows = [
        [index,index,index],
        [index,index,index],
        [index,index,index]
        ];

    }

    addNeighbors(left, right, up, down) {
        this.left = left;
        this.right = right;
        this.up = up;
        this.down = down;
    }

    value(x, y) {
        return this.rows[x][y];
    }

    correctCount() {
        let total = 0;
        for(let i = 0; i < 3; i++){
            for(let j = 0;j< 3; j++){
                
                if (this.rows[i][j] === this.rows[1][1]) {
                    total++;
                }

            }
        }
        return total;

    }

    adjacentTo(side) {
        switch(side) {
        case this.left:
            return [this.rows[0][0],this.rows[1][0],this.rows[2][0]]
        case this.right:
            return [this.rows[0][2],this.rows[1][2],this.rows[2][2]]
        case this.up:
            return [this.rows[0][0],this.rows[0][1],this.rows[0][2]]
        case this.down:
            return [this.rows[2][0],this.rows[2][1],this.rows[2][2]]
        default:
            console.log("Unexpected call to adjacentTo")
        }
    }

    updateTo(side, newValues) {
        if (side === this.left){
            this.rows[0][0] = newValues[0];
            this.rows[1][0] = newValues[1];
            this.rows[2][0] = newValues[2];
        } else if (side === this.right) {
            this.rows[0][2] = newValues[0];
            this.rows[1][2] = newValues[1];
            this.rows[2][2] = newValues[2];
                
        } else if (side === this.up) {

            this.rows[0][0] = newValues[0];
            this.rows[0][1] = newValues[1];
            this.rows[0][2] = newValues[2];

        } else if (side === this.down) {
            this.rows[2][0] = newValues[0];
            this.rows[2][1] = newValues[1];
            this.rows[2][2] = newValues[2];
        } else {
        console.error("unknown side")
        }

    }

    move() {
        // console.log("updating to");
        const currentValues = [
            this.left.adjacentTo(this),
            this.right.adjacentTo(this),
            this.up.adjacentTo(this),
            this.down.adjacentTo(this),
        ]
        this.left.updateTo(this, currentValues[3]);
        this.right.updateTo(this, currentValues[2]);
        this.up.updateTo(this, currentValues[0]);
        this.down.updateTo(this, currentValues[1]);

        const tempRows = [this.rows[0].slice(), this.rows[1].slice(), this.rows[2].slice()];

        this.rows[0][0] = tempRows[2][0];
        this.rows[0][1] = tempRows[1][0];
        this.rows[0][2] = tempRows[0][0];
        this.rows[1][0] = tempRows[2][1];
        // this.rows[1][1] = tempRows[][];
        this.rows[1][2] = tempRows[0][1];
        this.rows[2][0] = tempRows[2][2];
        this.rows[2][1] = tempRows[1][2];
        this.rows[2][2] = tempRows[0][2];
    }

    movePrime() {
        const currentValues = [
            this.left.adjacentTo(this),
            this.right.adjacentTo(this),
            this.up.adjacentTo(this),
            this.down.adjacentTo(this),
        ]
        this.left.updateTo(this, currentValues[2]);
        this.right.updateTo(this, currentValues[3]);
        this.up.updateTo(this, currentValues[1]);
        this.down.updateTo(this, currentValues[0]);

        const tempRows = [this.rows[0].slice(), this.rows[1].slice(), this.rows[2].slice()];

        this.rows[0][0] = tempRows[0][2];
        this.rows[0][1] = tempRows[1][2];
        this.rows[0][2] = tempRows[2][2];
        this.rows[1][0] = tempRows[0][1];
        // this.rows[1][1] = tempRows[][];
        this.rows[1][2] = tempRows[2][1];
        this.rows[2][0] = tempRows[0][0];
        this.rows[2][1] = tempRows[1][0];
        this.rows[2][2] = tempRows[2][0];
    }


};