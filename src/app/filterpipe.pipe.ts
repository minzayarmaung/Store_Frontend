import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterpipe'
})
export class FilterpipePipe implements PipeTransform {

  transform(value: any, searchFilter: any): any {
    if (!value || !searchFilter) {
      return value;
    }

    const lowerCaseSearch = searchFilter.toLowerCase();

    return value.filter((e: any) => {
      const cashierName = e.cashierName ? e.cashierName.toLowerCase() : '';
      const invoiceID = e.invoiceId ? e.invoiceId.toString() : ''; 

      // Checking to make sure if either the invoiceID or cashierName contains the search filter
      return invoiceID.includes(lowerCaseSearch) || cashierName.includes(lowerCaseSearch);
    });
  }
}
