import {computedFrom} from 'aurelia-framework';
export class Game
{
  private xIsNext: Boolean = true;
  private winner: String | null;
  private history;
  stepNumber: number = 0;

  @computedFrom('xIsNext', 'winner')
  get status(): string {
    return this.winner ? `Winner: ${this.winner}` : `Next player: ${ this.xIsNext ? "X" : "O" }`;
  }
  
  get current(){
    return this.history[this.stepNumber];
  }
  
  constructor(){
    this.history = [
      {
        squares : [
          [null, null, null],
          [null, null, null],
          [null, null, null]
        ]
      }
    ];
  }

  handleClick(rowIndex: number, columnIndex: number){
    this.history.splice(this.stepNumber + 1);
    const current = this.history[this.history.length - 1];

    if (this.winner || current.squares[rowIndex][columnIndex]) {
      return;
    }    
    
    // copy all squares
    const newSquares = [];
    for(var rIndex = 0; rIndex < current.squares.length; rIndex++){
      newSquares[rIndex] = Array(3);
      for(var cIndex = 0; cIndex < current.squares[rIndex].length; cIndex++){
        newSquares[rIndex][cIndex] = current.squares[rIndex][cIndex];
      }
    }

    newSquares[rowIndex].splice(columnIndex, 1, this.xIsNext ? "X" : "O");
    
    this.history.push({squares: newSquares});
    this.xIsNext = !this.xIsNext;
    this.stepNumber = this.stepNumber + 1;
    
    this.calculateWinner(newSquares, (rowIndex == 0 && columnIndex == 0));
  }

  jumpTo(step){
    this.stepNumber = step;
    this.xIsNext = (step % 2) === 0;

    this.calculateWinner(this.current.squares);
  }

  private calculateWinner(squares, log = false){
    const lines = [
      [[0,0], [0,1], [0,2]],
      [[1, 0], [1,1], [1,2]],
      [[2,0], [2,1], [2,2]],
      [[0,0], [1, 0], [2,0]],
      [[0,1], [1,1], [2,1]],
      [[0,2], [1,2], [2,2]],
      [[0,0], [1,1], [2,2]],
      [[0,2], [1,1], [2,0]]
    ];
    
    this.winner = null;

    for (let i = 0; i < lines.length; i++) {
      const [[r1, c1], [r2, c2], [r3,c3]] = lines[i];
      
      if(log){
        console.log(`${squares[r1][c1]}, ${squares[r2][c2]}, ${squares[r3][c3]}`);
      }
      
      if (squares[r1][c1] && squares[r1][c1] === squares[r2][c2] && squares[r1][c1] === squares[r3][c3]) {
        this.winner = squares[r1][c1];
      }
    }
    
    return this.winner;
  }
}
