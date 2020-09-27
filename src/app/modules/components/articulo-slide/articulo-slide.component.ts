import {Component, Input, OnInit} from '@angular/core';
import {Segmento} from '../../classes/mensajeria/Segmento';
import {Articulo, ObjetoArticulo} from '../../classes/mensajeria/Articulo';
import {SolcitudDetalleModel} from '../../classes/mensajeria/SolcitudCabeceraModel';
import {SolicitudService} from '../../services/mensajeria/solicitud.service';
import {Util} from '../../system/generic/classes/util';
import {StorageAppService} from '../../system/generic/service/storage-app.service';
import {
    COLOR_TOAST_PRIMARY,
    COLOR_TOAST_SUCCESS,
    COLOR_TOAST_WARNING,
    DOBLE_DURATION_TOAST
} from '../../system/generic/classes/constant';
import {CommentComponent} from '../comment-component/comment.component';
import {ModalController, Platform} from '@ionic/angular';
import {ModeloTipoUsuarioPersona} from '../../classes/persona/TipoUsuarioPersona';
import {LikeDislikeService} from '../../services/common/likeDislike.service';
import {LikeDislike} from '../../classes/common/LikeDislike';
import {Observable} from 'rxjs';
import {ArticuloService} from '../../services/mensajeria/articulo.service';
import {ProfileComponent} from '../profile/profile.component';
import {PhotoViewer} from '@ionic-native/photo-viewer/ngx';
import {environment} from '../../../../environments/environment';
import {DataService} from '../../services/mensajeria/data.service';
import {faExpandAlt} from '@fortawesome/free-solid-svg-icons';
import {VerMasPage} from '../ver-mas/ver-mas.page';
import {ParametroInterface} from '../../interfaces/common/ParametroInterface';
import {ParametroService} from '../../services/common/parametro.service';

const URL = environment.url;

@Component({
    selector: 'app-articulo-slide',
    templateUrl: './articulo-slide.component.html',
    styleUrls: ['./articulo-slide.component.scss'],
})
export class ArticuloSlideComponent implements OnInit {
    @Input() segmento: Segmento;
    @Input() lstArticulo: Array<ObjetoArticulo>;
    public wstp = faExpandAlt;
    public numeroContacto: string;
    public parametro: ParametroInterface;
    public lstDetalle: SolcitudDetalleModel[] = [];
    public comentarioActivado = false;
    public modeloPersonaTipoUsuario: ModeloTipoUsuarioPersona;
    private objArticulo: ObjetoArticulo;
    private conteoLike: Observable<number>;
    private conteoDisLike: Observable<number>;
    private conteoComentarios: Observable<number>;


    constructor(private svrSolicitud: SolicitudService,
                private utilSvr: Util,
                private svrParametro: ParametroService,
                private dataService: DataService,
                private platform: Platform,
                private photoViewer: PhotoViewer,
                private svrArticulo: ArticuloService,
                private svrStorage: StorageAppService,
                private modalCtrl: ModalController,
                private  svrLike: LikeDislikeService) {
    }


    public zoomImage(nombre, directorio) {
        if (this.platform.is('cordova')) {
            const url = `${URL}/articulo/imagen/${directorio}/${nombre}`;
            this.photoViewer.show(url);
        } else {
            this.utilSvr.presentToast('Opcion no disponible desde sistema WEB', COLOR_TOAST_WARNING);
        }

    }

    public async abrirModal(item: Articulo) {
        const modal = await this.modalCtrl.create({
            component: CommentComponent,
            componentProps: {
                objArticulo: item,
                objTipoUsuarioPersona: this.modeloPersonaTipoUsuario
            }
        });
        await modal.present();
        const {data} = await modal.onDidDismiss();
        this.lstArticulo = (await this.svrArticulo.obtenerArticulos() as Array<ObjetoArticulo>);
    }

    async verMasPanel(item: Articulo) {
        const modal = await this.modalCtrl.create({
            component: VerMasPage,
            componentProps: {
                objArticulo: item
            }
        });
        await modal.present();
        const {data} = await modal.onDidDismiss();
    }

    public async actualizarLike(item: Articulo, like: boolean) {
        let objLike: LikeDislike = new LikeDislike(this.modeloPersonaTipoUsuario.persona, item, like, true);
        objLike = (await this.svrLike.registar(objLike) as LikeDislike);
        this.lstArticulo = (await this.svrArticulo.obtenerArticulosSinloading() as Array<ObjetoArticulo>);
        return objLike.articulo;
    }

    async activarPanel() {
        const modal = await this.modalCtrl.create({
            component: ProfileComponent,
            componentProps: {title: 's', tipoError: 's', mensaje: 'mensajeError'}
        });
        await modal.present();
        const {data} = await modal.onDidDismiss();
    }

    public validarFechas(item: ObjetoArticulo) {
        if (!item.horaInicio) {
            return true;
        }
        if (!item.horaFin) {
            return true;
        }
        const fechaActual = new Date();
        const horaActual = fechaActual.getHours();

        const horaInicial = new Date(item.horaInicio).getHours();

        const horaFinal = new Date(item.horaFin).getHours();

        if ((horaInicial <= horaActual && horaActual <= horaFinal)) {
            return true;
        } else {
            return false;
        }
        return;
    }

    public solicitudPorWTS() {
        window.open(this.numeroContacto, '_system');
    }

    async seleccionarArticulo(item: ObjetoArticulo) {
        if (!this.validarFechas(item)) {
            this.utilSvr.presentToast('El servicio solicitado se encuentra fuera de horario', COLOR_TOAST_WARNING);
            return;
        }
        this.objArticulo = item;
        this.modeloPersonaTipoUsuario = (await this.svrStorage.loadStorageObject('usuario')) as ModeloTipoUsuarioPersona;
        if (!this.modeloPersonaTipoUsuario.persona.numeroTelefonoCelular) {
            this.utilSvr.presentToast('Para generar su primer pedido debe actualizar su información personal', COLOR_TOAST_PRIMARY, 'top', DOBLE_DURATION_TOAST);
            this.activarPanel();
            return;
        }
        await this.svrSolicitud.getDetalleSolicitud();
        // @ts-ignore
        this.lstDetalle = await this.svrSolicitud.lstDetalle;
        const data = this.utilSvr.listarObjetoPorCampo(this.lstDetalle, 'articulo', item._id);
        if (data && data.length > 0) {
            this.utilSvr.presentToast('Este artículo ya sido seleccionado', COLOR_TOAST_WARNING);
            return;
        }
        const art = new SolcitudDetalleModel(item._id, item.estado, item.descripcion, 1, item.unidadAlmacenada, item.unidadCosto);
        art.nombreArticulo = item.descripcion;
        this.svrSolicitud.setDetalleSolcitud(art);
        await this.svrSolicitud.getDetalleSolicitud();
        const lstDetalleEmmiter: SolcitudDetalleModel[] = this.svrSolicitud.lstDetalle;
        this.dataService.lstPedido$.emit(lstDetalleEmmiter);
        this.utilSvr.presentToast('Este artículo se ha agregado a la lista de pedidos', COLOR_TOAST_SUCCESS, 'top', DOBLE_DURATION_TOAST);
    }


    async ngOnInit() {
        this.parametro = (await this.svrParametro.obtenerParametroPorCodigo('NUMERO_TELEFONO_WATSUP') as ParametroInterface);
        this.numeroContacto = 'whatsapp://send?phone=' + this.parametro.valor + '';
        this.modeloPersonaTipoUsuario = (await this.svrStorage.loadStorageObject('usuario')) as ModeloTipoUsuarioPersona;
    }

}
