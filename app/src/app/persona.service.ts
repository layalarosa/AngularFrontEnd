import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Persona } from './persona';
//import { PERSONAS } from './mock-personas';
import { MessageService } from './message.service';

@Injectable({ providedIn: 'root' })
export class PersonaService {

  private personasUrl = 'api/personas';  // URL to web api
  //private personasUrl = 'https://localhost:44348/api/personas';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /** GET heroes from the server */
  getPersonas(): Observable<Persona[]> {
    return this.http.get<Persona[]>(this.personasUrl)
      .pipe(
        tap(_ => this.log('fetched personas')),
        catchError(this.handleError<Persona[]>('getPersonas', []))
      );
  }

  /** GET persona by id. Return `undefined` when id not found */
  getPersonaNo404<Data>(id: number): Observable<Persona> {
    const url = `${this.personasUrl}/?id=${id}`;
    return this.http.get<Persona[]>(url)
      .pipe(
        map(personas => personas[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} persona id=${id}`);
        }),
        catchError(this.handleError<Persona>(`getPersona id=${id}`))
      );
  }

  /** GET persona by id. Will 404 if id not found */
  getPersona(id: number): Observable<Persona> {
    const url = `${this.personasUrl}/${id}`;
    return this.http.get<Persona>(url).pipe(
      tap(_ => this.log(`fetched persona id=${id}`)),
      catchError(this.handleError<Persona>(`getPersona id=${id}`))
    );
  }

  /* GET personas whose name contains search term */
  searchPersonas(term: string): Observable<Persona[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Persona[]>(`${this.personasUrl}/?name=${term}`).pipe(
      tap(x => x.length ?
         this.log(`found personas matching "${term}"`) :
         this.log(`no personas matching "${term}"`)),
      catchError(this.handleError<Persona[]>('searchPersonas', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new persona to the server */
  addPersona(persona: Persona): Observable<Persona> {
    return this.http.post<Persona>(this.personasUrl, persona, this.httpOptions).pipe(
      tap((newPersona: Persona) => this.log(`added persona w/ id=${newPersona.id}`)),
      catchError(this.handleError<Persona>('addPersona'))
    );
  }

  /** DELETE: delete the persona from the server */
  deletePersona(id: number): Observable<Persona> {
    const url = `${this.personasUrl}/${id}`;

    return this.http.delete<Persona>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted persona id=${id}`)),
      catchError(this.handleError<Persona>('deletePersona'))
    );
  }

  /** PUT: update the persona on the server */
  updatePersona(persona: Persona): Observable<any> {
    return this.http.put(this.personasUrl, persona, this.httpOptions).pipe(
      tap(_ => this.log(`updated persona id=${persona.id}`)),
      catchError(this.handleError<any>('updatePersona'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`PersonaService: ${message}`);
  }
}
