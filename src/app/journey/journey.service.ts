import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { IService, ServiceConfiguration } from '../service/service.model';
import { IJourney } from './journey.model';

@Injectable({
  providedIn: 'root'
})
export class JourneyService {

  latestJourney$ = new BehaviorSubject<IJourney>(null);

  private readonly defaultServiceConfiguration = require('../service/service-configuration.json');
  private readonly firebaseCollectionName = 'journeys';

  constructor(private store: AngularFirestore) { }

  getLastJourney(): any {
    //   const docRef = await this.store.collection('yourcollectionname').doc('yourdocId');
    // const data = (await docRef.get()).data();
    return this.store.collection(this.getCollection('journeys'), ref => ref.orderBy('currentKlm', 'desc').limit(1));
  }

  getLatestJourneys(): Observable<IJourney[]> {
    return this.store.collection(this.getCollection('journeys'), ref => ref.orderBy('currentKlm', 'desc')).valueChanges({ idField: 'id' }) as Observable<IJourney[]>;
  }

  saveJourney(data: IJourney, collection?: string): void {
    this.store.collection(this.getCollection('journeys')).add(data);
  }

  updateJourney(docId: string, data: IJourney, collection?: string): void {
    this.store.collection(this.getCollection('journeys')).doc(docId).update(data);
  }

  deleteJourney(docId: string, collection?: string): void {
    this.store.collection(this.getCollection('journeys')).doc(docId).delete();
  }

  getServiceConfiguration(): any {
    // TODO: implement logic to retrieve configuration from database
  }

  getDefaultService(): ServiceConfiguration {
    return this.defaultServiceConfiguration.service;
  }

  getServiceByType(serviceType: string): Observable<IService[]> {
    return this.store.collection(this.getCollection('services'), ref => ref.limit(1).where('type', '==', serviceType).orderBy('currentKlm', 'desc')).valueChanges({ idField: 'id' }) as Observable<IService[]>;
  }

  saveService(data: IService, collection?: string): void {
    this.store.collection(this.getCollection('services')).add(data);
  }

  updateService(docId: string, data: IService, collection?: string): void {
    this.store.collection(this.getCollection('services')).doc(docId).update(data);
  }

  deleteService(docId: string, collection?: string): void {
    this.store.collection(this.getCollection('services')).doc(docId).delete();
  }

  private getUser(): any {
    return JSON.parse(localStorage.getItem('user'))?.uid ?? this.firebaseCollectionName;
  }

  private getCollection(collection: string): string {
    return `/users/${this.getUser()}/${collection}`;
  }
}
