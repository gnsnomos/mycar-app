import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs/internal/Observable';
import { IJourney } from './journey.model';

@Injectable({
  providedIn: 'root'
})
export class JourneyService {

  private readonly firebaseCollectionName = 'journeys';

  constructor(private store: AngularFirestore) { }

  read(): Observable<IJourney[]> {
    return this.store.collection(this.getCollection(), ref => ref.orderBy('currentKlm', 'desc')).valueChanges({ idField: 'id' }) as Observable<IJourney[]>;
  }

  save(data: IJourney): void {
    this.store.collection(this.getCollection()).add(data);
  }

  update(docId: string, data: IJourney): void {
    this.store.collection(this.getCollection()).doc(docId).update(data);
  }

  delete(docId: string): void {
    this.store.collection(this.getCollection()).doc(docId).delete();
  }

  private getUser(): any {
    return JSON.parse(localStorage.getItem('user'))?.uid ?? this.firebaseCollectionName;
  }

  private getCollection(): string {
    return `/users/${this.getUser()}/journeys`;
  }
}
