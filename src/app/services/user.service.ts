import { Injectable } from '@angular/core';
import { Firestore, doc, getDoc, setDoc } from '@angular/fire/firestore';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userType: string = '';
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

  async getUserTypeByUid(uid: string): Promise<string | null> {
    try {
      const userDocRef = doc(this.firestore, 'Users', uid);
      const userDocSnap = await getDoc(userDocRef);
  
      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();
        return userData['tipo'] || null; // Retorna o campo "tipo" ou null se não existir
      } else {
        console.error('Usuário não encontrado no Firestore.');
        return null;
      }
    } catch (error) {
      console.error('Erro ao obter o tipo do usuário:', error);
      return null;
    }
  }

   setUserType(type: string): void {
    this.userType = type;
  }
  
  getUserType(): string {
    return this.userType;
  }
  
}
