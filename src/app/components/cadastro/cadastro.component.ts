import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-cadastro',
  imports: [FormsModule, CommonModule,ReactiveFormsModule],
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent {
  userForm: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService) {
    this.userForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', Validators.required],
      tipo: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      this.userService.addUser(this.userForm.value)
        .then(() => {
          console.log('Usuário salvo com sucesso!');
        })
        .catch((error) => {
          console.error('Erro ao salvar usuário:', error);
        });
    }
  }
}