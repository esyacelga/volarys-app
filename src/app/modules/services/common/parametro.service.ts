import {Injectable} from '@angular/core';
import {OBTENER_PARAMETRO_POR_CODIGO} from '../../constantes/ConstanteConsulta';
import {ExecuteCallProcedureService} from '../../system/generic/service/execute-call-procedure.service';
import {RequestOptions} from '../../system/generic/classes/RequestOptions';


@Injectable({
    providedIn: 'root'
})
export class ParametroService {

    constructor(private genericService: ExecuteCallProcedureService) {

    }

    public async obtenerParametroPorCodigo(codigo: string) {
        const requestOptions = new RequestOptions();
        return await this.genericService.servicioRestGenericoGet({codigo}, OBTENER_PARAMETRO_POR_CODIGO, requestOptions);
    }


}
