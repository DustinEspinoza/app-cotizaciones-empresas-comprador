import { Subcategory } from './subcategory';

export class Category {
    public categoryID: number;
    public name: string;
    public description: string;
    public active: boolean;
    public createdDate: string;
    public subcategories: Subcategory[] = [];
    public isSelected: boolean = false;
}