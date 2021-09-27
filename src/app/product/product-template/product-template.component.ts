import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { selectAttributeGroups, selectAttributeList, selectAttributes, selectConversionCost, selectProcessList, selectProductType } from 'src/app/store/selectors';
import { filter, takeUntil } from 'rxjs/operators';
import { AddNewAttributesDialogComponent } from 'src/app/shared/dialogs/add-new-attributes/add-new-attributes-dialog.component';
import { Subject } from 'rxjs';
import { TableHeader } from './config/table-header.config';
import { ProcessList } from 'src/app/shared/model/product-template/process-list.model';
import { ConversionCost } from 'src/app/shared/model/product-template/conversion-cost.model';
import { ProductType } from 'src/app/shared/model/product-template/product-type.model';
import { AttributeGroupResult } from 'src/app/shared/model/product-template/attribute-group.model';
import { AttributeListResult } from 'src/app/shared/model/product-template/attribute-list.model';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-product-template',
  templateUrl: './product-template.component.html',
  styleUrls: ['./product-template.component.scss']
})
export class ProductTemplateComponent implements OnInit, OnDestroy {
  public productTemplateGroup: FormGroup;
  public processList: ProcessList[];
  public headers = TableHeader;
  public conversionCostData: ConversionCost;
  public productTypeValues: ProductType;
  public attributeGroup: AttributeGroupResult[];
  public selectedAttribute = [];
  public selectedAttributeName: string;
  public attributeList: AttributeListResult[];
  public isAttributeDataLoading = false;
  public newAttributes: AttributeListResult;
  private unSubscribeAll: Subject<void> = new Subject();

  constructor(
    private _fb: FormBuilder,
    private _dialog: MatDialog,
    private _store: Store
  ) { }

  ngOnInit(): void {
    // List attribute group values
    this._store.select(selectAttributeGroups).
      pipe(takeUntil(this.unSubscribeAll.asObservable()),
        filter((data) => !!data))
      .subscribe(attribute => {
        this.attributeGroup = attribute?.results;
      });

    // List product type values
    this._store.select(selectProductType).
      pipe(takeUntil(this.unSubscribeAll.asObservable()),
        filter((data) => !!data))
      .subscribe(productType => {
        this.productTypeValues = productType?.results;
      });

    // List attributelist values
    this._store.select(selectAttributeList).
      pipe(takeUntil(this.unSubscribeAll.asObservable()),
        filter((data) => !!data))
      .subscribe(attrList => {
        this.attributeList = attrList?.results;
      });

    // List attributes values
    this._store.select(selectAttributes).
      pipe(takeUntil(this.unSubscribeAll.asObservable()),
        filter((data) => !!data))
      .subscribe(attributes => {
        this.newAttributes = attributes?.results;
      });

    // List process list values
    this._store.select(selectProcessList).
      pipe(takeUntil(this.unSubscribeAll.asObservable()),
        filter((data) => !!data))
      .subscribe(processList => {
        this.processList = processList?.results;
      });

    // List conversion cost values
    this._store.select(selectConversionCost).
      pipe(takeUntil(this.unSubscribeAll.asObservable()),
        filter((data) => !!data))
      .subscribe(conversionCost => {
        this.conversionCostData = conversionCost?.results;
      });

    this.productTemplateGroup = this._fb.group({
      description: [''],
      product: ['']
    });
  }

  public selectProductType(selectedId: string): void {
    // Todo - Get value for save
    console.log('selectedId', selectedId)
  }

  public selectAttribute(event: MatSelectChange): void {
    const selectedId = event.value;
    this.selectedAttribute = [];
    const selectedGroup = this.attributeGroup.find(group => group.id === parseFloat(selectedId));
    this.selectedAttributeName = selectedGroup?.description;
    selectedGroup?.attributesGroupAttributes?.forEach(grpValue => {
      this.selectedAttribute.push({
        id: grpValue?.attribute?.id,
        description: grpValue?.attribute?.description,
        required: grpValue?.required
      })
    });
  }

  public addNewAttribute(): void {
    const dialogRef = this._dialog.open(AddNewAttributesDialogComponent, {
      data: this.newAttributes,
      width: '250px',
      height: '200px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.selectedAttribute.push({ id: result?.id, description: result?.description, required: false });
      }
    });
  }

  ngOnDestroy(): void {
    this.unSubscribeAll.next();
    this.unSubscribeAll.unsubscribe();
  }
}
