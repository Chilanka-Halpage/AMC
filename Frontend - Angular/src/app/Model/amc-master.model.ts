import { Currency } from './currency.model';
import { Client } from './client.model';


export class AmcMaster {
    amcNo: string;
    startDate: Date;
    active: boolean;
    frequency: string;
    exchageRate: number;
    totalValue: number;
    totalValueLkr: number;
    remark: string;
    invDesc: string;
    savedIp?: string;
    client: Client;
    currency: Currency;
}  