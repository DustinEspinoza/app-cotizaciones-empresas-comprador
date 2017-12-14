import { Category } from './category';

export class ProductGet {
    public sellerID: number;
    public category: Category;
    public productID: number;
    public name: string;
    public description: string;
    public active: boolean;
    public createdDate: string;
}