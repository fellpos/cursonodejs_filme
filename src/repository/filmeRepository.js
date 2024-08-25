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
    let idFilme = info.insertId;

    return idFilme;
}



export async function consultarFilmes(nome) {
    let comando = `
    	SELECT	id_filme        id,
			    nm_filme        nome,
			    vl_avaliacao    avaliacao,
			    dt_lancamento   lancamento,
			    bt_disponivel   disponivel
		  FROM  tb_filme
         WHERE  nm_filme like ?
        `

    let resposta = await con.query(comando, ['%' + nome + '%']);
    let linhas = resposta[0]; // registros / info

    return linhas;

}



export async function consultarFilmePorNome(nome) {
    let comando = `
    	SELECT	id_filme        id,
			    nm_filme        nome,
			    vl_avaliacao    avaliacao,
			    dt_lancamento   lancamento,
			    bt_disponivel   disponivel
		  FROM  tb_filme
         WHERE  nm_filme = ?
        `

    let resposta = await con.query(comando, [nome]);
    let linhas = resposta[0]; // registros

    return linhas;

}



export async function consultarFilmePorId(id) {
    let comando = `
    	SELECT	id_filme        id,
			    nm_filme        nome,
                ds_sinopse      sinopse,
			    vl_avaliacao    avaliacao,
			    dt_lancamento   lancamento,
			    bt_disponivel   disponivel,
                img_filme       img
		  FROM  tb_filme
         WHERE  id_filme = ?
        `

    let resposta = await con.query(comando, [id]);
    let linhas = resposta[0]; // registros

    return linhas;

}


export async function alterarFilme(filme, id) {
    let comando = `
    UPDATE	tb_filme
    SET	nm_filme = ?,
            ds_sinopse = ?,
            vl_avaliacao = ?,
            dt_lancamento = ?,
            bt_disponivel = ?
    WHERE	id_filme = ?;
    `

    let resposta = await con.query(comando, [
        filme.nome,
        filme.sinopse,
        filme.avaliacao,
        filme.lancamento,
        filme.disponivel,
        id]);

    let info = resposta[0];
    let linhasAfetadas = info.affectedRows; // linhas afetadas / quantas linhas foram afetadas
}



export async function deletarFilme(id) {
    let comando = `
        DELETE FROM tb_filme WHERE id_filme = ?;
    `

    let resposta = await con.query(comando, [id]);
    let info = resposta[0];
    let linhasAfetadas = info.affectedRows;
    return linhasAfetadas;

}

export async function alterarCapaFilme(id, caminho) {
    let comando = `
    UPDATE	tb_filme
        SET	img_filme = ?
    WHERE	id_filme = ?;
    `

    let resposta = await con.query(comando, [caminho, id]);
    let info = resposta[0];
    let linhasAfetadas = info.affectedRows;
    return linhasAfetadas;
}