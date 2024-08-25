import salvarFilmeService from "../service/filme/salvarFilmeService.js";
import consultarFilmesService from "../service/filme/consultarFilmesService.js";
import consultarFilmePorIdService from "../service/filme/consultarFilmePorIdService.js";
import alterarFilmeService from "../service/filme/alterarFilmeService.js";
import deletarFilmeService from "../service/filme/deletarFilmeService.js";
import alterarCapaFilmeService from "../service/filme/alterarCapaFilmeService.js";

import multer from "multer"; // transforma o arquivo em varios pedacionhos

import { Router } from "express";
const endpoints = Router()


endpoints.post('/filme', async (req, resp) => {
    try {
        let filmeObj = req.body; // le o body completo 
        let id = await salvarFilmeService(filmeObj); //envia pra camada de processamento / service

        resp.send({ //response
            id: id
        })
    }
    catch (err) { // tratamento de dados
        logErro(err);
        resp.status(400).send(criarErro(err));
    }
})


endpoints.get('/filme', async (req, resp) => {
    try {
        // leitura
        let nome = req.query.nome;

        // processamento (service)
        let linhas = await consultarFilmesService(nome);

        // saída
        resp.send(linhas);
    }
    catch (err) {
        logErro(err);
        resp.status(400).send(criarErro(err));
    }
})

endpoints.get('/filme/:id', async (req, resp) => {
    try {
        let id = req.params.id;

        let filme = await consultarFilmePorIdService(id);

        resp.send(filme);

    } catch (err) {
        logErro(err);
        resp.status(400).send(criarErro(err));
    }
})


endpoints.put('/filme/:id', async (req, resp) => {
    try {
        // ler entradas
        let filmeObj = req.body;
        let id = req.params.id;

        // processamento
        // como n tem retorno só colocar await
        await alterarFilmeService(filmeObj, id);

        // saída
        resp.status(204).send()
    } 
    catch (err) {
        logErro(err);
        resp.status(400).send(criarErro(err));
    }
})



endpoints.delete('/filme/:id', async (req,resp) => {
    try {
        // entrada
        let id = req.params.id;

        // processamento
        await deletarFilmeService(id)

        // saída 
        resp.status(204).send();    
    }
    catch (err) {
        logErro(err);
        resp.status(400).send(criarErro(err));
    }
})

let uploadCapa = multer({ dest: './storage/capa'}) // destino 

endpoints.put('/filme/:id/imagem', uploadCapa.single('imagem'), async (req,resp) => {
    try {
        // entrada
        let id = req.params.id;
        let caminhoImagem = req.file.path;
        
        // processamento
        await alterarCapaFilmeService(id, caminhoImagem)

        // saida
        resp.status(204).send();
    }
    catch (err) {
        logErro(err);
        resp.status(400).send(criarErro(err));
    }
})

export default endpoints;