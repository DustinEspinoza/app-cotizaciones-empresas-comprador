import { Customer } from '../model/customer';
import { Seller } from '../model/seller';
import { Status } from '../model/status';
import { Answers } from '../model/answers';
export class QuotationStatus {
    public customer: Customer;
    public seller: Seller;
    public status: Status;
    public answers: Answers[];
    public quotationID: number;
    public title: string;
    public description: string;
    public content: string;
    public isSeen: false;
    public createdDate: string;
    public modifiedDate: string;
}