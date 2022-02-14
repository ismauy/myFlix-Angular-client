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

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      return this.movies;
    });
  }

  openGenreDialog(name: string, description: string): void {
    this.dialog.open(GenreComponent, {
      data: { name: name, description: description },
      width: '450px'
    });
  }

  openDirectorDialog(name: string, bio: string, birth: string): void {
    this.dialog.open(DirectorComponent, {
      data: { name: name, bio: bio, birth: birth },
      width: '450px'
    });
  }

  openDescriptionDialog(title: string, description: string): void {
    this.dialog.open(DescriptionComponent, {
      data: { title: title, description: description },
      width: '450px'
    });
  }

  isFavorite(movieId: string): boolean {
    return this.favorites.includes(movieId);
  }

  // Toggles the heart shaped icon from full to empty, and invokes the method to add or remove a function from the user's list of favorites
  toggleFavorite(movie: any): void {
    this.isFavorite(movie._id)
      ? this.deleteFavoriteMovie(movie._id, movie.Title)
      : this.addFavoriteMovie(movie._id, movie.Title);
  }

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

  getUserFavorites(): any {
    this.fetchApiData.getUserFavorites().subscribe((res: any) => {
      this.favorites = res;
      return this.favorites;
    });
  }

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