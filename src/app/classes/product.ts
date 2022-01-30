export class Product {
    id: any;
    constructor(
        public name: string,
        public reference: string,
        public qte: number,
        public description: string,
        public pu: number
    ){}
}
