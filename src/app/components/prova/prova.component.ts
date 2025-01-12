import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { QuestoesService } from '../../services/questoes.service';
import { Questao } from '../../models/questao';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-prova',
  imports: [MatCardModule, MatRadioModule, FormsModule, CommonModule],
  templateUrl: './prova.component.html',
  styleUrl: './prova.component.scss'
})
export class ProvaComponent implements OnInit {
  questions: Questao[] = [];
  categorias: string[] = ['Matemática', 'Português', 'Física', 'Química', 'Biologia', 'História', 'Geografia', 'Filosofia', 'Sociologia', 'Educação Física', 'Artes', 'Inglês'];
  categoriaSelecionada: string = '';
  numeroQuestoes: number = 3; // Valor padrão

  constructor(private questoesService: QuestoesService) {}

  ngOnInit() {}

  async onCategoriaChange() {
    if (this.categoriaSelecionada) {
      const allQuestions = await this.questoesService.listarQuestoesPorCategoria(this.categoriaSelecionada);
      this.questions = this.getRandomQuestions(allQuestions, this.numeroQuestoes);
    }
  }

  getRandomQuestions(questions: Questao[], count: number): Questao[] {
    const shuffled = questions.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }

  getAlternativaLetra(index: number): string {
    const letras = ['A', 'B', 'C', 'D', 'E'];
    return letras[index] || '';  // Retorna a letra correspondente (A, B, C, D, E)
  }

  getAlternativaLetraForDisplay(alternativaEscolhida: string): string {
    const letras = ['A', 'B', 'C', 'D', 'E'];
    const index = this.questions[0].alternativas.indexOf(alternativaEscolhida);
    return letras[index] || '';  // Retorna a letra correspondente à alternativa escolhida
  }
}