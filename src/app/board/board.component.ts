import { Component, OnInit,Input, ViewChildren, QueryList, ViewChild, ElementRef, HostListener } from '@angular/core';
import { KeyboardService } from '../keyboard.service';
import { NavColDirective } from '../nav-col.directive';
@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
	currentX:number=0; 
	currentY:number=0;
  dimension!:number ;
  midDiv:number = 0;
  squareBox:any[] = [];
  columns!:number;
  maxwidth!:String ;
  randomNumberArray:any ;
  count : number = 0;
  currentIndexValueInRandomArray!:number;
  initialIndex!:number;
  currentPos!:any[];
  currentfoodCount:number = 0;
  
  @ViewChildren(NavColDirective) inputs!:QueryList<NavColDirective>
  @ViewChild('boxRef') centreBox! : ElementRef<HTMLInputElement>;

  constructor(private keyboardService : KeyboardService, private initElement : ElementRef) { 
  }
  
  ngOnInit(): void {
	
  }
  ngOnchanges(){
  }
  loadSquare(dimension:any){		
		this.columns = dimension;
		this.midDiv = Math.floor(this.dimension/2);
		this.squareBox = new Array(this.columns).fill(0).map(() => new Array(this.columns).fill(0));
		this.currentPos = new Array(this.columns).fill(0).map(() => new Array(this.columns).fill(0));
		this.currentX = Math.floor(this.dimension/2)
		this.currentY = Math.floor(this.dimension/2)
		this.currentPos[this.currentX][this.currentY] = 100;
		for (var i = 0; i< dimension; i++){
			var x = this.generateRandomNumber(dimension);
			var y = this.generateRandomNumber(dimension);
			if( this.currentPos[x][y] != 100 && this.squareBox[x][y] != 1 ){
				this.squareBox[x][y] = 1
			} else {
				var x = this.generateRandomNumber(dimension);
				var y = this.generateRandomNumber(dimension);
				this.squareBox[x][y] = 1
			}
		}
		this.keyboardService.keyBoard.subscribe(res => { this.move(res)}  )
		this.maxwidth = this.columns*70+'px'; 
	}
 
  move(object:any) {

	let newX:number;
	let newY:number;
	console.log(this.currentfoodCount == this.dimension, "count");
	if(this.currentfoodCount == this.dimension){
		alert("Steps taken to collect all the Food :"+ this.count);
		return;
	}
	switch(object.action) {
	  case "UP" : 
	  newX  = this.currentX - 1
	  newY = this.currentY
	  
		if (newX < 0){
			return
		}
		this.currentPos[this.currentX][this.currentY] = 0
		this.currentPos[newX][newY] = 100

		this.currentX = newX
		this.currentY = newY
		this.count++;
		if(this.squareBox[this.currentX][this.currentY] == 1) {
			this.squareBox[this.currentX][this.currentY] =0;
			this.currentfoodCount++;

		}
		break;

	  case "DOWN" : 
	 
	  newX  = this.currentX + 1
		newY = this.currentY
	   if (newX > this.dimension-1){
		   return
	   }
	  this.currentPos[this.currentX][this.currentY] = 0
	  this.currentPos[newX][newY] = 100
	  this.currentX = newX
		this.currentY = newY
		this.count++;
		if(this.squareBox[this.currentX][this.currentY] == 1) {
			this.squareBox[this.currentX][this.currentY] = 0;

			this.currentfoodCount++;
		}
		break;

	  case "LEFT" : 
	  newX  = this.currentX
	  newY = this.currentY - 1
	 if (newY < 0){
		 return
	 }
	
		this.currentPos[this.currentX][this.currentY] = 0
		this.currentPos[newX][newY] = 100

		this.currentX = newX
		this.currentY = newY
		this.count++;
		if(this.squareBox[this.currentX][this.currentY] == 1) {

			this.squareBox[this.currentX][this.currentY] = 0;
			this.currentfoodCount++;
		}
		break;
	  
	  case "RIGHT" : 
		
		newX = this.currentX
		newY = this.currentY + 1
	   if (newY > this.dimension-1){
		   return
	   }
	   this.currentPos[this.currentX][this.currentY] = 0
	   this.currentPos[newX][newY] = 100
	   this.currentX = newX
	   this.currentY = newY
	   this.count++;
	   if(this.squareBox[this.currentX][this.currentY] == 1) {
		this.squareBox[this.currentX][this.currentY] = 0;

		this.currentfoodCount++;
	}
		break;
	  
	}	
  }

  generateRandomNumber(dimension:number) {
	let min = 0;
    let max = Math.floor(dimension);
    return Math.floor(Math.random() * dimension);
  }     
}
