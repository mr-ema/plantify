import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { Bookmark, Plant } from '@models/api';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class PlantService {
  private _apiUrl = environment.apiUrl;
  private _userId: string = "1"; // For testing use a user id and a jwt_token in the future

  constructor(private _http: HttpClient) { }

  public async getPlantById(plantId: string) {
    return this._http.get<Plant>(`${this._apiUrl}/plants/${plantId}`).pipe(
      catchError(this._handleError<Plant>("getPlantById"))
    );
  }

  public async getAllPlants() {
    return this._http.get<Plant[]>(`${this._apiUrl}/plants`).pipe(
      catchError(this._handleError<Plant[]>("getAllPlants"))
    );
  }

  public async searchPlant(query: string) {
    return this._http.get<Plant[]>(`${this._apiUrl}/plants/search?query=${query}`).pipe(
      catchError(this._handleError<Plant[]>("searchPlant"))
    );
  }

  public async getBookmarkedPlant(plantId: string) {
    return this._http.get<Bookmark>(`${this._apiUrl}/users/${this._userId}/bookmarks/plants/${plantId}`).pipe(
      catchError(this._handleError<Bookmark>("getBookmarkedPlant"))
    );
  }

  public async getAllBookmarkedPlants() {
    return this._http.get<Bookmark[]>(`${this._apiUrl}/users/${this._userId}/bookmarks/plants`).pipe(
      catchError(this._handleError<Bookmark[]>("getAllBookmarkedPlant"))
    );
  }

  public async togglePlantBookmark(plant: Plant, newValue: boolean) {
    return this._http.put<Bookmark>(
      `${this._apiUrl}/users/${this._userId}/bookmarks`,
      {
        entity_id: plant.id,
        entity_type: 'plant',
        is_bookmarked: newValue
      },
      httpOptions
    ).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 404) {
          return this._createPlantBookmark(plant);
        }

        return this._handleError<any>("togglePlantBookmark")(error);
      })
    );
  }

  private _createPlantBookmark(plant: Plant) {
    return this._http.post<any>(
      `${this._apiUrl}/users/${this._userId}/bookmarks`,
      {
        bookmark_name: plant.name,
        entity_id: plant.id,
        entity_type: 'plant'
      },
      httpOptions
    ).pipe(
      catchError(this._handleError<any>("createPlantBookmark"))
    );
  }

  private _handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this._log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }

  private _log(message: string) {
    console.debug(message);
  }
}
