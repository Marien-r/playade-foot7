import { Component } from '@angular/core';
import { Auth, authState } from '@angular/fire/auth';
import { Subscription, map, tap } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  showAddMatch = false;
  private readonly userDisposable: Subscription | undefined;

  title = 'playade-foot7';

  constructor(private auth: Auth) {
    this.userDisposable = authState(this.auth).pipe(
      tap(u => console.log(u)),
      map(u => !!u) // cast into a boolean
    ).subscribe(isLoggedIn => {
      this.showAddMatch = isLoggedIn
    });
  }

  ngOnDestroy(): void {
    if (this.userDisposable) {
      this.userDisposable.unsubscribe();
    }
  }
}
