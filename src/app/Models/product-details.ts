import { Category } from "./category-details";

export class Product{

    constructor(
        private name:string,
        private description: string,
        private price: number,
        private picture1: string,
        private category: Category
    ){}

    /**
	private String name;

	private String description;
	private double price;
	private String picture1;

	private Category category;
     */

}