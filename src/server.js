import http from 'http';

const array_infos = [{id_chamado: 1, nome_solicitante: "Joana Fragoso", 
    descricao: "Reinicializações Inesperadas", 
    prioridade: "alta"}]; //responsável por armazenar chamados.

let incrementoId = 2

const server = http.createServer((req, res) => { // Cria o servidor e define a função para cada requisição

  if (req.method === "GET" && req.url === "/health") { // Verifica rota GET /health
    res.writeHead(200, { "Content-Type": "application/json" }); // Define status 200 e tipo JSON
    res.end(JSON.stringify({ status: "ok" })); // Envia JSON e encerra
    return; // Interrompe execução
  }

  if (req.method === "GET" && req.url.startsWith("/chamados")) { // Verifica rota GET /chamados 
    res.writeHead(200, { "Content-Type": "application/json" }); // Define status 200 e tipo JSON
    res.end(JSON.stringify(array_infos)); // Retorna lista de chamados registrados em array_infos
    return; // Interrompe execução
  }

  if (req.method === "GET") {
    const fatiaUrl = req.url.split("/chamados/")
  
    if (fatiaUrl.length === 2 && fatiaUrl[2] !== "") {
      const id = Number(fatiaUrl[2]);

      //verifica se não é valor numérico
      if (isNaN(id)) { 
        res.writeHead(400, {"content-type": "application/json"}); //Define status 400 e tipo JSON 
        res.end(JSON.stringify({erro: "Bad Request"})); // Mensagem de erro
        return;
      };

      const chamado = array_infos.find(chamados => chamados.id_chamado == id) //percorre o array_infos atrás do ID informado
      
      // verifica se o ID é inexistente
      if (!chamado) { 
        res.writeHead(404, {"Content-Type": "application/json"}); // Define status 400 e tipo JSON 
        res.end(JSON.stringify({erro: "Chamado não encontrado"})); // Mensagem de erro
        return;
      };

      res.writeHead(200, {"Content-Type": "application/json"}); // Define status 200 e tipo JSON
      res.end(JSON.stringify({chamado})) // Retorna o chamado de acordo com o ID fornecido
      return;

    }
  }

  res.end(); // Finaliza resposta
});

server.listen(3000, () => { // Inicia o servidor na porta 3000
  console.log("Servidor HTTP executando na porta 3000"); // Log informativo
});