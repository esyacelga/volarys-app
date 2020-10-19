import {Injectable} from '@angular/core';
import {ExecuteCallProcedureService} from '../../system/generic/service/execute-call-procedure.service';
import {Util} from '../../system/generic/classes/util';
import {GooglePlus} from '@ionic-native/google-plus/ngx';
import {AngularFireAuth} from '@angular/fire/auth';
import {auth} from 'firebase';
import {Facebook, FacebookLoginResponse} from '@ionic-native/facebook/ngx';
import {COLOR_TOAST_DARK, COLOR_TOAST_ERROR, COLOR_TOAST_MEDIUM, OFFLINE} from '../../system/generic/classes/constant';
import {Network} from '@ionic-native/network/ngx';
import {Platform} from '@ionic/angular';
import {LoadingService} from '../../system/generic/service/loading.service';

@Injectable({
    providedIn: 'root'
})
export class LoginService {
    private internetConection = true;

    constructor(private genericService: ExecuteCallProcedureService,
                private utils: Util,
                private google: GooglePlus,
                protected loading: LoadingService,
                private svrNet: Network,
                private svrFB: Facebook,
                private platform: Platform,
                private svrAuth: AngularFireAuth) {

        if (this.platform.is('cordova')) {
            this.svrNet.onDisconnect().subscribe(() => {
                this.internetConection = false;
            });
            this.svrNet.onConnect().subscribe(() => {
                this.internetConection = true;
            });
        }
    }


    loginWithGoogle() {
        if (this.internetConection === false) {
            this.utils.presentToast(OFFLINE, COLOR_TOAST_MEDIUM, 'bottom');
            return null;
        }
        this.loading.present('messagesService.loadMessagesOverview', 'Integrando con Google...');
        const promesa = new Promise(async (resolve, reject) => {
            return this.google.login({}).then(result => {
                const userDataGoogle = result;
                this.loading.dismiss('messagesService.loadMessagesOverview');
                this.loading.present('messagesService.loadMessagesOverview', 'Generando las credenciales de Google...');
                this.svrAuth.signInWithCredential(auth.GoogleAuthProvider.credential(null, userDataGoogle.accessToken)).then(
                    (objResponce) => {
                        this.loading.dismiss('messagesService.loadMessagesOverview');
                        resolve(objResponce);
                    }, (error) => {
                        this.utils.presentToast(JSON.stringify(error), COLOR_TOAST_DARK);
                        this.loading.dismiss('messagesService.loadMessagesOverview');
                        resolve(null);
                    }
                );
            }, (error) => {
                this.utils.presentToast(JSON.stringify(error), COLOR_TOAST_DARK);
                this.loading.dismiss('messagesService.loadMessagesOverview');
                resolve(null);
            });
        });
        return promesa;
    }

    loginWithFaceBook() {
        if (this.internetConection === false) {
            this.utils.presentToast(OFFLINE, COLOR_TOAST_MEDIUM, 'bottom');
            return null;
        }
        this.loading.present('messagesService.loadMessagesOverview', 'Integrando con Facebook...');
        const promesa = new Promise(async (resolve, reject) => {
            this.svrFB.login(['email', 'public_profile']).then((responce: FacebookLoginResponse) => {
                const credencialFB = auth.FacebookAuthProvider.credential(responce.authResponse.accessToken);
                this.loading.dismiss('messagesService.loadMessagesOverview');
                this.loading.present('messagesService.loadMessagesOverview', 'Generando las credenciales de Facebook...');
                this.svrAuth.signInWithCredential(credencialFB).then((objResponce) => {
                    this.loading.dismiss('messagesService.loadMessagesOverview');
                    resolve(objResponce);
                }, error => {
                    this.utils.presentToast(JSON.stringify(error), COLOR_TOAST_ERROR);
                    this.loading.dismiss('messagesService.loadMessagesOverview');
                    resolve(null);
                });
            }, (error) => {
                this.utils.presentToast(JSON.stringify(error), COLOR_TOAST_DARK);
                this.loading.dismiss('messagesService.loadMessagesOverview');
                resolve(null);

            });
        });
        return promesa;
    }

}
