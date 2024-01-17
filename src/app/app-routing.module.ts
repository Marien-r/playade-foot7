import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatchListComponent } from './match-list/match-list.component';
import { CreateMatchComponent } from './create-match/create-match.component';
import { authGuard } from './auth.guard';

const routes: Routes = [
  { path: 'matches', component: MatchListComponent },
  { path: 'add-match', component: CreateMatchComponent, canActivate: [authGuard] },
  { path: '',   redirectTo: 'matches', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }