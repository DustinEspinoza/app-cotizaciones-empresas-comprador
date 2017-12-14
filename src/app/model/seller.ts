import { Category } from '../model/category';
import { Subcategory } from '../model/subcategory';
export class Seller {
    public categories: Category;
    public subcategoris: Subcategory;
    public createdDate: string;
    public sellerID: number;
    public name: string;
    public legalIdentifier: string;
    public address: string;
    public phone: string;
    public logoURL: string;
}