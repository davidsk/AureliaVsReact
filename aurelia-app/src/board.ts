
export class Board
{
  private squares: Array<any | null>;
  status: string = "Next player: X";
  
  constructor(){
    this.squares = [
      [null, null, null],
      [null, null, null],
      [null, null, null]
    ];
  }

  handleClick(rowIndex: number, columnIndex: number){
    var row = this.squares.slice(rowIndex, rowIndex + 1);
    row[0].splice(columnIndex, 1, "X");
    this.squares.splice(rowIndex, 1, row[0]);
  }
}
