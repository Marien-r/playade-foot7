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
  displayMessage = ""

  groupeOptions: string[] = [];

  constructor(private matchService: MatchService) { }

  // tableaux de phases
  phases = [
    { value: '1) Phase de groupes', viewValue: '1) Phase de groupes' },
    { value: '2) Phase de groupes', viewValue: '2) Phase de groupes' },
    { value: '3) Quarts de finale', viewValue: '3) Quarts de finale' },
    { value: '4) Demi-finales', viewValue: '4) Demi-finales' },
    { value: '5) Finales', viewValue: '5) Finales' }
  ];


  updateGroupeOptions() {
    if (this.match.phase === '1) Phase de groupes' ||
      this.match.phase === '2) Phase de groupes') {
      this.groupeOptions = ['Groupe A', 'Groupe B', 'Groupe C'];
    } else {
      this.groupeOptions = ['Principal', 'Secondaire'];
    }
  }

  createMatch() {
    this.matchService.addMatch(this.match)
      .then(response => {
        console.log('Match ajouté avec succès', response);

        // displayMessage prend la valeur Match équipe1 vs équipe2 créé
        this.displayMessage = `Match ${this.match.equipe1} vs ${this.match.equipe2} créé`;

        // Réinitialise la variable après un court délai pour cacher le message
        setTimeout(() => {
          this.displayMessage = "";
        }, 5000); // Attend 5 secondes avant de réinitialiser

        this.match.equipe1 = '';
        this.match.equipe2 = '';
      })
      .catch(error => {
        console.error('Erreur lors de l\'ajout du match', error);
      });
  }
}





