import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataEditDialogComponent } from './data-edit-dialog.component';

describe('DataEditDialogComponent', () => {
  let component: DataEditDialogComponent;
  let fixture: ComponentFixture<DataEditDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataEditDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
