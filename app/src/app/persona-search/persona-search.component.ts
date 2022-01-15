import { Component, OnInit } from '@angular/core';

import { Observable, Subject } from 'rxjs';

import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';

import { Persona } from '../persona';
import { PersonaService } from '../persona.service';

@Component({
  selector: 'app-persona-search',
  templateUrl: './persona-search.component.html',
  styleUrls: [ './persona-search.component.css' ]
})
export class PersonaSearchComponent implements OnInit {
  personas$!: Observable<Persona[]>;
  private searchTerms = new Subject<string>();

  constructor(private personaService: PersonaService) {}

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.personas$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.personaService.searchPersonas(term)),
    );
  }
}
