import { Injectable, Inject, PLATFORM_ID, NgZone } from '@angular/core';
import { Questao } from '../models/questao';
import { Firestore, collection, getDocs, doc, setDoc, deleteDoc, where, query } from '@angular/fire/firestore';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class QuestoesService {
  questaoEmEdicao: Questao | null = null;

  constructor(
    private firestore: Firestore,
    @Inject(PLATFORM_ID) private platformId: Object,
    private ngZone: NgZone
  ) {}

  async listarQuestoes(): Promise<Questao[]> {
    return this.ngZone.runOutsideAngular(async () => {
      try {
        const questoes: Questao[] = [];
        const questoesCollection = collection(this.firestore, 'questoes');
        const snapshot = await getDocs(questoesCollection);

        snapshot.forEach((doc) => {
          questoes.push(doc.data() as Questao);
        });

        // Salvar backup local (somente no navegador)
        if (isPlatformBrowser(this.platformId)) {
          localStorage.setItem('questoes', JSON.stringify(questoes));  // Só executa no navegador
        }

        return questoes;
      } catch (error) {
        console.error('Erro ao carregar questões do Firebase. Usando backup local:', error);
        return this.getQuestoesDoLocalStorage();
      }
    });
  }

  // Adicionar questão ao Firebase e atualizar backup local
  async adicionarQuestao(questao: Questao): Promise<void> {
    return this.ngZone.runOutsideAngular(async () => {
      try {
        const questaoId = String(questao.id);
        const questaoRef = doc(this.firestore, 'questoes', questaoId);
        await setDoc(questaoRef, questao);

        // Atualizar backup local (somente no navegador)
        const questoes = await this.listarQuestoes();
        questoes.push(questao);

        if (isPlatformBrowser(this.platformId)) {
          localStorage.setItem('questoes', JSON.stringify(questoes));  // Só executa no navegador
        }

        console.log('Questão adicionada com sucesso no Firebase e backup atualizado');
      } catch (error) {
        console.error('Erro ao adicionar questão no Firebase:', error);
        this.adicionarQuestaoNoLocalStorage(questao); // Salvar localmente como fallback
      }
    });
  }

  // Excluir questão no Firebase e atualizar backup local
  async excluirQuestao(id: number): Promise<void> {
    return this.ngZone.runOutsideAngular(async () => {
      try {
        const questaoId = String(id);
        const questaoRef = doc(this.firestore, 'questoes', questaoId);
        await deleteDoc(questaoRef);

        // Atualizar backup local (somente no navegador)
        const questoes = await this.listarQuestoes();
        const novasQuestoes = questoes.filter((q) => q.id !== id);

        if (isPlatformBrowser(this.platformId)) {
          localStorage.setItem('questoes', JSON.stringify(novasQuestoes));  // Só executa no navegador
        }

        console.log('Questão excluída com sucesso no Firebase e backup atualizado');
      } catch (error) {
        console.error('Erro ao excluir questão no Firebase:', error);
        this.excluirQuestaoNoLocalStorage(id); // Excluir localmente como fallback
      }
    });
  }

  // Atualizar questão no Firebase e no backup local
  async atualizarQuestao(questao: Questao): Promise<void> {
    return this.ngZone.runOutsideAngular(async () => {
      try {
        const questaoId = String(questao.id);
        const questaoRef = doc(this.firestore, 'questoes', questaoId);
        await setDoc(questaoRef, questao);

        // Atualizar backup local (somente no navegador)
        const questoes = await this.listarQuestoes();
        const index = questoes.findIndex((q) => q.id === questao.id);
        if (index !== -1) {
          questoes[index] = questao;

          if (isPlatformBrowser(this.platformId)) {
            localStorage.setItem('questoes', JSON.stringify(questoes));  // Só executa no navegador
          }
        }

        console.log('Questão atualizada com sucesso no Firebase e backup atualizado');
      } catch (error) {
        console.error('Erro ao atualizar questão no Firebase:', error);
        this.atualizarQuestaoNoLocalStorage(questao); // Atualizar localmente como fallback
      }
    });
  }

  // Métodos locais (backup)
  private getQuestoesDoLocalStorage(): Questao[] {
    if (isPlatformBrowser(this.platformId)) {
      const questoes = localStorage.getItem('questoes');
      return questoes ? JSON.parse(questoes) : [];
    }
    return [];
  }

  private adicionarQuestaoNoLocalStorage(questao: Questao): void {
    const questoes = this.getQuestoesDoLocalStorage();
    questoes.push(questao);

    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('questoes', JSON.stringify(questoes));  // Só executa no navegador
    }
  }

  private excluirQuestaoNoLocalStorage(id: number): void {
    const questoes = this.getQuestoesDoLocalStorage();
    const novasQuestoes = questoes.filter((q) => q.id !== id);

    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('questoes', JSON.stringify(novasQuestoes));  // Só executa no navegador
    }
  }

  public atualizarQuestaoNoLocalStorage(questao: Questao): void {
    const questoes = this.getQuestoesDoLocalStorage();
    const index = questoes.findIndex((q) => q.id === questao.id);
    if (index !== -1) {
      questoes[index] = questao;

      if (isPlatformBrowser(this.platformId)) {
        localStorage.setItem('questoes', JSON.stringify(questoes));  // Só executa no navegador
      }
    }
  }

  async listarQuestoesFirebase(): Promise<Questao[]> {
    return this.ngZone.runOutsideAngular(async () => {
      try {
        const querySnapshot = await getDocs(collection(this.firestore, 'questoes'));
        return querySnapshot.docs.map(doc => doc.data() as Questao);
      } catch (error) {
        console.error('Erro ao listar questões do Firebase:', error);
        return [];
      }
    });
  }

  async listarQuestoesPorCategoria(categoria: string): Promise<Questao[]> {
    return this.ngZone.runOutsideAngular(async () => {
      try {
        const questoes: Questao[] = [];
        const questoesCollection = collection(this.firestore, 'questoes');
        const q = query(questoesCollection, where('categoria', '==', categoria));
        const snapshot = await getDocs(q);

        snapshot.forEach((doc) => {
          questoes.push(doc.data() as Questao);
        });

        // Salvar backup local (somente no navegador)
        if (isPlatformBrowser(this.platformId)) {
          localStorage.setItem('questoes', JSON.stringify(questoes));  // Só executa no navegador
        }

        return questoes;
      } catch (error) {
        console.error('Erro ao carregar questões do Firebase. Usando backup local:', error);
        return this.getQuestoesDoLocalStorage();
      }
    });
  }
}