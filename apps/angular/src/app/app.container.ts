import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'wrs-app-container',
  templateUrl: './app.container.html',
  styleUrls: ['./app.container.scss'],
  imports: [RouterModule],
  standalone: true,
})
export class AppContainer {}
