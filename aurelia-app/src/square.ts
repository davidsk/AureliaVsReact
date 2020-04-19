export class Square
{
  constructor(private value: string | null){
    value = null;
  }
  
  setValue(value){
    this.value = value;
  }
}
