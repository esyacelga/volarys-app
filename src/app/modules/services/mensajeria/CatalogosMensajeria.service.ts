import {Injectable} from '@angular/core';
import {ExecuteCallProcedureService} from '../../system/generic/service/execute-call-procedure.service';
import {StorageAppService} from '../../system/generic/service/storage-app.service';
import {ArticuloService} from './articulo.service';
import {Articulo} from '../../classes/mensajeria/Articulo';
import {Segmento} from '../../classes/mensajeria/Segmento';
import {SegmentoService} from './segmento.service';

@Injectable({
    providedIn: 'root'
})
export class CatalogosMensajeriaService {

    constructor(private genericService: ExecuteCallProcedureService,
                private svrStorage: StorageAppService,
                private svrSegmentoAticulo: SegmentoService,
                private svrArticulo: ArticuloService) {

    }

    public async actualizarCatalogosStorage() {
        const lstSegmento: Segmento[] = await this.svrSegmentoAticulo.obtenerSegmentoPorArticuloTodosSBL() as Segmento[];
        const lstArticulo: Articulo[] = await this.svrArticulo.obtenerArticulosTodosSBL() as Articulo[];
        this.svrStorage.setStorageObject(lstSegmento, 'lstSegmento');
        this.svrStorage.setStorageObject(lstArticulo, 'lstArticulo');
    }


}
