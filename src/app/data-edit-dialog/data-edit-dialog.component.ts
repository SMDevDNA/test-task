import { Component, inject, model} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,} from "@angular/material/dialog";
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';

@Component({
  selector: 'app-data-edit-dialog',
  standalone: true,
  imports: [MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,MatButtonModule],
  templateUrl: './data-edit-dialog.component.html',
  styleUrl: './data-edit-dialog.component.scss'
})
export class DataEditDialogComponent {
  readonly dialogRef = inject(MatDialogRef<DataEditDialogComponent>);
  readonly data = inject<any>(MAT_DIALOG_DATA);
  user = '';

  onNoClick(): void {
    this.dialogRef.close(this.user);
  }
}
