import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'wrs-home-page',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  imports: [RouterModule],
  standalone: true,
})
export class HomePage {}
