import { Component, OnInit,Input, ViewChildren, QueryList, ViewChild, ElementRef, HostListener } from '@angular/core';
import { KeyboardService } from '../keyboard.service';
import { NavColDirective } from '../nav-col.directive';
@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  dimension:number = 25;
  height:number = 5;
  squareBox:any;
  columns:number = 5;
  randomNumberArray:any ;
  count : number = 0;
  currentIndexValueInRandomArray!:number;
  initialIndex!:number;
  @ViewChildren(NavColDirective) inputs!:QueryList<NavColDirective>
  @ViewChild('boxRef') centreBox! : ElementRef<HTMLInputElement>;
  constructor(private keyboardService : KeyboardService, private initElement : ElementRef) { }
  
  ngOnInit(): void {
    // to generate square board
    this.randomNumberArray = this.generateRandomNumber(this.dimension);
    this.squareBox = new Array(this.dimension).fill(this.dimension%2).map((_, i) => i);
    this.keyboardService.keyBoard.subscribe(res => { if(this.randomNumberArray.length>0){this.move(res);}} )
    // this.initElement.nativeElement.firstChild.autofocus = true;
    
  }
  ngAfterViewInit() {
    this.initialIndex = Math.floor(this.dimension/2);
    console.log(this.initialIndex, "index");
    this.inputs.toArray().findIndex(x=> {if(x.element.nativeElement.getAttribute('boxindex') == this.initialIndex) x.element.nativeElement.focus()} );
  }
  ngDoCheck() {
    // on Input change updates square board
    this.squareBox = new Array(this.dimension).fill(0).map((_, i) => i);
  //  console.log(document.activeElement,"active");
  //  console.log(document.querySelector("[boxindex = '12']"),"consol");
  //  let focusFirstEl = document.querySelector("[boxindex = '12']");
  //  focusFirstEl?.setAttribute("tabindex", "-1");
  //  focusFirstEl?.dispatchEvent(new Event('click'));
    
  //  @HostListener("click", ['$event']) onclick(e:any) {
    // document.getElementsByClassName("box") = ;
    // if(e.target.getAttribute("dimension")){
    //   e.stopPropagation();
    //     alert("Do you want to stop")
    // }  
  // }
  }
  move(object:any) {
    const inputToArray = this.inputs.toArray();
    let index = inputToArray.findIndex((x) => x.element == object.element);
    switch(object.action) {
      case "UP" : 
        index -= this.columns; 
        this.count++;
        if(this.randomNumberArray.includes(index)){
          let currentIndexValueInRandomArray = this.randomNumberArray.indexOf(index);
          this.randomNumberArray.splice(currentIndexValueInRandomArray,1);
          console.log(this.randomNumberArray);
        }
        break;

      case "DOWN" : 
        index += this.columns;
        this.count++;
        if(this.randomNumberArray.includes(index)){
          this.currentIndexValueInRandomArray = this.randomNumberArray.indexOf(index);
          this.randomNumberArray.splice(this.currentIndexValueInRandomArray,1);
          console.log(this.randomNumberArray);
        }
        break;

      case "LEFT" : 
        index--;
        this.count++;
        if(this.randomNumberArray.includes(index)){
        this.currentIndexValueInRandomArray = this.randomNumberArray.indexOf(index);
          this.randomNumberArray.splice(this.currentIndexValueInRandomArray,1);
          console.log(this.randomNumberArray);
        }
        break;
      
      case "RIGHT" : 
        index++;
        this.count++;
        if(this.randomNumberArray.includes(index)){
        this.currentIndexValueInRandomArray = this.randomNumberArray.indexOf(index);
        this.randomNumberArray.splice(this.currentIndexValueInRandomArray,1);
        console.log(this.randomNumberArray);
        }
        break;
      
      // case "RIGHT" : 
      //   index++;
      //   break;
    }
    if(index>=0 && index<this.inputs.length) {
      inputToArray[index].element.nativeElement.focus();
      
    }
  }

  generateRandomNumber(count:number) {
    let countNum = Math.sqrt(count);
    console.log(count, countNum)
    const nums = new Set();
    while(nums.size !== countNum) {
      nums.add(Math.floor(Math.random() * (count-1)) + 1);
    }
    return [...nums];
    console.log([...nums]);
  } 
 

}
