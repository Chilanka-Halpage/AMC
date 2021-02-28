import { Client } from './client.model';
export class ClientDepartment {
    deptId: number;
    departmentName: string;
    isActive;
    email: string;;
    contactNo: string;;
    contactPerson: string;;
    address?: string;
    savedIp?: string;
    savedBy?: string;
    savedOn?: Date;
    lastModifiedBy?: Date;
    lastModifiedOn?: Date;
    client?: Client;
}
