import { LightningElement, track, wire } from 'lwc';
import getStockQuote from '@salesforce/apex/AlphaVantageAPI.getStockQuote';

export default class StockDataDisplay extends LightningElement {
    @track symbol = '';
    @track stockdata;
    @track error;

    @wire(getStockQuote, { symbol: '$symbol' })
    wiredStockData({ error, data }) {
        if (data) {
            this.stockdata = [{
                symbol: data['01. symbol'],
                price: data['05. price'],
                open: data['02. open'],
                high: data['03. high'],
                low: data['04. low'],
                volume: data['06. volume'],
                latestTradingDay: data['07. latest trading day'],
                previousClose: data['08. previous close'],
                change: data['09. change'],
                changePercent: data['10. change percent']
            }];
            console.log(">>>>>>StockData: ", this.stockdata);
            
        } else if (error) {
            this.error = error;
            console.log(">>>>>>>>>>log error: ",this.error);
            console.error(">>>>>>>>>>error error: ",this.error);
            
        }
    }

    handleSymbolClick() {
        const inputElement = this.template.querySelector("[data-id='stockSymbolInput']");
        this.symbol = inputElement.value;
        console.log(">>>>>>symbol: ", this.symbol);
    }
}