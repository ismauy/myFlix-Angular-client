import { Component, OnInit, Inject } from '@angular/core';
// an injection token that allows access to data passed in to a dialog.
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.scss']
})
export class DescriptionComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { title: string, description: string }
  ) { }

  ngOnInit(): void {
  }

}