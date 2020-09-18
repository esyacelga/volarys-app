import {TipoUsuarioPersonaInterface} from '../persona/TipoUsuarioPersonaInterface';
import {PedidoDetalleInterface} from './PedidoDetalleInterface';
import {UsuarioInterface} from '../persona/UsuarioInterface';

export interface PedidoInterface {
    _id: string;
    estado: number;
    fechaCreacion: Date;
    solicitudDetalle: PedidoDetalleInterface[];
    usuario: UsuarioInterface;
    tipoUsuarioPersona: TipoUsuarioPersonaInterface;
}

export class PedidoTotalizado implements PedidoInterface {
    public _id: string;
    public estado: number;
    public fechaCreacion: Date;
    public solicitudDetalle: PedidoDetalleInterface[];
    public tipoUsuarioPersona: TipoUsuarioPersonaInterface;
    public usuario: UsuarioInterface;
    public total: number;


    constructor(pedido: PedidoInterface) {
        this._id = pedido._id;
        this.estado = pedido.estado;
        this.fechaCreacion = pedido.fechaCreacion;
        this.solicitudDetalle = pedido.solicitudDetalle;
        this.tipoUsuarioPersona = pedido.tipoUsuarioPersona;
        this.usuario = pedido.usuario;
        this.transform(this.solicitudDetalle);
    }

    transform(lstDetalle: PedidoDetalleInterface[]) {
        this.total = 0;
        for (const entry of lstDetalle) {
            const v1 = (entry.cantidad * entry.unidadCosto);
            const v2 = this.total;
            this.total = v1 + v2;
        }
    }
}
