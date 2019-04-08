import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { InterceptorService } from '@SHARED/services/interceptor.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AuthGuard } from '@AUTH/auth.guard';
import { CalendarComponent } from './calendar/calendar.component';
import { EventEmitterService } from '@SERVICES/event-emitter.service';
import { LeaveFormComponent } from './leave-form/leave-form.component';
import { LeaveDetailComponent } from './leave-detail/leave-detail.component';
import { LeaveHighlightDirective } from '@SHARED/directives/leave-highlight.directive';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'leave-form', component: LeaveFormComponent, canActivate: [AuthGuard] },
  // {
  //   path: 'heroes',
  //   component: HeroListComponent,
  //   data: { title: 'Heroes List' }
  // },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    LeaveFormComponent,
    LeaveDetailComponent,
    LeaveHighlightDirective,
    LoginComponent,
    PageNotFoundComponent,
    NavBarComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      appRoutes,
      // { enableTracing: true } // <-- debugging purposes only
    ),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    },
    EventEmitterService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
