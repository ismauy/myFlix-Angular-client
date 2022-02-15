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
  }

  /**
   * call API end-point to get the user's information
   * @function getUser
   */
  getUserInfo(): void {
    let user = JSON.parse(localStorage.getItem('user') || '');
    this.fetchApiData.getUser(user.Username).subscribe((resp: any) => {
      this.user = resp;
    });
  }

  /**
   * get user's FavoriteMovies from the user's data
   * @function getUserFavorites
   * @return user's data in json format
   */
  getFavoriteMovies(): void {
    this.fetchApiData.getUserFavorites().subscribe((resp: any) => {
      this.favoriteMovies = resp.FavoriteMovies;
      return this.favoriteMovies;
    });
  }

  /**
   * open a dialog to edit the user profile
   * @module EditProfileFormComponent
   */
  openEditProfileDialog(): void {
    this.dialog.open(ProfileEditComponent, {
      width: '300px',
    });
  }
}