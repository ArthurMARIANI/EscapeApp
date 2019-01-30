import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

import { JwtModule } from '@auth0/angular-jwt';
import { MomentModule } from 'ngx-moment';
import { DateValueAccessorModule } from 'angular-date-value-accessor';

import { AppComponent } from './app.component';
import { FooterComponent } from './core/footer/footer.component';
import { CoreModule } from './core/core.module';
import { HomeModule } from './home/home.module';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { Configuration } from './app.constants';
import { TeamsModule } from './teams/teams.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { EscapegamesModule } from './escapegames/escapegames.module';
import { AuthService } from './core/auth/auth.service';
import { RoomsModule } from './rooms/rooms.module';
import { StaticPagesModule } from './static_pages/static_pages.module';

export function tokenGetter() {
  return JSON.parse(localStorage.getItem('token'));
}

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    BrowserModule,
    HttpClientModule,
    MomentModule,
    DateValueAccessorModule,
    CoreModule,
    HomeModule,
    TeamsModule,
    EscapegamesModule,
    SharedModule,
    AuthModule,
    UsersModule,
    RoomsModule,
    StaticPagesModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['localhost:1337'],
        blacklistedRoutes: []
      }
    }),
    AngularFontAwesomeModule,
    NgbModule.forRoot(),
    AppRoutingModule,
  ],
  providers: [
    Configuration,
    AuthService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
