import { Pipe, PipeTransform } from '@angular/core';
import { Incurrido } from './datamodel';

@Pipe({ name: 'incurrido' , pure: false})
export class IncurridoPipe implements PipeTransform {

    transform(value: Incurrido[], field:string): number {
        return value.reduce((prev, newval, index, tareas) => {
            return prev + Number(value[index][field]);
        }, 0);
    }
}