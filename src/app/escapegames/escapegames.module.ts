import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { EscapegamesRoutingModule } from './escapegames-routing.module';
import { EscapegamesComponent } from './escapegames.component';
import { DisplayEscapegameComponent } from './display-escapegame.component';

@NgModule({
  imports: [SharedModule, FormsModule, CommonModule, EscapegamesRoutingModule],
  declarations: [EscapegamesComponent, DisplayEscapegameComponent],
  exports: [EscapegamesComponent]
})
export class EscapegamesModule {}
