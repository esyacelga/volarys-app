import {Component, OnInit, ViewChild} from '@angular/core';
import {RegistroTipoUsuarioPersona} from '../../classes/persona/RegistroTipoUsuarioPersona';
import {TipoUsuario} from '../../classes/persona/TipoUsuario';
import {Sector} from '../../classes/persona/Sector';
import {RegistroMensajes} from '../../classes/login/RegistroMensajes';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {UsuarioService} from '../../services/persona/usuario.service';
import {IonSlides, NavController, Platform} from '@ionic/angular';
import {StorageAppService} from '../../system/generic/service/storage-app.service';
import {SectorService} from '../../services/persona/sector.service';
import {TipoUsuarioPersonaService} from '../../services/persona/tipo-usuario-persona.service';
import {TipoUsuarioService} from '../../services/persona/tipo-usuario.service';
import {Util} from '../../system/generic/classes/util';
import {COLOR_TOAST_WARNING} from '../../system/generic/classes/constant';
import {PushNotificationService} from '../../system/generic/service/push-notification.service';
import {ModeloTipoUsuarioPersona, TipoUsuarioPersonaDto} from '../../classes/persona/TipoUsuarioPersona';
import {Router} from '@angular/router';
import {LoginService} from '../../services/persona/login.service';
import {GoogleObject} from '../../classes/login/GoogleObject';
import {environment} from '../../../../environments/environment';
import {Usuario} from '../../interfaces/interfaces';
import {LoadingService} from '../../system/generic/service/loading.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
    esProduccion = environment.production;
    objetoLogin = new RegistroTipoUsuarioPersona();
    objTipoUsuario = new TipoUsuario();
    lstSectores: Array<Sector>;
    registoMensajes: RegistroMensajes = new RegistroMensajes();
    error_messages = this.registoMensajes.error_messages;
    loginForm: FormGroup;
    ingresoForm: FormGroup;


    registerUser: Usuario = {
        email: '',
        password: '',
        nombre: '',
        avatar: ''
    };
    @ViewChild('slidePrincipal') slides: IonSlides;

    constructor(private formFuilder: FormBuilder, private  util: Util,
                private svrLogin: LoginService,
                private svrUsuario: UsuarioService,
                private navCtrl: NavController,
                private svrRoute: Router,
                protected loading: LoadingService,
                private svrStorage: StorageAppService,
                private svtNotificacion: PushNotificationService,
                private platform: Platform,
                private svrSector: SectorService, private svrTipoUsuario: TipoUsuarioService,
                private svtTipoUsuariPersona: TipoUsuarioPersonaService) {
        this.construirFormRegistro();
        this.construirFormLogin();
    }


    /*    async loginFaceBook() {
            if (this.platform.is('cordova')) {
                await this.loading.present('messagesService.loadMessagesOverview', 'Procesando...');
                const objUsuario: GoogleObject = (await this.svrLogin.loginWithFaceBook() as GoogleObject);
                this.loading.dismiss('messagesService.loadMessagesOverview');
                if (objUsuario) {
                    await this.validarLogin(objUsuario);
                }
            } else {
                this.util.presentToast('Opcion no disponible desde la WEB', COLOR_TOAST_WARNING);
            }
        }*/


    async loginFaceBook() {
        if (this.platform.is('cordova')) {
            await this.loading.present('messagesService.loadMessagesOverview', 'Integrando con Facebook...');
            // @ts-ignore
            const objUsuario: GoogleObject = (await (this.svrLogin.loginWithFaceBook().catch(this.loading.dismiss('messagesService.loadMessagesOverview'))) as GoogleObject);
            this.loading.dismiss('messagesService.loadMessagesOverview');
            if (objUsuario) {
                await this.validarLogin(objUsuario);
            }
        } else {
            this.util.presentToast('Opcion no disponible desde la WEB', COLOR_TOAST_WARNING);
        }
    }

    async loginGoogle() {
        if (this.platform.is('cordova')) {
            await this.loading.present('messagesService.loadMessagesOverview', 'Integrando con Google...');
            // @ts-ignore
            const objUsuario: GoogleObject = (await (this.svrLogin.loginWithGoogle().catch(this.loading.dismiss('messagesService.loadMessagesOverview'))) as GoogleObject);
            this.loading.dismiss('messagesService.loadMessagesOverview');
            if (objUsuario) {
                await this.validarLogin(objUsuario);
            }
        } else {
            this.util.presentToast('Opcion no disponible desde la WEB', COLOR_TOAST_WARNING);
        }
    }

    async validarLogin(objUsuario: GoogleObject) {
        if (objUsuario === undefined || objUsuario.user === undefined || objUsuario.user.email === null || objUsuario.user.email === undefined) {
            this.util.presentToast('Existió un error con la autentificación de google', COLOR_TOAST_WARNING);
            return;
        }
        let objTipoUsuarioPersona: ModeloTipoUsuarioPersona = (await this.svtTipoUsuariPersona.obtenerPorCorreo(objUsuario.user.email) as ModeloTipoUsuarioPersona);
        if (objTipoUsuarioPersona) {
            this.redirigirFormulario(objTipoUsuarioPersona);
        } else {
            await this.registrarUsuarioPersona(objTipoUsuarioPersona, objUsuario);
            objTipoUsuarioPersona = (await this.svtTipoUsuariPersona.obtenerPorCorreo(objUsuario.user.email) as ModeloTipoUsuarioPersona);
            this.redirigirFormulario(objTipoUsuarioPersona);
        }
    }

    async registrarUsuarioPersona(objTipoUsuarioPersona: ModeloTipoUsuarioPersona, usuarioGoogle: GoogleObject) {
        if (objTipoUsuarioPersona === undefined || objTipoUsuarioPersona === null) {
            const tipoUsuarioPersona = new TipoUsuarioPersonaDto();
            tipoUsuarioPersona.correo = usuarioGoogle.user.email;
            tipoUsuarioPersona.google = true;
            tipoUsuarioPersona.displayName = usuarioGoogle.user.displayName;
            tipoUsuarioPersona.picture = usuarioGoogle.user.photoURL;
            tipoUsuarioPersona.avatar = 'av-1.png';
            tipoUsuarioPersona.tipoUsuario = this.objTipoUsuario._id;
            tipoUsuarioPersona.clave = 'seya1922';
            return await this.svtTipoUsuariPersona.registarGoogle(tipoUsuarioPersona);
        }

    }


    async login() {
        if (!this.ingresoForm.value.correo) {
            this.util.presentToast('Debe ingresar la información solicitada, (Usuario, Contraseña ).', COLOR_TOAST_WARNING);
            return;
        }
        const objTipoUsuarioPersona: ModeloTipoUsuarioPersona = (await this.svtTipoUsuariPersona.obtenerPorCorreo(this.ingresoForm.value.correo) as ModeloTipoUsuarioPersona);
        this.redirigirFormulario(objTipoUsuarioPersona);
    }

    async redirigirFormulario(objTipoUsuarioPersona: ModeloTipoUsuarioPersona) {
        if (objTipoUsuarioPersona) {
            await this.svrUsuario.actualizarPlayerId(objTipoUsuarioPersona.usuario);
            this.navCtrl.navigateRoot('/main/tabs/tab1', {animated: true});
            if (this.platform.is('cordova')) {
                this.svtNotificacion.configuracionProcesoNotificacion();
            }
            this.svrStorage.setStorageObject(objTipoUsuarioPersona, 'usuario');
        } else {
            this.svrRoute.navigate(['/rol-usuario', objTipoUsuarioPersona.persona._id]);
        }

    }


    construirFormLogin() {
        this.ingresoForm = this.formFuilder.group({
            correo: new FormControl('', Validators.compose([
                Validators.required,
                Validators.minLength(6),
                Validators.maxLength(30)
            ])), clave: new FormControl('', Validators.compose([
                Validators.required,
                Validators.minLength(6),
                Validators.maxLength(30)
            ]))
        });
    }

    construirFormRegistro() {
        this.loginForm = this.formFuilder.group({
            nombres: new FormControl('', Validators.compose([
                Validators.required,
                Validators.minLength(2),
                Validators.maxLength(150)
            ])),
            fechaNacimiento: new FormControl('', Validators.compose([
                Validators.required
            ])),
            callePrincipal: new FormControl('', Validators.compose([
                Validators.minLength(2),
                Validators.maxLength(100)
            ])),
            calleSecundaria: new FormControl('', Validators.compose([
                Validators.minLength(2),
                Validators.maxLength(100)
            ])),
            apellidos: new FormControl('', Validators.compose([
                Validators.required,
                Validators.minLength(2),
                Validators.maxLength(100)
            ])),
            segundoApellido: new FormControl('', null),
            sector: new FormControl('', null),
            clave: new FormControl('', Validators.compose([
                Validators.required,
                Validators.minLength(6),
                Validators.maxLength(30)
            ])),
            passwordValidator: new FormControl('', Validators.compose([
                Validators.required,
                Validators.minLength(6),
                Validators.maxLength(30)
            ])),
            correo: new FormControl('', Validators.compose([
                Validators.required,
                Validators.minLength(6),
                Validators.maxLength(30)
            ]))
        }, {validators: this.isEquals('clave', 'passwordValidator')});
    }


    ngOnInit(): void {

        this.obtenerSectores();

    }

    async obtenerSectores() {
        // @ts-ignore
        this.lstSectores = await this.svrSector.obtenerSectores();
        // @ts-ignore
        this.objTipoUsuario = await this.svrTipoUsuario.buscarRegistro('descripcion', 'CLIENTE');
    }

    isEquals(campo: string, campoToValidate: string) {
        return (group: FormGroup) => {
            const pass1 = group.controls[campo].value;
            const pass2 = group.controls[campoToValidate].value;
            if (pass1 === pass2) {
                return null;
            } else {
                return {
                    sonIguales: true
                };
            }
        };
    }


}
