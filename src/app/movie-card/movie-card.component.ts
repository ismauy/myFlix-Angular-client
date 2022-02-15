// src/app/movie-card/movie-card.component.ts
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DescriptionComponent } from '../description/description.component';
import { DirectorComponent } from '../director/director.component';
import { FetchApiDataService } from '../fetch-api-data.service'
import { GenreComponent } from '../genre/genre.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent {
  movies: any[] = [];
  favorites: any[] = [];
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getMovies();
    this.getUserFavorites();
  }

  /**
   * use Api call to get data of all movies
   * @function getAllMovies
   * @return movies in json format
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      return this.movies;
    });
  }

  /**
    *open a dialog to display the GenreComponent
    * @param name {string}
    * @param description {string}
    */
  openGenreDialog(name: string, description: string): void {
    this.dialog.open(GenreComponent, {
      data: { name: name, description: description },
      width: '450px'
    });
  }

  /**
    * open a dialog to display the DirectorComponent
    * @param name {string}
    * @param bio {string}
    * @param birth {string}
    */
  openDirectorDialog(name: string, bio: string, birth: string): void {
    this.dialog.open(DirectorComponent, {
      data: { name: name, bio: bio, birth: birth },
      width: '450px'
    });
  }

  /**
     * open a dialog to display the DescriptionComponent
     * @param title {string}
     * @param description {string}
     */
  openDescriptionDialog(title: string, description: string): void {
    this.dialog.open(DescriptionComponent, {
      data: { title: title, description: description },
      width: '450px'
    });
  }

  /**
   * check if the movie is the user's favorite
   * @param movieId {string}
   * @returns true or false
   */
  isFavorite(movieId: string): boolean {
    return this.favorites.includes(movieId);
  }

  /**
   * toggle add/remove user's favorite function.
   * if the movie is not favorite, call
   * @function addFavoriteMovie
   * if the movie is favorite, call
   * @function deleteFavoriteMovie
   * @param movie {any}
   */
  toggleFavorite(movie: any): void {
    this.isFavorite(movie._id)
      ? this.deleteFavoriteMovie(movie._id, movie.Title)
      : this.addFavoriteMovie(movie._id, movie.Title);
  }

  /**
   * use API end-point to delete user favorite
   * @function deleteFavoriteMovie
   * @param movieId {string}
   * @param title {string}
   * @returns updated user's data in json format
   */
  deleteFavoriteMovie(movieId: string, title: string): void {
    this.fetchApiData.deleteFavoriteMovie(movieId).subscribe((resp: any) => {
      this.favorites = resp;
      this.snackBar.open(`${title} has been removed from your favorites!`, 'Ok', { duration: 4000, panelClass: 'snack-style' });
      this.ngOnInit();
    }, (result) => {
      this.snackBar.open(`We couldn't unfavorite ${title}. Please try again`, 'Ok', {
        duration: 4000
      });
    });
    return this.getUserFavorites();
  }

  /**
   * get an array of the user's favorite movies from user's data
   * @function getUserFavorites
   * @returns favorites in json format
   */
  getUserFavorites(): any {
    this.fetchApiData.getUserFavorites().subscribe((res: any) => {
      this.favorites = res;
      return this.favorites;
    });
  }

  /**
   * use API end-point to add user favorite movie
   * @function addFavoriteMovie
   * @param movieId {string}
   * @param title {string}
   * @returns an array of the movie object in json format
   */
  addFavoriteMovie(movieId: string, title: string): void {
    this.fetchApiData
      .addFavoriteMovie(movieId)
      .subscribe((res: any) => {
        this.snackBar.open(
          `${title} has been added to your favorite movies! ✔️`,
          'Cool',
          {
            duration: 4000,
          }
        );
        this.ngOnInit();
      });
    return this.getUserFavorites();
  }

}