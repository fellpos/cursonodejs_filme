// a service vai chamar o repositorio
// service é a lógica

// chama o validation / valida

import { salvarFilme, consultarFilmePorNome } from "../../repository/filmeRepository.js";
import { validarCamposObrigatoriosFilme, validarFilmeIgual } from "../../validation/filme/filmeValidation.js";


export default async function salvarFilmeService(filmeObj) {

    // validação
    validarCamposObrigatoriosFilme(filmeObj);

    // busca filmes com o mesmo nome
    let registros =  await consultarFilmePorNome(filmeObj.nome);

    // valida se exite filme com o mesmo nome
    validarFilmeIgual(registros)

    // lógica de negocio
    let id = await salvarFilme(filmeObj); // recebe o id que a funcao salvar filme retorna // como a funcao tem await tem q botar await no id e antes do req,resp
    return id;
}

