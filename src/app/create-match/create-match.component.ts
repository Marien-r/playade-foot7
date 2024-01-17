import { Component } from '@angular/core';
import { MatchService } from '../services/match.service';
import { IMatch } from '../match';

@Component({
  selector: 'app-create-match',
  templateUrl: './create-match.component.html',
  styleUrl: './create-match.component.scss'
})
export class CreateMatchComponent {
  match: IMatch = {
    phase: '',
    groupe: '',
    equipe1: '',
    equipe2: '',
    terrain: 0,
    date: new Date()
  }; // Modèle de match

  constructor(private matchService: MatchService) {}

  createMatch() {
    this.matchService.addMatch(this.match)
      .then(response => {
        console.log('Match ajouté avec succès', response);
      })
      .catch(error => {
        console.error('Erreur lors de l\'ajout du match', error);
      });
  }
}





