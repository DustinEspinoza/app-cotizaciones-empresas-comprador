import { Category } from './category';
import { Subcategory } from './subcategory'
export class CategoryGet {
    categories: Category[] = new Array<Category>();
    subcategories: Subcategory[] = new Array<Subcategory>();
    constructor(categories: Category[], subcategories: Subcategory[]) {
        this.categories = categories;
        this.subcategories = subcategories;
    }
}