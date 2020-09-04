import {IonicModule} from '@ionic/angular';
import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ComponentModule} from '../../../components/component.module';
import {DashboardPage} from './dashboard.page';

@NgModule({
    imports: [
        ComponentModule,
        IonicModule,
        CommonModule,
        FormsModule,
        RouterModule.forChild([{path: '', component: DashboardPage}])
    ],
    declarations: [DashboardPage]
})
export class Tab1PageModule {
}
