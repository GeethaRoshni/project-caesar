export interface ProductTypeResponse {
    count: number;
    next: string;
    previous: string;
    results: ProductType[];
}

export interface ProductType {
    id: number;
    description: string;
}