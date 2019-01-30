import { AboutJoinComponent } from './about_join.component';
import { AboutEscapeComponent } from './about_escapes.component';
import { AboutCreateComponent } from './about_create.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { TermsComponent } from './terms.component';
import { StaticPagesRoutingModule } from './static_pages-routing.module';
import { FAQComponent } from './FAQ.component';


@NgModule({
  imports: [BrowserModule,
    NgbModule,
    StaticPagesRoutingModule,
  ],
  declarations: [
    AboutCreateComponent,
    AboutEscapeComponent,
    AboutJoinComponent,
    FAQComponent,
    TermsComponent,
  ],
  exports:[
    TermsComponent
  ]
})
export class StaticPagesModule {
}
