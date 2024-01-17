import { Component, OnDestroy, OnInit } from '@angular/core';
import { Auth, authState, signInAnonymously, User } from '@angular/fire/auth';
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { EMPTY, map, Observable, Subscription, tap } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit, OnDestroy {
  private readonly userDisposable: Subscription | undefined;
  public readonly user: Observable<User | null> = EMPTY;

  showLoginButton = false;
  showLogoutButton = false;

  constructor(private auth: Auth) {
    this.user = authState(this.auth);
    this.userDisposable = authState(this.auth).pipe(
      tap(u => console.log(u)),
      map(u => !!u) // cast into a boolean
    ).subscribe(isLoggedIn => {
      this.showLoginButton = !isLoggedIn
      this.showLogoutButton = isLoggedIn
    });
  }

  ngOnDestroy(): void {
    if (this.userDisposable) {
      this.userDisposable.unsubscribe();
    }
  }

  ngOnInit(): void {    
  }

  async login() {
    return await signInWithPopup(this.auth, new GoogleAuthProvider());
  }

  async logout() {
    return await signOut(this.auth)
  }
}
