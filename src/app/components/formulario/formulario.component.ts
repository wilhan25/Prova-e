import { Component } from '@angular/core';
import { Questao } from '../../models/questao';
import { QuestoesService } from '../../services/questoes.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  imports: [FormsModule, CommonModule],
  styleUrls: ['./formulario.component.scss']
})
export class FormularioComponent {
  // Inicializar a nova questão com valores padrão
  novaQuestao: Questao = {
    id: 0,
    categoria: '',
    textoDaQuestao: '',
    alternativas: ['', '', '', '', ''], // Alternativas A, B, C, D, E
    respostaCorreta: '' // A resposta correta será a chave selecionada
  };

  categorias: string[] = ['Matemática', 'Português', 'Física', 'Química', 'Biologia', 'História', 'Geografia', 'Filosofia', 'Sociologia', 'Educação Física', 'Artes', 'Inglês'];

  constructor(private questoesService: QuestoesService) { }

  ngOnInit(): void {
    // Se uma questão está sendo editada, preenche os campos do formulário com os dados da questão
    if (this.questoesService.questaoEmEdicao) {
      this.novaQuestao = { ...this.questoesService.questaoEmEdicao }; // Preencher os campos com os dados da questão em edição
      this.questoesService.questaoEmEdicao = null; // Limpar a questão em edição após preencher os campos
    }
  }

  // Adicionar questão (localStorage + Firebase)
  adicionarQuestao(): void {
    if (this.novaQuestao.id === 0) {
      // Se a questão não tem ID (nova questão), cria um novo ID
      this.novaQuestao.id = Date.now(); // Gera um ID único

      // Salva a questão tanto no localStorage quanto no Firebase
      this.questoesService.adicionarQuestao(this.novaQuestao); // true para salvar no Firebase e no localStorage
    } else {
      // Se a questão tem ID (questão existente), deve ser alterada
      this.questoesService.atualizarQuestaoNoLocalStorage(this.novaQuestao); // Atualiza a questão existente no localStorage
      this.questoesService.atualizarQuestao(this.novaQuestao); // Atualiza a questão existente no Firebase
    }

    this.limparCampos(); // Limpa os campos após a operação
  }

  // Limpar os campos do formulário
  limparCampos(): void {
    this.novaQuestao = {
      id: 0,
      categoria: '',
      textoDaQuestao: '',
      alternativas: ['', '', '', '', ''],
      respostaCorreta: ''
    };
  }
}
