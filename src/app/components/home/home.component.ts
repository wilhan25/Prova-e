import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [FormsModule, MatButtonModule,RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  showFiller = false;

}
