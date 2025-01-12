import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { FormularioComponent } from './components/formulario/formulario.component';
import { BancoQuestaoComponent } from './components/banco-questao/banco-questao.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent {
  title = 'Prova-e';
  showToolbar = true;

  constructor(private router: Router) {
    // Monitora as alterações na rota para controlar a exibição da toolbar
    this.router.events.subscribe(() => {
      this.showToolbar = this.router.url !== '/app-login'; // Esconde a toolbar na rota '/login'
    });
  }

}
