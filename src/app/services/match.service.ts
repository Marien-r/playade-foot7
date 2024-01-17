import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, setDoc, query, doc, addDoc, getDocs, DocumentSnapshot, deleteDoc, docData, DocumentReference, DocumentData, where } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IMatch } from '../match';

@Injectable({
  providedIn: 'root'
})
export class MatchService {
  private matchCollection = 'matchs';

  constructor(private firestore: Firestore) {}

  addMatch(match: any): Promise<any> {
    const refCollection = collection(this.firestore, this.matchCollection)
    return addDoc(refCollection, match).then((newDoc) => {
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
