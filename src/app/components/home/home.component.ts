import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-home',
  imports: [FormsModule, MatButtonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {


  showFiller = false;

  userType: string = ''; // Variável para armazenar o tipo do usuário
  constructor(private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    this.userType = this.userService.getUserType();
    // Captura o estado enviado pelo roteador
    const state = this.router.getCurrentNavigation()?.extras.state as { userType: string };
    if (state && state.userType) {
      this.userType = state.userType; // Define o tipo de usuário
    }
  }
}
