import {NgModule} from '@angular/core';
import {ImageSanitizerPipe} from './image-sanitizer.pipe';
import {ImagenPipe} from './imagen.pipe';
import {DomSanitizerPipe} from './dom-sanitizer.pipe';
import {FilterPipe} from './filter.pipe';
import {FiltroSegmentoPipe} from './filtro-segmento.pipe';
import {SegmentoArticuloPipe} from './segmento-articulo.pipe';
import {SumatoriaArticulosPipe} from './sumatoria-articulos.pipe';
import {FiltroPedidoPipe} from './filtro-pedido.pipe';
import {UrlSanitizerPipe} from './url-sanitizer.pipe';
import {TipoArticuloPipe} from './tipo-articulo.pipe';

@NgModule({
    declarations: [
        ImagenPipe,
        DomSanitizerPipe,
        ImageSanitizerPipe,
        FilterPipe,
        FiltroSegmentoPipe,
        SegmentoArticuloPipe,
        TipoArticuloPipe,
        SumatoriaArticulosPipe,
        FiltroPedidoPipe,
        UrlSanitizerPipe,
    ],
    exports: [
        ImagenPipe,
        FilterPipe,
        UrlSanitizerPipe,
        DomSanitizerPipe,
        ImageSanitizerPipe,
        FiltroSegmentoPipe,
        SegmentoArticuloPipe,
        FiltroPedidoPipe,
        TipoArticuloPipe,
        SumatoriaArticulosPipe
    ]
})
export class PipesModule {
}
