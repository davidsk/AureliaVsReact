import {computedFrom} from 'aurelia-framework';
export class Board
{
  private squares: Array<any | null>;
  private xIsNext: Boolean = true;
  private winner: String | null;
    
  @computedFrom('xIsNext', 'winner')
  get status(): string {
    return this.winner ? `Winner: ${this.winner}` : `Next player: ${ this.xIsNext ? "X" : "O" }`;
  }
  
  constructor(){
    this.squares = [
      [null, null, null],
      [null, null, null],
      [null, null, null]
    ];
  }

  handleClick(rowIndex: number, columnIndex: number){
    var row = this.squares.slice(rowIndex, rowIndex + 1);

    if (this.winner || row[0][columnIndex]) {
      return;
    }    
    
    row[0].splice(columnIndex, 1, this.xIsNext ? "X" : "O");
    this.squares.splice(rowIndex, 1, row[0]);
    this.xIsNext = !this.xIsNext;

    this.calculateWinner(this.squares);
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
