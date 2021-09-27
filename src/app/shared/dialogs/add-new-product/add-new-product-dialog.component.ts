import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'add-new-product',
  templateUrl: './add-new-product-dialog.component.html',
  styleUrls: ['./add-new-product-dialog.component.scss']
})
export class AddNewProductDialogComponent implements OnInit {
  addProduct: FormGroup;
  title: string;
  // Todo - Get data from api
  productNames = [{ id: 1, description: "Rice", usd: '50$', density: 0.230000 }, { id: 2, description: "Salt", usd: '70$', density: 0.780000 }];

  constructor(
    public dialogRef: MatDialogRef<AddNewProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _fb: FormBuilder) { }

  ngOnInit(): void {
    this.addProduct = this._fb.group({
      productName: [''],
      usd: [{ value: '', disabled: true }],
      density: [{ value: '', disabled: true }],
      used: [''],
      waste: [''],
      avgDensity: [{ value: '', disabled: true }],
      costAddOn: [{ value: '', disabled: true }],
    });

    if (this.data !== 'add') {
      this.title = 'Edit Product';
      this.addProduct.controls.productName.setValue(this.data.productName),
        this.addProduct.controls.usd.setValue(this.data.usd),
        this.addProduct.controls.density.setValue(this.data.density),
        this.addProduct.controls.used.setValue(this.data.used),
        this.addProduct.controls.waste.setValue(this.data.waste),
        this.addProduct.controls.avgDensity.setValue(this.data.avgDensity),
        this.addProduct.controls.costAddOn.setValue(this.data.costAddOn)
    } else {
      this.title = 'Add New Product';
    }
  }

  selectProduct(event: MatSelectChange): void {
    const found = this.productNames.find(val => val.id === event.value);
    this.addProduct.controls.usd.setValue(found.usd);
    this.addProduct.controls.density.setValue(found.density);
  }

  calculateAvgCost(): void {
    const usedValue = parseFloat(this.addProduct.controls.used.value);
    const wasteValue = parseFloat(this.addProduct.controls.waste.value);
    const usdValue = this.addProduct.controls.usd.value ? parseFloat(this.addProduct.controls.usd.value) : 0;
    const used = usedValue ? usedValue : 0;
    const waste = wasteValue ? wasteValue : 0;
    const avgDensity = usdValue * ((used - waste) / 100);
    const costAddOn = usdValue * ((used + waste) / 100);
    this.addProduct.controls.avgDensity.setValue(Math.abs(avgDensity));
    this.addProduct.controls.costAddOn.setValue(Math.abs(costAddOn));
  }

  cancel(): void {
    this.dialogRef.close();
  }

  save(): void {
    const formData = {
      productName: this.addProduct.controls.productName.value,
      usd: this.addProduct.controls.usd.value,
      density: this.addProduct.controls.density.value,
      used: this.addProduct.controls.used.value,
      waste: this.addProduct.controls.waste.value,
      avgDensity: this.addProduct.controls.avgDensity.value,
      costAddOn: this.addProduct.controls.costAddOn.value,
    }
    this.dialogRef.close(formData);
  }
}
