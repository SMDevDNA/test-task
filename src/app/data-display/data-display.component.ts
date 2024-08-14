import {Component, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {MatDialogModule, MatDialog} from "@angular/material/dialog";
import {DataEditDialogComponent} from "../data-edit-dialog/data-edit-dialog.component";
import {DataService, Data} from "../services/data.service";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-data-display',
  standalone: true,
  imports: [ CommonModule,
    MatTableModule,
    MatDialogModule,
    MatButtonModule
  ],
  templateUrl: './data-display.component.html',
  styleUrl: './data-display.component.scss'
})

export class DataDisplayComponent implements OnInit {
  users: Data[] = [];
  displayedColumns: string[] = ['id', 'name', 'email', 'actions'];
  private subscription: Subscription = new Subscription();

  constructor(private dataService: DataService, private dialog: MatDialog) {}

  ngOnInit() {
    this.subscription.add(
      this.dataService.data$.subscribe({
        next: (users) => {
          this.users = users;
        },
        error: (error) => console.error('Cant load data', error)
      })
    );

    this.subscription.add(
      this.dataService.getData().subscribe({
        error: (error) => console.error('Cant load data', error)
      })
    );
  }

  openDialog(user?: Data) {
    const dialogRef = this.dialog.open(DataEditDialogComponent, {
      width: '250px',
      data: user ? {...user} : {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.id) {
          this.dataService.updateUser(result);
        } else {
          this.dataService.createUser(result);
        }
      }
    });
  }

  deleteUser(id: number) {
    this.dataService.deleteUser(id);
  }
}
