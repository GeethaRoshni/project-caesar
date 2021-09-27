import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProcessTableComponent } from './process-table/process-table.component';
import { MaterialModule } from './modules/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DeleteDialogComponent } from './dialogs/delete/delete-dialog.componet';
import { AddCostDialogComponent } from './dialogs/add-cost/add-cost-dialog.component';
import { AddNewAttributesDialogComponent } from './dialogs/add-new-attributes/add-new-attributes-dialog.component';
import { AddNewProductDialogComponent } from './dialogs/add-new-product/add-new-product-dialog.component';

@NgModule({
  declarations: [
    ProcessTableComponent,
    DeleteDialogComponent,
    AddCostDialogComponent,
    AddNewAttributesDialogComponent,
    AddNewProductDialogComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  exports: [
    ProcessTableComponent,
    DeleteDialogComponent,
    MaterialModule,
    AddCostDialogComponent,
    AddNewAttributesDialogComponent,
    AddNewProductDialogComponent
  ]
})
export class SharedModule { }
