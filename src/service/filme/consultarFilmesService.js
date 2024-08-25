import { consultarFilmes } from "../../repository/filmeRepository.js";

export default async function consultarFilmesService(nome) {
        if(!nome) {
            nome = '';
        }
     
    let linhas = await consultarFilmes(nome);
    return linhas;

}