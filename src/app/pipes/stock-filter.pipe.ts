import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stockFilter'
})
export class StockFilterPipe implements PipeTransform {

  transform(stocks: any[] , filterText: string): any[] {

    if(!stocks || !filterText){
      return stocks;
    }
    
    const lowerCaseFilterText = filterText.toLowerCase();
    
    return stocks.filter(stock => {
      const matchesId = stock.stockId.toString().includes(lowerCaseFilterText);
      const matchesName = stock.name? stock.name.toLowerCase().includes(lowerCaseFilterText) : false;
      const matchesInvoiceId = stock.invoice?.invoiceId.toString().includes(lowerCaseFilterText);

      return matchesId || matchesName || matchesInvoiceId;
    });
  }

}
