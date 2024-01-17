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

  constructor(private matchService: MatchService, private datePipe: DatePipe) { }

  ngOnInit(): void {
    // Chargez les matchs depuis le service
    this.matchService.getMatches().subscribe(matches => {
      this.matches = matches;
    });
  }

  getMatchesByGroup(group: string): any[] {
    // Filtrer les matchs par groupe
    return this.matches.filter(match => match.groupe === group);
  }

  getUniqueGroups(): string[] {
    return Array.from(new Set(this.matches.map(match => match.groupe)));
  }

  formatDate(date: Date): string {
    return this.datePipe.transform(date, 'dd/MM/yyyy HH:mm', 'fr-FR') || '';
  }
}
