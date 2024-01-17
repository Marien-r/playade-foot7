import { inject } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(Auth);
  
  if (authService.currentUser !== null) {
    return true;
  }

  return false
};
