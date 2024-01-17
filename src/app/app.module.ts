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

@NgModule({
    declarations: [
        AppComponent,
        CreateMatchComponent,
        MatchListComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideAuth(() => getAuth()),
        provideFirestore(() => getFirestore()),
    ],
    providers: [MatchService],
    bootstrap: [AppComponent]
})
export class AppModule { }
