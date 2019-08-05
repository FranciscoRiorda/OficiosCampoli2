import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICIOS } from '../config/config';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, tipo: string = 'usuario'): any {

    let url = URL_SERVICIOS + '/img';

    if (!img) {
      return url + '/usuarios/xxx';
    }

    if (img.indexOf('https') >= 0 ) {
      return img;
    }

    switch (tipo) {

      case 'usuario':
          url += '/usuarios/' + img;
        break;

      case 'curso':
          url += '/cursos/' + img;
        break;

      case 'sede':
          url += '/sedes/' + img;
        break;

        default:
          console.log('Tipo de imagen no existe, usuarios, cursos, sedes');
          url += '/usuarios/xxx';
    }

    return url;
  }

}
