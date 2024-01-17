import { Component } from '@angular/core';
import { MatchService } from '../services/match.service';
import { IMatch } from '../match';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-match-list',
  templateUrl: './match-list.component.html',
  styleUrl: './match-list.component.scss',
  providers: [DatePipe]
})
export class MatchListComponent {
  matches: IMatch[] = []; // Mettez le type correct si vous avez défini un modèle Match
  currentPhase: string = '';

  constructor(private matchService: MatchService, private datePipe: DatePipe) { }

  ngOnInit(): void {
    // Chargez les matchs depuis le service
    this.matchService.getMatches().subscribe(matches => {
      this.matches = matches;

      // Récupère la phase la plus récente
      this.currentPhase = this.getUniquePhases().sort().reverse()[0];
    });
  }

  updateCurrentPhase(phase: string) {
    this.currentPhase = phase;
  }

  getMatchesByPhaseAndGroup(phase: string, group: string): any[] {
    // Filtrer les matchs par groupe et phase
    return this.matches.filter(
      match => match.groupe === group
        && match.phase === phase);
  }

  getUniqueGroups(phase: string): string[] {
    return Array.from(
      new Set(
        this.matches.filter(match => match.phase == phase).
          map(match => match.groupe)
      ));
  }

  getUniquePhases(): string[] {
    return Array.from(new Set(this.matches.map(match => match.phase)));
  }

  formatDate(date: Date): string {
    return this.datePipe.transform(date, 'dd/MM/yyyy HH:mm', 'fr-FR') || '';
  }
}
