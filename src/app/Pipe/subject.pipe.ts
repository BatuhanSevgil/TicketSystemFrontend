import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'subject'
})
export class SubjectPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
