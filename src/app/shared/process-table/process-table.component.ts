import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { conversionCost } from 'src/app/mock-data';
import { CoreActions } from 'src/app/store/action-types';
import { selectTableData } from 'src/app/store/selectors';
import { AddCostDialogComponent } from '../dialogs/add-cost/add-cost-dialog.component';
import { AddNewProductDialogComponent } from '../dialogs/add-new-product/add-new-product-dialog.component';
import { DeleteDialogComponent } from '../dialogs/delete/delete-dialog.componet';
import { ProcessList } from '../model/product-template/process-list.model';
import { ProductTableData } from '../model/product-template/product-table.model';
import { TableHeader } from '../model/product-template/table-header.model';

@Component({
  selector: 'process-table',
  templateUrl: './process-table.component.html',
  styleUrls: ['./process-table.component.scss']
})

export class ProcessTableComponent implements OnInit, OnDestroy {
  @Input() processList: ProcessList[];
  @Input() headers: TableHeader[];
  public dataSource = new MatTableDataSource();
  public displayedColumns: string[];
  public isCreateNewProcess = false;
  public conversionCost = conversionCost.results;
  public showFooter = false;
  public totalCost = new FormControl('');
  public totalCostAmount = 0;
  public processNumber = 1;
  public headerTotalCost = 0;
  public costAddOnValue = 0;
  public processName: string;
  public productName: string;
  public tableData: ProductTableData[] = [];
  private tableApiData: ProductTableData[];
  private unSubscribeAll: Subject<void> = new Subject();

  constructor(private _dialog: MatDialog, private _store: Store<any>) { }

  ngOnInit(): void {
    this.isCreateNewProcess = true;
    if (!this.displayedColumns) {
      this.displayedColumns = this.headers.map(col => col.prop);
    }

    // List table data values
    this._store.select(selectTableData).
      pipe(takeUntil(this.unSubscribeAll.asObservable()),
        filter((data) => !!data))
      .subscribe(tableList => {
        this.tableApiData = tableList?.results[0]?.productAttributeValues;
        this.tableData = [...this.tableApiData];
        this.isCreateNewProcess = false;
        this.showFooter = true;
        this.loadTable();
      });
  }

  loadTable(): void {
    this.dataSource = new MatTableDataSource(this.tableData);
    this.getHeaderTotalCost();
  }

  editRecord(index: number, row: ProductTableData): void {
    const dialogRef = this._dialog.open(AddNewProductDialogComponent, {
      data: row,
      width: '500px',
      height: '400px'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.tableData[index] = result;
        this.loadTable();
      }
    });
  }

  deleteRecord(index: number, row: ProductTableData): void {
    const dialogRef = this._dialog.open(DeleteDialogComponent, {
      data: row
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.tableData?.splice(index, 1);
        this.showFooter = this.tableData.length ? true : false;
        this.loadTable();
      }
    });
  }

  selectProcess(event: MatSelectChange): void {
    if (event?.value === 'new') {
      this.isCreateNewProcess = true;
      this.processNumber = this.processList.length ? (this.processList.length + 1) : 1;
      this.headerTotalCost = 0;
      this.tableData = [];
      this.showFooter = false;
      this.loadTable();
    } else {
      this.processName = '';
      this.productName = '';
      this._store.dispatch(CoreActions.loadTableData());
    }
  }

  getTotalValue(col: TableHeader): void {
    let totalValue;
    switch (col.prop) {
      case 'productName':
        totalValue = 'TOTAL';
        break;
      case 'avgDensity':
        totalValue = this.tableData?.map(val => val.avgDensity).reduce((acc, value) => acc + value, 0);
        break;
      case 'costAddOn':
        totalValue = this.tableData?.map(val => val.costAddOn).reduce((acc, value) => acc + value, 0);
        break;
      default:
        totalValue = '';
    };
    this.costAddOnValue = totalValue;
    return totalValue;
  }

  deleteCost(index: number): void {
    const dialogRef = this._dialog.open(DeleteDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.conversionCost.splice(index, 1);
        this.getTotalCost();
      }
    });
  }

  getTotalCost(): void {
    this.totalCostAmount = this.conversionCost?.map(val => val.amount).reduce((acc, value) => acc + value, 0);
    this.getHeaderTotalCost()
  }

  getHeaderTotalCost(): void {
    const costAddOn = this.tableData?.map(val => val.costAddOn).reduce((acc, value) => acc + value, 0);
    const costAddOnVal = costAddOn ? costAddOn : 0;
    this.headerTotalCost = costAddOnVal + this.totalCostAmount;
  }

  updateTotalCost(index: number, totalCost: any) {
    this.conversionCost[index].amount = parseFloat(totalCost.target.value);
    this.getTotalCost();
  }

  addNewCost(): void {
    const dialogRef = this._dialog.open(AddCostDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        result.id = this.conversionCost.length + 1;
        this.conversionCost.push(result);
        this.totalCost.setValue(result.amount);
        this.getTotalCost();
      }
    });
  }

  addNewProduct(): void {
    const dialogRef = this._dialog.open(AddNewProductDialogComponent, {
      data: 'add',
      width: '500px',
      height: '400px'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.tableData.push(result);
        console.log('this.displayedColumns', this.displayedColumns);
        this.loadTable();
        this.showFooter = true;
      }
    });
  }

  ngOnDestroy(): void {
    this.unSubscribeAll.next();
    this.unSubscribeAll.unsubscribe();
  }
}
