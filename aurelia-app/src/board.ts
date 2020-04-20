import { processContent } from 'aurelia-framework';

@processContent((compiler, resources, node, instruction) => {
   instruction.inheritBindingContext = true;
   return true;
 })
export class Board {}
