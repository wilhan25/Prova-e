# ProvaE

ProvaE é um aplicativo desenvolvido em Angular que facilita a criação, gerenciamento e aplicação de provas e questões. Este projeto foi gerado usando [Angular CLI](https://github.com/angular/angular-cli) versão 19.0.5.

## Funcionalidades

- **Cadastro de Usuários**: Permite que novos usuários se cadastrem no sistema.
- **Login de Usuários**: Autenticação de usuários para acessar o sistema.
- **Criação de Provas**: Ferramenta para criar novas provas com questões personalizadas.
- **Banco de Questões**: Acesso a um banco de questões para reutilização em diferentes provas.
- **Aplicação de Provas**: Funcionalidade para aplicar provas aos alunos.

## Servidor de Desenvolvimento

Para iniciar um servidor de desenvolvimento local, execute:

```bash
ng serve
```

Uma vez que o servidor estiver em execução, abra seu navegador e navegue até `http://localhost:4200/`. A aplicação será recarregada automaticamente sempre que você modificar qualquer um dos arquivos de origem.

## Estrutura do Projeto

- **src/app/components**: Contém os componentes do aplicativo, como login, cadastro, home, etc.
- **src/app/services**: Contém os serviços que lidam com a lógica de negócios e comunicação com o Firebase.
- **src/environments**: Contém as configurações de ambiente, incluindo as configurações do Firebase.

## Code Scaffolding

Angular CLI inclui ferramentas poderosas de scaffolding de código. Para gerar um novo componente, execute:

```bash
ng generate component component-name
```

Para uma lista completa de esquemas disponíveis (como `components`, `directives` ou `pipes`), execute:

```bash
ng generate --help
```

## Construção

Para construir o projeto, execute:

```bash
ng build
```

Os artefatos de construção serão armazenados no diretório `dist/`. Use a flag `--prod` para uma construção de produção.

## Executando Testes Unitários

Para executar os testes unitários via [Karma](https://karma-runner.github.io), execute:

```bash
ng test
```

## Executando Testes de Fim a Fim

Para executar os testes de fim a fim via [Protractor](http://www.protractortest.org/), execute:

```bash
ng e2e
```

## Contribuição

Se você deseja contribuir com este projeto, por favor, siga as diretrizes de contribuição.

## Licença

Este projeto está licenciado sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## Contato

Para mais informações, entre em contato com o desenvolvedor:

- **Nome**: Wilhan A
- **Email**: wilhan@example.com