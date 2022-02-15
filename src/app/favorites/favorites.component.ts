import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FetchApiDataService } from '../fetch-api-data.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {
  favorites: any[] = [];
  movies: any[] = [];

  constructor(public fetchApiData: FetchApiDataService, public snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getMovies();
  }

  /**
   * get an array of the user's favorite movies from user's data
   * @function getUserFavorites
   * @returns favorites in json format
   */
  getUserFavorites(): any {
    this.fetchApiData.getUserFavorites().subscribe((res: any) => {
      this.favorites = this.movies.filter(movie => res.includes(movie._id));
      return this.favorites;
    });
  }

  /**
   * use API end-point to delete user favorite
   * @function deleteFavoriteMovie
   * @param movie {any}
   * @returns updated user's favorite movies in json format
   */
  deleteFavorite(movie: any): void {
    this.fetchApiData.deleteFavoriteMovie(movie._id).subscribe((resp: any) => {
      this.favorites = resp;
      this.snackBar.open(`${movie.Title} has been removed from your favorites!`, 'Ok', { duration: 4000, panelClass: 'snack-style' });
      this.ngOnInit();
    }, (result) => {
      this.snackBar.open(`We couldn't unfavorite ${movie.Title}. Please try again`, 'Ok', {
        duration: 4000
      });
    });
    return this.getUserFavorites();
  }

  /**
   * use Api call to get data of all movies
   * @function getAllMovies
   * @return movies in json format
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      this.getUserFavorites();
      return this.movies;
    });
  }

}
