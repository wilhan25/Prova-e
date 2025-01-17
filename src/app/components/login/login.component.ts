import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { CommonModule } from '@angular/common';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(public auth: AngularFireAuth, private router: Router, private userService: UserService) { }

  async onSubmit() {
    try {
      const result = await this.auth.signInWithEmailAndPassword(this.email, this.password);

      if (result.user) { // Verifica se result.user existe
        const uid = result.user.uid;

        // Chama o serviço para obter o tipo do usuário
        const userType = await this.userService.getUserTypeByUid(uid);

        if (userType) {
          console.log('Usuário autenticado com sucesso:', userType);
          alert(`Usuário autenticado como ${userType}.`);
          // Armazena o tipo de usuário no serviço global
        this.userService.setUserType(userType);
          
          this.router.navigate(['/app-home']);

        } else {
          console.error('Tipo de usuário não encontrado.');
          alert('Erro ao determinar o tipo de usuário.');
        }
      } else {
        console.error('Usuário não autenticado corretamente.');
        alert('Erro ao autenticar o usuário.');
      }
    } catch (error) {
      console.error('Erro ao autenticar usuário:', error);
      alert('Usuário ou senha inválidos.');
    }
  }
}
