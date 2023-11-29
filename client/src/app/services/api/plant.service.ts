import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Plant } from '@models/plant';

@Injectable({
  providedIn: 'root'
})
export class PlantService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  async getPlantById(plantId: number | string) {
    return this.http.get<Plant>(`${this.apiUrl}/plants/${plantId}`).pipe(
      catchError(this.handleError<Plant>("getPlantById"))
    );
  }

  async getAllPlants() {
    return this.http.get<Plant[]>(`${this.apiUrl}/plants`).pipe(
      catchError(this.handleError<Plant[]>("getAllPlants"))
    );
  }

  async searchPlant(query: string) {
    return this.http.get<Plant[]>(`${this.apiUrl}/plants/search?query=${query}`).pipe(
      catchError(this.handleError<Plant[]>("getAllPlants"))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }

  private log(message: string) {
    console.log(message);
  }
}
