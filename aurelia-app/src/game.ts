import {computedFrom} from 'aurelia-framework';
export class Game
{
  private xIsNext: Boolean = true;
  private winner: String | null;
  private history;

  @computedFrom('xIsNext', 'winner')
  get status(): string {
    return this.winner ? `Winner: ${this.winner}` : `Next player: ${ this.xIsNext ? "X" : "O" }`;
  }
  
  get current(){
    return this.history[this.history.length - 1];
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
    const current = this.history[this.history.length - 1];
    const squares = current.squares.slice();

    var row = squares.slice(rowIndex, rowIndex + 1);

    if (this.winner || row[0][columnIndex]) {
      return;
    }    
    
    row[0].splice(columnIndex, 1, this.xIsNext ? "X" : "O");
    squares.splice(rowIndex, 1, row[0]);
    
    this.history.push({squares: squares});
    
    this.xIsNext = !this.xIsNext;

    this.calculateWinner(squares);
  }

  private calculateWinner(squares){
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
    
    for (let i = 0; i < lines.length; i++) {
      const [[r1, c1], [r2, c2], [r3,c3]] = lines[i];
      
      if (squares[r1][c1] && squares[r1][c1] === squares[r2][c2] && squares[r1][c1] === squares[r3][c3]) {
        this.winner = squares[r1][c1];
      }
    }
    
    return this.winner;
  }
}
