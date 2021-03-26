import { PipeTransform, Pipe } from '@angular/core';
import { Shopdetails } from '../../shopdetails.model';


@Pipe({
    name:'coffeeshopFilter',
    pure:true
})

export class CoffeeshopFilterPipe implements PipeTransform{
    transform(shopdetails:Shopdetails[],searchBox:string):Shopdetails[] {
        if(!shopdetails || !searchBox){
            return shopdetails;
        }
        return shopdetails.filter(sd =>sd.name.toLowerCase().indexOf(searchBox.toLowerCase())!==-1);
    }

}