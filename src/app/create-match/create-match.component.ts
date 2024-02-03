import { Component } from '@angular/core';
import { MatchService } from '../services/match.service';
import { IMatch } from '../match';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-match',
  templateUrl: './create-match.component.html',
  styleUrl: './create-match.component.scss'
})
export class CreateMatchComponent {
  matchForm: FormGroup = this.formBuilder.group({
    phase: ['', Validators.required],
    groupe: ['', Validators.required],
    equipe1: ['', Validators.required],
    equipe2: ['', Validators.required],
    terrain: ['', Validators.required],
    date: ['', Validators.required]
  });
    
  displayMessage = ""
  groupeOptions: string[] = [];

  constructor(
    private matchService: MatchService,
    private formBuilder: FormBuilder) { }

  // tableaux de phases
  phases = [
    '1) Phase de groupes',
    '2) Phase de groupes',
    '3) Quarts de finale',
    '4) Demi-finales',
    '5) Finales'
  ];

  ngOnInit() {
    this.matchForm.get('phase')?.valueChanges.subscribe(() => {
      this.updateGroupeOptions();
    });

    this.matchForm.patchValue({
      phase: this.phases[0]
    });

    this.matchForm.patchValue({
      date: new Date()
    });
  }

  updateGroupeOptions() {
    const phaseValue = this.matchForm.get('phase')?.value;

    if (phaseValue === '1) Phase de groupes' ||
      phaseValue === '2) Phase de groupes') {
      this.groupeOptions = ['Groupe A', 'Groupe B', 'Groupe C'];
    } else {
      this.groupeOptions = ['Principal', 'Secondaire'];
    }

    this.matchForm.patchValue({
      groupe: this.groupeOptions[0]
    });
  }
  createMatch() {
    if (this.matchForm.invalid) {
      return;
    }

    const match: IMatch = this.matchForm.value;

    this.matchService.addMatch(match)
      .then(response => {
        console.log('Match ajouté avec succès', response);

        // displayMessage prend la valeur Match équipe1 vs équipe2 créé
        this.displayMessage = `Match ${match.equipe1} vs ${match.equipe2} créé`;

        // Réinitialise la variable après un court délai pour cacher le message
        setTimeout(() => {
          this.displayMessage = "";
        }, 5000); // Attend 5 secondes avant de réinitialiser

        // reset matchForm equipe1 et equipe2
        this.matchForm.patchValue({
          equipe1: '',
          equipe2: ''
        });
      })
      .catch(error => {
        console.error('Erreur lors de l\'ajout du match', error);
      });
  }
}





