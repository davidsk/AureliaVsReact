import {computedFrom} from 'aurelia-framework';
export class Board
{
  private squares: Array<any | null>;
  private xIsNext: Boolean = true;
    
  @computedFrom('xIsNext')
  get status(): string {
    return `Next player: ${ this.xIsNext ? "X" : "O" }`;
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
    row[0].splice(columnIndex, 1, this.xIsNext ? "X" : "O");
    this.squares.splice(rowIndex, 1, row[0]);
    this.xIsNext = !this.xIsNext;
  }
}
