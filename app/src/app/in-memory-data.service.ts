import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Persona } from './persona';

@Injectable({
  providedIn: 'root'
})
// export class InMemoryDataService {

//   constructor() { }

// }

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const personas = [
      { id: 11, nombre: 'Dr Nice', edad: 24 },
      { id: 12, nombre: 'Narco', edad: 25 },
      { id: 13, nombre: 'Bombasto', edad: 29 },
      { id: 14, nombre: 'Celeritas', edad: 50 },
      { id: 15, nombre: 'Magneta', edad: 21 },
      { id: 16, nombre: 'RubberMan', edad: 76 },
      { id: 17, nombre: 'Dynama', edad: 35 },
      { id: 18, nombre: 'Dr IQ', edad: 16 },
      { id: 19, nombre: 'Magma', edad: 5 },
      { id: 20, nombre: 'Tornado', edad: 45 }
    ];
    return {personas};
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  genId(personas: Persona[]): number {
    return personas.length > 0 ? Math.max(...personas.map(persona => persona.id)) + 1 : 11;
  }
}
