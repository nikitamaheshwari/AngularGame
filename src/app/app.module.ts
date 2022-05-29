import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BoardComponent } from './board/board.component';
import { NavColDirective } from './nav-col.directive';
import { KeyboardService } from './keyboard.service';

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    NavColDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [KeyboardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
