import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';

const routes: Routes = [
    {
        path: 'main',
        loadChildren: () => import('./modules/pages/tabModule/tabs/tabs.module').then(m => m.TabsPageModule)
    },
    {path: '', pathMatch: 'full', redirectTo: 'black'},
    {path: 'login', loadChildren: './modules/pages/login/login.module#LoginPageModule'},
    {path: 'black', loadChildren: './modules/pages/login/black/black.module#BlackPageModule'},


];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
