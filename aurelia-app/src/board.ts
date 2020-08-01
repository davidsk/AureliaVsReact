import { processContent } from 'aurelia-framework';

@processContent((compiler, resources, node, instruction) => {
   instruction.inheritBindingContext = true;
   return false;
 })
export class Board {}
