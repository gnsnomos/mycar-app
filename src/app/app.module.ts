import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID, DEFAULT_CURRENCY_CODE } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { environment } from 'src/environments/environment';
import { ActivateLoginGuard } from './activate-login.guard';
import { HomeComponent } from './home/home.component';
import { JourneyModule } from './journey/journey.module';
import { SignInModule } from './signin/signin.module';
import { ServiceModule } from './service/service.module';
import localeEl from '@angular/common/locales/el';

registerLocaleData(localeEl);

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    JourneyModule,
    SignInModule,
    ServiceModule
  ],
  providers: [
    AngularFireAuth,
    ActivateLoginGuard,
    { provide: LOCALE_ID, useValue: 'el' },
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'EUR' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
