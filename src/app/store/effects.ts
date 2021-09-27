import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { throwError } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { ProductTemplateService } from '../service/product-template.service';
import { CoreActions } from './action-types';

@Injectable()

export class CoreEffects {

    loadAttributeGroups$ = createEffect(() =>
        this.actions$.pipe(ofType(CoreActions.loadAttributeGroup),
            switchMap((action) => {
                return this.productTemplateService.getAttributeGroups().pipe(map((data) => {
                    return CoreActions.attributeGroupLoaded({ attributeGroup: data });
                }),
                    catchError(err => throwError(err))
                );
            }))
    );

    loadAttributeList$ = createEffect(() =>
        this.actions$.pipe(ofType(CoreActions.loadAttributeList),
            switchMap((action) => {
                return this.productTemplateService.getAttributeList().pipe(map((data) => {
                    return CoreActions.attributeListLoaded({ attributeList: data });
                }),
                    catchError(err => throwError(err))
                );
            }))
    );

    loadAttributes$ = createEffect(() =>
        this.actions$.pipe(ofType(CoreActions.loadAttributes),
            switchMap((action) => {
                return this.productTemplateService.getAttributes().pipe(map((data) => {
                    return CoreActions.attributesLoaded({ attributes: data });
                }),
                    catchError(err => throwError(err))
                );
            }))
    );

    loadProductType$ = createEffect(() =>
        this.actions$.pipe(ofType(CoreActions.loadProductType),
            switchMap((action) => {
                return this.productTemplateService.getProductTypes().pipe(map((data) => {
                    return CoreActions.productTypeLoaded({ productType: data });
                }),
                    catchError(err => throwError(err))
                );
            }))
    );

    loadProcessList$ = createEffect(() =>
        this.actions$.pipe(ofType(CoreActions.loadProcessList),
            switchMap((action) => {
                return this.productTemplateService.getProcessList().pipe(map((data) => {
                    return CoreActions.processListLoaded({ processList: data });
                }),
                    catchError(err => throwError(err))
                );
            }))
    );

    loadConversionCost$ = createEffect(() =>
        this.actions$.pipe(ofType(CoreActions.loadConversionCost),
            switchMap((action) => {
                return this.productTemplateService.getConversionCost().pipe(map((data) => {
                    return CoreActions.conversionCostLoaded({ conversionCost: data });
                }),
                    catchError(err => throwError(err))
                );
            }))
    );

    loadTableData$ = createEffect(() =>
        this.actions$.pipe(ofType(CoreActions.loadTableData),
            switchMap((action) => {
                return this.productTemplateService.getTableData().pipe(map((data) => {
                    return CoreActions.tableDataLoaded({ tableData: data });
                }),
                    catchError(err => throwError(err))
                );
            }))
    );

    constructor(
        private actions$: Actions,
        private productTemplateService: ProductTemplateService
    ) { }
}
