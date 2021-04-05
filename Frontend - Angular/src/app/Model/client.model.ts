export class Client {
    clientId: number;
    clientName: string;
    active: boolean | string;
    contactNo: string;
    contactPerson: string;
    address: string;
    savedIp: string;
    savedBy: string;
    savedOn: Date;
    lastModifiedBy?: Date;
    lastModifiedOn?: Date;
}