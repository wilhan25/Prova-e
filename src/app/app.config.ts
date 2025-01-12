import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';


// Sua configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDOFpfA65ev1BJWktoIBKfE8r0wmCiF3D8",
  authDomain: "e-prova-1f1bd.firebaseapp.com",
  projectId: "e-prova-1f1bd",
  storageBucket: "e-prova-1f1bd.firebasestorage.app",
  messagingSenderId: "567317978239",
  appId: "1:567317978239:web:0f105d0bea5289ce5af34a"
};


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideAnimationsAsync(),
    // Provedor do Firebase
    { provide: FIREBASE_OPTIONS, useValue: firebaseConfig },
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()) 
  ],
};