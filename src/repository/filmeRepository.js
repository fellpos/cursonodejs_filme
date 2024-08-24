import con from "./connection.js";

// recebe um objeto ao inves de milhoes de parametros

/*
let obj = 
{
    nome: 'harry',
    sinopse: 'infdeaojfnosnf',
    avaliacao: 9.2,
    lancamento: '2003-05-01',
    disponivel: true
}

*/

export async function salvarFilme(filme) {
    let comando = `
        INSERT INTO tb_filme (nm_filme, ds_sinopse, vl_avaliacao, dt_lancamento, bt_disponivel)
            VALUES (?, ?, ?, ?, ?)
    `
// query = raiozinho / executa
// entre [] ele substitui as ?
// retorna uma variavel
// colocar await e async

    let reposta = await con.query(comando, [filme.nome, filme.sinopse, filme.avaliacao, filme.lancamento, filme.disponivel]);
// resposta é um vetor e a info que queremos sempre vão estar em 0
    let info = reposta[0];
    
// chave primaria q o banco criou 
    let idFilme = info.insertId

    return idFilme;
}