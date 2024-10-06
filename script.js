document.getElementById('turma').addEventListener('change', function() {
    const turma = document.getElementById('turma').value;
    carregarNomes(turma);
});

document.getElementById('nota-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const turma = document.getElementById('turma').value;
    const nomeSelecionado = document.getElementById('nome').value;
    const matriculaDigitada = document.getElementById('matricula').value.trim();

    if (nomeSelecionado === "" || matriculaDigitada === "") {
        alert("Por favor, selecione o nome e digite a matrícula.");
        return;
    }

    buscarNotas(turma, nomeSelecionado, matriculaDigitada);
});

function carregarNomes(turma) {
    const apiKey = 'AIzaSyCyMk8oxOqLk8TZQMM0L5QRjXswyz9lq-Q'; // API Key
    const sheetId = '1CfVpeZfa8aM_kv8uoO_iCbHN-Bz60u7TTQZTeJnfurk'; // ID da planilha
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${turma}!A:V?key=${apiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const linhas = data.values;

            if (!linhas || linhas.length === 0) {
                alert("Nenhum dado encontrado para essa turma.");
                return;
            }

            const selectNome = document.getElementById('nome');
            selectNome.innerHTML = '<option value="">Selecione um nome</option>';

            // Ignorar a primeira linha (cabeçalho) e garantir que a célula "Nome" seja ignorada
            linhas.forEach((linha, index) => {
                if (index !== 0 && linha.length >= 3 && linha[2].toLowerCase() !== 'nome') {
                    const nome = linha[2]; 
                    const matricula = linha[1];
                    if (nome && matricula) {
                        const option = document.createElement('option');
                        option.value = nome;
                        option.textContent = nome;
                        selectNome.appendChild(option);
                    }
                }
            });
        })
        .catch(error => {
            console.error("Erro ao carregar os nomes:", error);
            alert("Ocorreu um erro ao carregar os nomes. Tente novamente mais tarde.");
        });
}

function buscarNotas(turma, nome, matricula) {
    const apiKey = 'AIzaSyCyMk8oxOqLk8TZQMM0L5QRjXswyz9lq-Q'; // API Key
    const sheetId = '1CfVpeZfa8aM_kv8uoO_iCbHN-Bz60u7TTQZTeJnfurk'; // ID da planilha
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${turma}!A:V?key=${apiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const linhas = data.values;
            let encontrou = false;
            let resultadoHTML = "";

            linhas.forEach(linha => {
                if (linha.length >= 4) {
                    const matriculaColuna = linha[1] ? linha[1].trim() : null;
                    const nomeColuna = linha[2] ? linha[2].trim().toLowerCase() : null;

                    if (matriculaColuna === matricula && nomeColuna === nome.toLowerCase()) {
                        const notas = linha.slice(5, 22).filter(nota => nota !== ""); // Ignora notas vazias
                        const penultimaNota = notas.splice(notas.length - 2, 1); 
                        const ultimaNota = notas.pop(); // A última nota é a Nota Final AH

                        // Exibe as atividades e a Nota Final AH
                        buscarTarefas(turma, notas, ultimaNota, resultadoHTML);
                        encontrou = true;
                    }
                }
            });

            if (!encontrou) {
                resultadoHTML += "<p>Não encontramos nenhuma nota para este aluno.</p>";
                document.getElementById('resultado').innerHTML = resultadoHTML;
            }

        })
        .catch(error => {
            console.error("Erro ao buscar notas:", error);
            document.getElementById('resultado').innerHTML = "<p>Ocorreu um erro ao buscar as notas. Tente novamente mais tarde.</p>";
        });
}

function buscarTarefas(turma, notas, ultimaNota, resultadoHTML) {
    const apiKey = 'AIzaSyCyMk8oxOqLk8TZQMM0L5QRjXswyz9lq-Q'; // API Key
    const sheetId = '1CfVpeZfa8aM_kv8uoO_iCbHN-Bz60u7TTQZTeJnfurk'; // ID da planilha

    const paginasTarefas = {
        "9EF": "9EF TAREFAS",
        "1EM": "1EM TAREFAS",
        "2EM": "2EM TAREFAS",
        "3EM": "3EM TAREFAS"
    };

    const abaTarefas = paginasTarefas[turma];
    const urlTarefas = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${abaTarefas}!A:B?key=${apiKey}`;

    fetch(urlTarefas)
        .then(response => response.json())
        .then(data => {
            const linhas = data.values;

            if (ultimaNota) {
                resultadoHTML += `<p><strong>Nota Final AH:</strong> <strong>${ultimaNota}</strong></p>`;
            }

            resultadoHTML += "<h3>Atividades:</h3>";

            if (linhas && linhas.length > 1) {
                // Exibe a explicação de cada atividade com sua respectiva nota em negrito
                linhas.slice(1).forEach((linha, index) => {
                    const descricaoAtividade = linha[0];
                    const explicacaoAtividade = linha[1];
                    const nota = notas[index] ? notas[index] : "Sem nota";

                    resultadoHTML += `<p class="atividade-texto"><strong>${descricaoAtividade}:</strong> ${explicacaoAtividade} - Nota: <strong>${nota}</strong></p>`;
                });
            } else {
                resultadoHTML += "<p>Nenhuma tarefa encontrada.</p>";
            }

            document.getElementById('resultado').innerHTML = resultadoHTML;
        })
        .catch(error => {
            console.error("Erro ao buscar tarefas:", error);
            document.getElementById('resultado').innerHTML += "<p>Ocorreu um erro ao buscar as tarefas.</p>";
        });
}
