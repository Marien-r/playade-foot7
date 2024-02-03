import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, setDoc, query, doc, addDoc, getDocs, DocumentSnapshot, deleteDoc, docData, DocumentReference, DocumentData, where, Timestamp } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IMatch } from '../match';

@Injectable({
  providedIn: 'root'
})
export class MatchService {
  private matchCollection = 'matchs';

  constructor(private firestore: Firestore) {}

  deleteMatch(matchId: string) {
    // supprime un match
    const ref = doc(this.firestore, this.matchCollection, matchId);
    return deleteDoc(ref);
  }

  addMatch(match: any): Promise<any> {
    // Créer une copie de l'objet pour éviter de modifier l'original
    const matchCopy = { ...match };

    // Vérifier si match.date est un objet Date
    if (match.date instanceof Date) {
      // Convertir la propriété date en Timestamp
      matchCopy.date = Timestamp.fromDate(match.date);
    } else {
      console.error('Invalid date object:', match.date);
      throw new Error('Invalid date object'); // Gérer l'erreur comme vous le souhaitez
    }

    const refCollection = collection(this.firestore, this.matchCollection)
    return addDoc(refCollection, matchCopy).then((newDoc) => {
      console.log(`doc was created at ${newDoc.path}`);
    })
      .catch((error) => {
        console.log(`I got an error! ${error}`)
      })      
  }

  getMatches(): Observable<IMatch[]> {
    const matchRef = collection(this.firestore, this.matchCollection);
    const q = query(matchRef)
    return collectionData(q, { idField: 'id' }).pipe(
      map(matches => {
        return matches.map(match => {
          // Convertir le champ 'date' de type Timestamp en objet Date
          return { ...match, date: match["date"].toDate() };
        });
      })
    ) as Observable<IMatch[]>;
  }
}
