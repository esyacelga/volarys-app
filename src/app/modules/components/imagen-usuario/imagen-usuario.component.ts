import {Component, OnInit} from '@angular/core';
import {StorageAppService} from '../../system/generic/service/storage-app.service';
import {ModeloTipoUsuarioPersona} from '../../classes/persona/TipoUsuarioPersona';
import {NavController} from '@ionic/angular';
import {faWhatsapp} from '@fortawesome/free-brands-svg-icons/faWhatsapp';

@Component({
    selector: 'app-imagen-usuario',
    templateUrl: './imagen-usuario.component.html',
    styleUrls: ['./imagen-usuario.component.scss'],
})
export class ImagenUsuarioComponent implements OnInit {
    wstp = faWhatsapp;
    modeloPersonaTipoUsuario: ModeloTipoUsuarioPersona;
    photo = '';
    displayName = '';

    constructor(private svrStorage: StorageAppService, private nvrServ: NavController) {
    }

    seleccionarPaginaSettings() {
        this.nvrServ.navigateForward('main/tabs/settings');
    }

    async ngOnInit() {
        this.modeloPersonaTipoUsuario = (await this.svrStorage.loadStorageObject('usuario')) as ModeloTipoUsuarioPersona;
        this.photo = this.modeloPersonaTipoUsuario.persona.picture;
        this.displayName = this.modeloPersonaTipoUsuario.persona.displayName;
    }

}
