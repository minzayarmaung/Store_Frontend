import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterpipe'
})
export class FilterpipePipe implements PipeTransform {

  transform(value : any , searchFilter : any): any {
    const lowerCaseSearch =  searchFilter.toLowerCase(); // Change everything the customer search to Lower Case

    return value.filter((e:any) => {
      // Converting All the fields to Lowercase to avoid Case-Sensitive

      const name = e.name.toLowerCase();

      return name;
    });
  }

}
