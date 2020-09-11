import {Pipe, PipeTransform} from '@angular/core';
import * as _ from 'underscore';

@Pipe({
    name: 'tipoArticulo'
})
export class TipoArticuloPipe implements PipeTransform {

    transform(items: any[], filter: any): any {
        if (!items || !filter) {
            return items;
        }
        for (const data of items) {
            if (data.tipoArticulo) {
                data.idTipoArticulo = data.tipoArticulo._id;
            }
        }
        const lst: any[] = _.where(items, filter);
        return lst;
    }

}
