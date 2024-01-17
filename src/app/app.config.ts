import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), importProvidersFrom(provideFirebaseApp(() => initializeApp({"projectId":"playade-foot7","appId":"1:945638894403:web:9ad606667fb0b1ab635df6","storageBucket":"playade-foot7.appspot.com","apiKey":"AIzaSyBK7glEYYQdX6B9K4NLyo26MI6bW3okBRo","authDomain":"playade-foot7.firebaseapp.com","messagingSenderId":"945638894403"}))), importProvidersFrom(provideAuth(() => getAuth())), importProvidersFrom(provideFirestore(() => getFirestore()))]
};
