import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Routes, RouterModule } from '@angular/router'
import { WebsiteModule } from './modules/website/website.module'
import { E404Component } from './modules/website/components/E404/e404.component'

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import(
      './modules/website/website.module'
    ).then(m => m.WebsiteModule),
  },
  {
    path: '**',
    component: E404Component
  }
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
