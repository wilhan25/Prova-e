import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { CommonModule } from '@angular/common';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(public auth: AngularFireAuth, private router: Router) {}

  async onSubmit() {
    try {
      const result = await this.auth.signInWithEmailAndPassword(this.email, this.password);
      console.log('Usuário autenticado com sucesso:', result);
      alert('Usuário autenticado com sucesso!');
      this.router.navigate(['/app-home']); // Redireciona para o componente Home
    } catch (error) {
      console.error('Erro ao autenticar usuário:', error);
      alert('Usuário ou senha inválidos.');
    }
  }
}