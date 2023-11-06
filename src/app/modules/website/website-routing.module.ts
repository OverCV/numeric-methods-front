import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { WallComponent } from './components/wall/wall.component'
import { BoardComponent } from './components/board/board.component'

const routes: Routes = [
  // { path: '', redirectTo: '/site', pathMatch: 'full' },
  // { path: 'site', component: WallComponent },
  // { path: 'board', component: BoardComponent },
  // { path: '**', redirectTo: '/site' },
  {
    path: '',
    component: WallComponent,
    children: [
      {
        path: 'board',
        component: BoardComponent
      }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebsiteRoutingModule { }
