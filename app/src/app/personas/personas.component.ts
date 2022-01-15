import { Component, OnInit } from '@angular/core';
import { Persona } from '../persona';
 import { PERSONAS } from '../mock-personas';

import { PersonaService } from '../persona.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-personas',
  templateUrl: './personas.component.html',
  styleUrls: ['./personas.component.css']
})
export class PersonasComponent implements OnInit {

  // persona: Persona = {
  //   id: 1,
  //   nombre: 'Windstorm',
  //   edad: 54
  // };

  // personas = PERSONAS;
  // selectedPersona?: Persona;

  // constructor() { }

  // ngOnInit(): void {
  // }

  // onSelect(persona: Persona): void {
  //   this.selectedPersona = persona;
  // }

  selectedPersona?: Persona;

  personas: Persona[] = [];

  //constructor(private personaService: PersonaService) { }

  // constructor(private personaService: PersonaService, private messageService: MessageService) { }

  // ngOnInit(): void {
  //   this.getPersonas();
  // }

  // onSelect(persona: Persona): void {
  //   this.selectedPersona = persona;
  //   this.messageService.add(`PersonasComponent: Selected persona id=${persona.id}`);
  // }

  // getPersonas(): void {
  //   this.personaService.getPersonas()
  //       .subscribe(personas => this.personas = personas);
  // }

  
  
  
    constructor(private personaService: PersonaService) { }
  
    ngOnInit(): void {
      this.getPersonas();
    }
  
    getPersonas(): void {
      this.personaService.getPersonas()
      .subscribe(personas => this.personas = personas);
    }
  
    add(nombre: string): void {
      nombre = nombre.trim();
      if (!nombre) { return; }
      this.personaService.addPersona({ nombre } as Persona)
        .subscribe(persona => {
          this.personas.push(persona);
        });
    }
  
    delete(persona: Persona): void {
      this.personas = this.personas.filter(h => h !== persona);
      this.personaService.deletePersona(persona.id).subscribe();
    }

}
