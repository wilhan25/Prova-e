import { Injectable } from '@angular/core';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private firestore: Firestore, private auth: Auth) {}

  async addUser(userData: { email: string; senha: string; tipo: string }) {
    try {
      // Cria o usuário no Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(
        this.auth,
        userData.email,
        userData.senha
      );
      const uid = userCredential.user.uid;

      // Salva os dados adicionais no Firestore
      await setDoc(doc(this.firestore, 'Users', uid), {
        email: userData.email,
        tipo: userData.tipo,
      });

      console.log('Usuário cadastrado com sucesso!');
    } catch (error) {
      console.error('Erro ao registrar usuário:', error);
      throw error;
    }
  }
}
