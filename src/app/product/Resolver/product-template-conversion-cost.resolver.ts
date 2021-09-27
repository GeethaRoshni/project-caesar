import { Resolve } from '@angular/router';
import { tap, first, filter, finalize } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectResetAttributeGroups, selectResetConversionCost, selectResetProductType } from 'src/app/store/selectors';
import { CoreActions } from 'src/app/store/action-types';

@Injectable({
    providedIn: 'root'
})

export class ProductTemplateConversionCostResolver implements Resolve<any> {
    loading = false;

    resolve() {
        return this._store.select(selectResetConversionCost).pipe(
            tap((loaded) => {
                if (!this.loading && !loaded) {
                    this._store.dispatch(CoreActions.loadConversionCost());
                    this.loading = true;
                }
            }),
            filter(loaded => loaded),
            first(),
            finalize(() => {
                this.loading = false;
                this._store.dispatch(CoreActions.resetConversionCost());
            })
        );
    }

    constructor(
        private _store: Store
    ) { }
}
