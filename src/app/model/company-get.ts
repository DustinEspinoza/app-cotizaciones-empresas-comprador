import { Category } from './category';
import { Subcategory } from './subcategory';
export class CompanyGet {
    public categories: Category[];
    public subcategories: Subcategory[];
    public createdDate: string;
    public sellerID: number;
    public name: string;
    public legalIdentifier: string;
    public address: string;
    public phone: string;
    public logoURL: string;
}