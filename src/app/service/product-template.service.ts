import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AttributeGroupResponse } from "../shared/model/product-template/attribute-group.model";
import { AttributeListResponse } from "../shared/model/product-template/attribute-list.model";
import { AttributesResponse } from "../shared/model/product-template/attributes.model";
import { ConversionCostResponse } from "../shared/model/product-template/conversion-cost.model";
import { ProcessListResponse } from "../shared/model/product-template/process-list.model";
import { ProductTableResponse } from "../shared/model/product-template/product-table.model";
import { ProductTypeResponse } from "../shared/model/product-template/product-type.model";

@Injectable({
    providedIn: 'root'
})
export class ProductTemplateService {
    url = 'assets/mock/'

    constructor(private http: HttpClient) { }

    getAttributeGroups(): Observable<AttributeGroupResponse> {
        return this.http.get<AttributeGroupResponse>(`${this.url}attribute-groups.json`);
    }

    getProductTypes(): Observable<ProductTypeResponse> {
        return this.http.get<ProductTypeResponse>(`${this.url}product-type.json`);
    }

    getAttributeList(): Observable<AttributeListResponse> {
        return this.http.get<AttributeListResponse>(`${this.url}attribute-list.json`);
    }

    getAttributes(): Observable<AttributesResponse> {
        return this.http.get<AttributesResponse>(`${this.url}attributes.json`);
    }

    getProcessList(): Observable<ProcessListResponse> {
        return this.http.get<ProcessListResponse>(`${this.url}process-list.json`);
    }

    getConversionCost(): Observable<ConversionCostResponse> {
        return this.http.get<ConversionCostResponse>(`${this.url}conversion-cost.json`);
    }

    getTableData(): Observable<ProductTableResponse> {
        return this.http.get<ProductTableResponse>(`${this.url}table-data.json`);
    }
}