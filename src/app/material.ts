/**
 * Created by santiago.yacelga on 9/29/2018.
 */
import {MatButtonModule, MatCheckboxModule} from '@angular/material';
import {NgModule} from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';

@NgModule({
  imports: [MatButtonModule, MatCheckboxModule, MatToolbarModule],
  exports: [MatButtonModule, MatCheckboxModule, MatToolbarModule],
})
export class MaterialModule {
}
