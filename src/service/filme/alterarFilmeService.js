import { alterarFilme } from "../../repository/filmeRepository.js";
import { validarCamposObrigatoriosFilme } from "../../validation/filme/filmeValidation.js";

export default async function alterarFilmeService(filmeObj, id) {

    validarCamposObrigatoriosFilme(filmeObj);

    let linhasAfetadas = alterarFilme(filmeObj, id);
    if(linhasAfetadas == 0)
        throw new Error('Nenhum Filme Alterado');

    // quando é endpont put n tem oq retornar
        
}