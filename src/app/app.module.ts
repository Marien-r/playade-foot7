import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { CreateMatchComponent } from './create-match/create-match.component';
import { MatchListComponent } from './match-list/match-list.component';
import { MatchService } from './services/match.service';
import { AppRoutingModule } from './app-routing.module';
import { DatetimeLocalInputComponent } from './datetime-local-input/datetime-local-input.component';
import { AuthComponent } from './auth/auth.component';

@NgModule({
    declarations: [
        AppComponent,
        CreateMatchComponent,
        MatchListComponent,
        DatetimeLocalInputComponent,
        AuthComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideAuth(() => getAuth()),
        provideFirestore(() => getFirestore()),
        AppRoutingModule,
    ],
    providers: [MatchService],
    bootstrap: [AppComponent]
})
export class AppModule { }
