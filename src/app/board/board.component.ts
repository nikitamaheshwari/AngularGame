import { Component, OnInit,Input, ViewChildren, QueryList, ViewChild, ElementRef, HostListener } from '@angular/core';
import { KeyboardService } from '../keyboard.service';
import { NavColDirective } from '../nav-col.directive';
@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  dimension!:number ;
  midDiv:number = 0;
  squareBox:any[] = [];
  columns!:number;
  maxwidth!:String ;
  randomNumberArray:any ;
  count : number = 0;
  currentIndexValueInRandomArray!:number;
  initialIndex!:number;
  @ViewChildren(NavColDirective) inputs!:QueryList<NavColDirective>
  @ViewChild('boxRef') centreBox! : ElementRef<HTMLInputElement>;

  constructor(private keyboardService : KeyboardService, private initElement : ElementRef) { 
	
	// this.squareBox = new Array(this.columns).fill(0).map(() => new Array(this.columns).fill(0));
	// console.log(this.squareBox,"sq");
	// this.squareBox = new Array(this.dimension).fill(this.dimension%2).map((_, i) => i);
	
	// this.keyboardService.keyBoard.subscribe(res => { if(this.randomNumberArray.length>0){this.move(res);} else { alert(this.count)}} )

  }
  
  ngOnInit(): void {
	// this.columns = this.dimension;
	// console.log(this.columns,"column")
	// this.midDiv = Math.floor(this.dimension/2);
	// this.maxwidth = this.columns*70+'px'; 
	// to generate square board
	// this.randomNumberArray = this.generateRandomNumber(this.dimension);
	// this.squareBox = new Array(this.columns).fill(0).map(() => new Array(this.columns).fill(0));
	// this.keyboardService.keyBoard.subscribe(res => { if(this.randomNumberArray.length>0){this.move(res);} else { alert(this.count)}} )

	// this.squareBox = new Array(this.dimension).fill(this.dimension%2).map((_, i) => i);
	// this.keyboardService.keyBoard.subscribe(res => { if(this.randomNumberArray.length>0){this.move(res);} else { alert(this.count)}} )
	// this.initialIndex = Math.floor(this.dimension/2);

	// this.inputs.toArray().findIndex(x=> {if(x.element.nativeElement.getAttribute('boxindex') == this.initialIndex) x.element.nativeElement.focus()} );

	// this.initElement.nativeElement.firstChild.autofocus = true;
	// this.initialIndex = Math.floor(this.dimension/2);
	
	// this.inputs.toArray().findIndex(x=> {if(x.element.nativeElement.getAttribute('boxindex') == this.initialIndex) x.element.nativeElement.focus()} );
	
  }
  ngOnchanges(){
	//   this.loadSquare(this.dimension);
  }
  loadSquare(dimension:any){
	  console.log("in load",this.squareBox);
		this.columns = dimension;
		this.midDiv = Math.floor(this.dimension/2);
		this.squareBox = new Array(this.columns).fill(0).map(() => new Array(this.columns).fill(0));
		this.keyboardService.keyBoard.subscribe(res => { if(this.randomNumberArray.length>0){this.move(res);} else { alert(this.count)}} )
		this.maxwidth = this.columns*70+'px'; 
		// this.randomNumberArray = this.generateRandomNumber(dimension);
		this.randomNumberArray  = 4;
		console.log("in ddf load",this.squareBox);

	// this.maxwidth = this.columns*70+'px'; 

	// this.inputs.toArray().findIndex(x=> {if(x.element.nativeElement.getAttribute('boxindex') == this.initialIndex) x.element.nativeElement.focus()} );

	}
  ngAfterViewInit() {
	// this.initialIndex = Math.floor(this.dimension/2);
	// console.log(this.initialIndex, "index");
	// this.inputs.toArray().findIndex(x=> {if(x.element.nativeElement.getAttribute('boxindex') == this.initialIndex) x.element.nativeElement.focus()} );
  }
 
  ngDoCheck() {
	// on Input change updates square board
	// this.squareBox = new Array(this.dimension).fill(0).map((_, i) => i);
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
		}
		break;

	  case "DOWN" : 
		index += this.columns;
		this.count++;
		if(this.randomNumberArray.includes(index)){
		  this.currentIndexValueInRandomArray = this.randomNumberArray.indexOf(index);
		  this.randomNumberArray.splice(this.currentIndexValueInRandomArray,1);
		}
		break;

	  case "LEFT" : 
		index--;
		this.count++;
		if(this.randomNumberArray.includes(index)){
		  this.currentIndexValueInRandomArray = this.randomNumberArray.indexOf(index);
		  this.randomNumberArray.splice(this.currentIndexValueInRandomArray,1);
		}
		break;
	  
	  case "RIGHT" : 
		index++;
		this.count++;
		if(this.randomNumberArray.includes(index)){
		  this.currentIndexValueInRandomArray = this.randomNumberArray.indexOf(index);
		  this.randomNumberArray.splice(this.currentIndexValueInRandomArray,1);
		}
		break;
	  
	}
	if(index>=0 && index<this.inputs.length) {
	  inputToArray[index].element.nativeElement.focus();
	  
	}
  }

  generateRandomNumber(dimension:number) {
	let countNum = Math.sqrt(dimension);
	const nums = new Set();
	while(nums.size !== countNum) {
	  nums.add(Math.floor(Math.random() * (dimension-1)) + 1);
	}
	return [...nums];
	console.log([...nums]);
  } 

  
}
