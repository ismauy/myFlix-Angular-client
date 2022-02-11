import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserProfileComponent } from '../user-profile/user-profile.component';
import { FavoritesComponent } from '../favorites/favorites.component';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {


  constructor(
    public dialog: MatDialog,
    public router: Router,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  /**
   * opens modal with user details
   */
  movies(): void {
    this.router.navigate(['movies']);
  }

  /**
   * Navigates to the profile page.
   */
  goToProfile(): void {
    this.dialog.open(UserProfileComponent, {
      width: '500px'
    });
  }

  goToFavourites(): void {
    this.dialog.open(FavoritesComponent, {
      width: '100%'
    });
  }


  logout(): void {
    localStorage.clear(); // Clears the local storage so the logged out user can no longer use protected routes
    this.snackBar.open("You've been logged out.", 'X', { duration: 4000, panelClass: 'snack-style' });
    this.router.navigate(['welcome']); // Navigates back to the welcome page so the user must log in again if they wish to continue to use the app   
  }

}