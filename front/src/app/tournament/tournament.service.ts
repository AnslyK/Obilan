import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { TeamTournament, SoloTournament } from './_models/tournament';

@Injectable({
  providedIn: 'root'
})
export class TournamentService {

  private tournamentUrl = 'http://localhost:8800/tournament';

  constructor(private http: HttpClient) { }

  getAllTeamTournament(){
    return this.http.get<TeamTournament[]>(`${this.tournamentUrl}/team`).pipe(
      tap(_=>this.log('fetched teamTournament')),
      catchError(this.handleError<TeamTournament[]>('getTeamTournament', []))
    );
  }

  getAllSoloTournament(): Observable<SoloTournament[]>{
    return this.http.get<SoloTournament[]>(`${this.tournamentUrl}/solo`).pipe(
      tap(_=>this.log('fetched soloTournament')),
      catchError(this.handleError<SoloTournament[]>('getSoloTournament', []))
    );
  }


  /** log a HeroService message with the MessageService */
  private log(message: string) {
    console.log(`tournamentService: ${message}`);
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
}
