import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

//Declaring the api url that will provide data for the client app
const apiUrl = 'https://ismauy-myflix.herokuapp.com/';
@Injectable({
  providedIn: 'root'
})

export class FetchApiDataService {
  constructor(private http: HttpClient) {
  }

  /**
   * call API end-point to register a new user
   * @param userDetails {any}
   * @returns a new user object in json format
   */
  public userRegistration(userDetails: any): Observable<any> {
    return this.http.post(apiUrl + 'users', userDetails, {
      headers: new HttpHeaders(
        {
          "Content-Type": 'application/json',
        })
    }).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * call API end-point to log in a user
   * @param userCredentials {any}
   * @returns user's data in json format
   */
  public userLogin(userCredentials: any): Observable<any> {
    return this.http.post(apiUrl + 'login', userCredentials).pipe(
      catchError(this.handleError)
    );
  }

  /**
    * call API end-point to get all movies
    * @return array of movies object in json format
    */
  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies', {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * call API end-point to get a specific movie by Title
   * @param title {any}
   * @returns a movie object in json format
   */
  getMovie(title: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/' + title, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * call API end-point to get a director data by dirctor's name
   * @param name {any}
   * @returns a director's data in json format
   */
  getDirector(name: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'directors/' + name, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * call API end-point to get a genre data
   * @param name {any}
   * @returns a genre data in json format
   */
  getGenre(name: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'genres/' + name, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * call API end-point to get a user's informations
   * @param username {any}
   * @returns a user's information in json format
   */
  getUser(username: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'users/' + username, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * call API end-point to get a user's favorite movies list
   * @returns a list of the user's favorite movies in json format
   */
  getUserFavorites(): Observable<any> {
    const token = localStorage.getItem('token');
    let user = JSON.parse(localStorage.getItem('user') || '');
    return this.http.get(apiUrl + 'users/' + user._id + '/favorites', {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * call API end-point to add a movie to the user's favorite list
   * @param movieId {any}
   * @returns the user's favorite list in json format
   */
  addFavoriteMovie(movieId: any): Observable<any> {
    let user = JSON.parse(localStorage.getItem('user') || '');
    const token = localStorage.getItem('token');
    return this.http.patch(apiUrl + 'users/' + user._id + '/favorites/' + movieId, '', {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * call API end-point to edit the user's informations
   * @param userDetails {any}
   * @returns updated user's informations in json format
   */
  editUser(userDetails: any): Observable<any> {
    let user = JSON.parse(localStorage.getItem('user') || '');
    const token = localStorage.getItem('token');
    return this.http.put(apiUrl + 'users/' + user._id, userDetails, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * call API end-point to delete the current user
   * @returns delete status
   */
  deleteUser(): Observable<any> {
    let user = JSON.parse(localStorage.getItem('user') || '');
    const token = localStorage.getItem('token');
    return this.http.delete(apiUrl + 'users/' + user._id, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * call API end-point to delete a user's favorite movie
   * @param movieId {any}
   * @returns updated user's information after removed a movie from the list in json format
   */
  deleteFavoriteMovie(movieId: any): Observable<any> {
    let user = JSON.parse(localStorage.getItem('user') || '');
    const token = localStorage.getItem('token');
    return this.http.delete(apiUrl + 'users/' + user._id + '/favorites/' + movieId, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): any {
    console.log(error);
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error.errors}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }

  /**
   * Non-typed response extracttion
   * @param res {any}
   * @returns response || empty object
   */
  private extractResponseData(res: any): any {
    const body = res;
    return body || {};
  }

}

