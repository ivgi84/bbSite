import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortDescription'
})
export class ShortDescriptionPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    var regex = value.match(/^.{0,60}[\S]*/);
    var length = regex[0].length;
    var regex = regex[0].replace(/\s$/,'');
    if(length < value.length)
        regex = regex + "...";
    return regex;
  }

}
