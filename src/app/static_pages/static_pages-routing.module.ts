import { AboutCreateComponent } from './about_create.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TermsComponent } from './terms.component';
import { AboutEscapeComponent } from './about_escapes.component';
import { AboutJoinComponent } from './about_join.component';
import { FAQComponent } from './FAQ.component';

const routes: Routes = [
  { path: 'about_escapes', component: AboutEscapeComponent },
  { path: 'about_create', component: AboutCreateComponent },
  { path: 'about_join', component: AboutJoinComponent },
  { path: 'terms', component: TermsComponent },
  { path: 'FAQ', component: FAQComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StaticPagesRoutingModule {
}
