import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WebsiteRoutingModule } from './website-routing.module';
import { WallComponent } from './components/wall/wall.component';
import { BoardComponent } from './components/board/board.component';
import { E404Component } from './components/E404/e404.component';
import { SharedModule } from '../shared/shared.module';
import { FoldyComponent } from './components/foldy/foldy.component';
import { PanelComponent } from './components/panel/panel.component';
import { ApproxFormComponent } from './components/approx-form/approx-form.component';
import { HttpClientModule } from '@angular/common/http';
import { ConstFormComponent } from './components/const-form/const-form.component'; // Importa HttpClientModule


@NgModule({
  declarations: [
    WallComponent,
    BoardComponent,
    E404Component,
    FoldyComponent,
    PanelComponent,
    ApproxFormComponent,
    ConstFormComponent
  ],
  imports: [
    CommonModule,
    WebsiteRoutingModule,
    HttpClientModule,

    SharedModule
  ]
})
export class WebsiteModule { }
