import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ProfileEditComponent } from '../profile-edit/profile-edit.component';
import { ProfileDeleteComponent } from '../profile-delete/profile-delete.component';
import { FavoritesComponent } from '../favorites/favorites.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  user: any = {};
  favoriteMovies: any[] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.getUserInfo();
    // this.getFavoriteMovies();
  }

  // call API end-point to get the user's information
  getUserInfo(): void {
    let user = JSON.parse(localStorage.getItem('user') || '');
    this.fetchApiData.getUser(user.Username).subscribe((resp: any) => {
      this.user = resp;
    });
  }

  //get user's FavoriteMovies from the user's data
  getFavoriteMovies(): void {
    let user = JSON.parse(localStorage.getItem('user') || '');
    this.fetchApiData.getUserFavorites().subscribe((resp: any) => {
      this.favoriteMovies = resp.FavoriteMovies;
      return this.favoriteMovies;
    });
  }
  openFavoritesDialog(): void {
    this.dialog.open(FavoritesComponent, {
      width: '100%',
    })
  }

  // Opens a dialog holding a form to edit the user's info
  openEditProfileDialog(): void {
    this.dialog.open(ProfileEditComponent, {
      width: '300px',
    });
  }

  //Opens a dialog asking the user if they want to proceed with the user deregistration
  deregisterUser(): void {
    this.dialog.open(ProfileDeleteComponent, {
      width: '300px',
      panelClass: 'delete-user-dialog',
    });
  }
}