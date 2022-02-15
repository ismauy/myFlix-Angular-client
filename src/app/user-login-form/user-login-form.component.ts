import { Component, OnInit, Input } from '@angular/core';
// used to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';

// This import brings in the API calls for endpoints
import { FetchApiDataService } from '../fetch-api-data.service';

// used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';


@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})

export class UserLoginFormComponent implements OnInit {

  @Input() userCredentials = { Username: '', Password: '' };


  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    public router: Router,
  ) { }

  ngOnInit(): void {
  }

  /**
   * use API end-point to login the user by getting data from the input.
   * Then stores the user's data in localstorage
   * @function userLogin
   */
  loginUser(): void {
    this.fetchApiData.userLogin(this.userCredentials).subscribe((response) => {
      // Logic for a successful user login
      this.dialogRef.close();// This will close the modal on success!
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
      this.snackBar.open('user logged in', 'OK', { duration: 500 });
      this.router.navigate(['movies']);
    }, (response) => {
      this.snackBar.open(response, 'OK', { duration: 500 });
    });
  }

}