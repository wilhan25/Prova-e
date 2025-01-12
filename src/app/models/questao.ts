export interface Questao {
    id: number;
    categoria: string;
    textoDaQuestao: string;
    alternativas: string[];
    respostaCorreta: string;
    alternativaEscolhida?: string;
}
