# Sistema de Consulta de Notas de Atividades Híbridas (AH)

Este é um sistema de consulta de notas de atividades híbridas (AH) desenvolvido para os alunos do 9º ano do ensino fundamental e do ensino médio, orientados pela **Professora Giovanna Lepore**. O sistema é baseado em dados extraídos de uma planilha do Google Sheets, onde os alunos podem consultar suas notas de acordo com a turma, nome e matrícula.

## Funcionalidades

- Seleção de turma, nome do aluno e matrícula.
- Consulta das notas de atividades correspondentes a cada aluno.
- Exibição da **Nota Final AH** em destaque.
- Exibição das atividades com explicações detalhadas e notas respectivas.
- Interface responsiva e estilizada com cores e fontes agradáveis.

## Estrutura do Projeto

O projeto é composto pelos seguintes arquivos:

- **index.html**: Página principal do sistema.
- **style.css**: Arquivo de estilos (CSS) para a personalização do layout e visual do site.
- **script.js**: Arquivo de lógica (JavaScript) responsável pela interação com a planilha do Google Sheets e pela exibição dos dados.
- **wallpaper.jpg**: Imagem de fundo utilizada no site.

## Como Funciona

1. O aluno seleciona a turma no menu suspenso.
2. Após selecionar a turma, os nomes dos alunos dessa turma são carregados automaticamente no campo "Nome do aluno".
3. O aluno seleciona seu nome e insere sua matrícula.
4. O sistema consulta as notas e atividades correspondentes e as exibe na página, incluindo a **Nota Final AH** em destaque.

## Dependências

Para que o sistema funcione corretamente, é necessário:

- **Google Sheets API**: Utilizamos a API do Google Sheets para obter os dados das planilhas.
  - O projeto requer uma chave de API válida. No arquivo `script.js`, a chave da API do Google deve ser substituída pela sua chave válida:
    ```js
    const apiKey = 'SUA_CHAVE_DE_API';
    ```

- **Estrutura da Planilha**: As planilhas devem estar organizadas da seguinte maneira:
  - Cada turma tem uma aba específica com os dados de notas e alunos (exemplo: `9EF`, `1EM`, etc.).
  - As atividades e suas explicações estão em abas separadas (exemplo: `9EF_TAREFAS`, `1EM_TAREFAS`, etc.).
  - As colunas `A` e `B` das abas de tarefas devem conter a descrição e explicação da atividade, respectivamente.

## Estrutura da Planilha

1. **Aba de Notas (por turma)**:
   - Coluna A: Turma
   - Coluna B: Matrícula do aluno
   - Coluna C: Nome do aluno
   - Colunas D até V: Notas das atividades e Nota Final AH

2. **Aba de Tarefas (por turma)**:
   - Coluna A: Descrição da atividade
   - Coluna B: Explicação da atividade

## Exemplo de Código

### index.html
```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Consulta Notas AH</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <header>
        <h1>CONSULTA NOTAS ATIVIDADES HÍBRIDAS (AH)<br>PROFESSORA GIOVANNA LEPORE - FÍSICA</h1>
    </header>

    <form id="nota-form">
        <label for="turma">Selecione uma turma:</label>
        <select id="turma">
            <option value="">Selecione uma turma</option>
            <option value="9EF">9EF</option>
            <option value="1EM">1EM</option>
            <option value="2EM">2EM</option>
            <option value="3EM">3EM</option>
        </select>

        <label for="nome">Nome do aluno:</label>
        <select id="nome">
            <option value="">Selecione um nome</option>
        </select>

        <label for="matricula">Matrícula do aluno:</label>
        <input type="text" id="matricula" placeholder="Digite a matrícula">

        <button type="submit">Consultar Notas</button>
    </form>

    <div id="resultado"></div>

    <footer>
        PROFESSORA GIOVANNA LEPORE
    </footer>

    <script src="script.js"></script>
</body>
</html>
