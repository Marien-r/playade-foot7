import { Component } from '@angular/core';
import { MatchService } from '../services/match.service';
import { IMatch } from '../match';
import { DatePipe } from '@angular/common';
import { Auth, User, authState } from '@angular/fire/auth';
import { EMPTY, Observable, Subscription, map, tap } from 'rxjs';


@Component({
  selector: 'app-match-list',
  templateUrl: './match-list.component.html',
  styleUrl: './match-list.component.scss',
  providers: [DatePipe]
})
export class MatchListComponent {
  matches: IMatch[] = []; // Mettez le type correct si vous avez défini un modèle Match
  currentPhase: string = '';
  showDeleteButton = false;
  private readonly userDisposable: Subscription | undefined;

  constructor(private matchService: MatchService,
    private datePipe: DatePipe,
    private auth: Auth) {
    this.userDisposable = authState(this.auth).pipe(
      tap(u => console.log(u)),
      map(u => !!u) // cast into a boolean
    ).subscribe(isLoggedIn => {
      this.showDeleteButton = isLoggedIn
    });
  }

  ngOnInit(): void {
    // Chargez les matchs depuis le service
    this.matchService.getMatches().subscribe(matches => {
      this.matches = matches;

      // Récupère la phase la plus récente
      this.currentPhase = this.getUniquePhases().reverse()[0];
    });
  }

  ngOnDestroy(): void {
    if (this.userDisposable) {
      this.userDisposable.unsubscribe();
    }
  }

  // Supprime un match
  deleteMatch(match: IMatch) {
    // vérification que l'utilisation soit authentifié
    if (!this.showDeleteButton) {
      return;
    }

    if (match.id === undefined) {
      throw new Error('Impossible de supprimer un match sans id');
    }

    this.matchService.deleteMatch(match.id)
      .then(() => {
        console.log('Match supprimé avec succès');
      })
      .catch(error => {
        console.error('Erreur lors de la suppression du match', error);
      });
  }

  updateCurrentPhase(phase: string) {
    this.currentPhase = phase;
  }

  getMatchesByPhaseAndGroup(phase: string, group: string): any[] {
    // Filtrer les matchs par groupe et phase triés par date
    return this.matches.filter(match => match.phase == phase 
      && match.groupe == group).
      sort((a, b) => a.date.getTime() - b.date.getTime());
  }

  getUniqueGroups(phase: string): string[] {
    return Array.from(
      new Set(
        this.matches.filter(match => match.phase == phase).
          map(match => match.groupe)
      )).sort();
  }

  getUniquePhases(): string[] {
    return Array.from(new Set(this.matches.map(match => match.phase))).sort();
  }

  formatDate(date: Date): string {
    return this.datePipe.transform(date, 'dd/MM/yyyy HH:mm', 'fr-FR') || '';
  }
}
