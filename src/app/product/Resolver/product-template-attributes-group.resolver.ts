import { Resolve } from '@angular/router';
import { tap, first, filter, finalize } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectResetAttributeGroups } from 'src/app/store/selectors';
import { CoreActions } from 'src/app/store/action-types';

@Injectable({
    providedIn: 'root'
})

export class ProductTemplateAttributesGroupResolver implements Resolve<any> {
    loading = false;

    resolve() {
        return this._store.select(selectResetAttributeGroups).pipe(
            tap((loaded) => {
                if (!this.loading && !loaded) {
                    this._store.dispatch(CoreActions.loadAttributeGroup());
                    this.loading = true;
                }
            }),
            filter(loaded => loaded),
            first(),
            finalize(() => {
                this.loading = false;
                this._store.dispatch(CoreActions.resetAttributeGroup());
            })
        );
    }

    constructor(
        private _store: Store
    ) { }
}
