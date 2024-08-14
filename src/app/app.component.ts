import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {DataDisplayComponent} from "./data-display/data-display.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, DataDisplayComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'my-test-app';
}
