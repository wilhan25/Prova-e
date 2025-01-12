import { Component, OnInit } from '@angular/core';
import { Questao } from '../../models/questao';
import { QuestoesService } from '../../services/questoes.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-banco-questao',
  imports: [CommonModule, RouterModule],
  templateUrl: './banco-questao.component.html',
  styleUrls: ['./banco-questao.component.scss']
})
export class BancoQuestaoComponent implements OnInit {
  questoes: Questao[] = [];

  constructor(private questoesService: QuestoesService) { }

  ngOnInit(): void {
    this.carregarQuestoes(); // Chama o método para carregar as questões assim que o componente for inicializado
  }

  // Função para carregar as questões do Firebase e localStorage
  async carregarQuestoes(): Promise<void> {
    try {
      // Recupera as questões do Firebase
      const questoesFirebase: Questao[] = await this.questoesService.listarQuestoesFirebase();
  
      // Recupera as questões do localStorage
      const questoesLocalStorage: Questao[] = await this.questoesService.listarQuestoes();
  
      // Combine as questões do Firebase e do localStorage, garantindo que não haja duplicatas
      const questoesUnicas = [...questoesFirebase, ...questoesLocalStorage].filter((questao, index, self) =>
        index === self.findIndex((q) => q.id === questao.id)
      );
  
      this.questoes = questoesUnicas; // Atualiza a lista com as questões únicas
    } catch (error) {
      console.error('Erro ao carregar questões:', error);
      this.questoes = []; // Caso haja algum erro, inicializa um array vazio
    }
  }
  

  // Função para excluir a questão
  excluirQuestao(id: number): void {
    this.questoesService.excluirQuestao(id);
    this.carregarQuestoes(); // Recarrega as questões após a exclusão
  }

  // Função para alterar a questão
  alterarQuestao(questao: Questao): void {
    this.questoesService.questaoEmEdicao = questao; // Armazenar a questão a ser editada
  }
}
