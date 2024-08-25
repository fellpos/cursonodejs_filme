import express from 'express';

import filmeController from './controller/filmeController.js';

export default function adcionarRotas(servidor) {
    servidor.use(filmeController);

    // libera em /storage/capa todos os arquivos estáticos que estão no /storage/capa
    servidor.use('/storage/capa', express.static('./storage/capa'));
}