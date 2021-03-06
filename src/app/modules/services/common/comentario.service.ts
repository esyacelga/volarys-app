import {Injectable} from '@angular/core';
import {Articulo} from '../../classes/mensajeria/Articulo';
import {ExecuteCallProcedureService} from '../../system/generic/service/execute-call-procedure.service';
import {RequestOptions} from '../../system/generic/classes/RequestOptions';
import {
    CRUD_COMENTARIO,
    CRUD_COMENTARIO_ELIMINADO,
    OBTENER_COMENTARIOS,
    OBTENER_TODOS_NOTIFICACIONES
} from '../../constantes/ConstanteTransaccional';
import {ItemComment} from '../../classes/common/ItemComment';
import {COLOR_TOAST_DARK} from '../../system/generic/classes/constant';


@Injectable({
    providedIn: 'root'
})
export class ComentarioService {


    constructor(private genericService: ExecuteCallProcedureService) {

    }

    async registar(comentario: ItemComment) {
        const requestOptions = new RequestOptions();
        requestOptions.successMessaje = 'Comentario Agregado';
        requestOptions.toastColor = COLOR_TOAST_DARK;
        requestOptions.presentarToast = true;
        const data = await this.genericService.servicioRestGenericoPost(comentario, CRUD_COMENTARIO, requestOptions) as ItemComment;
        return data;
    }

    async eliminar(comentario: ItemComment) {
        const requestOptions = new RequestOptions();
        requestOptions.successMessaje = 'Comentario eliminado';
        requestOptions.toastColor = COLOR_TOAST_DARK;
        requestOptions.presentarToast = true;
        const data = await this.genericService.servicioRestGenericoGet(comentario, CRUD_COMENTARIO_ELIMINADO, requestOptions) as ItemComment;
        return data;
    }

    async obtenerComentariosPorArticulo(objArticulo: Articulo) {
        const requestOptions = new RequestOptions();
        return (await this.genericService.servicioRestGenericoGet(objArticulo, OBTENER_COMENTARIOS, requestOptions) as ItemComment[]);
    }

    async obtenerTodosNotificaciones() {
        const requestOptions = new RequestOptions();
        return (await this.genericService.servicioRestGenericoGet({}, OBTENER_TODOS_NOTIFICACIONES, requestOptions) as ItemComment[]);
    }

}
