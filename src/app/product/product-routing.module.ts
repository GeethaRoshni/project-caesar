import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductTemplateComponent } from './product-template/product-template.component';
import { ProductTemplateAttributesGroupResolver } from './Resolver/product-template-attributes-group.resolver';
import { ProductTemplateAttributeListResolver } from './Resolver/product-template-attributes-list.resolver';
import { ProductTemplateAttributesResolver } from './Resolver/product-template-attributes.resolver';
import { ProductTemplateConversionCostResolver } from './Resolver/product-template-conversion-cost.resolver';
import { ProductTemplateProcessListResolver } from './Resolver/product-template-process-list.resolver';
import { ProductTemplateProductTypeResolver } from './Resolver/product-template-product-type.resolver';

const routes: Routes = [
  { path: '', redirectTo: 'product-template' },
  {
    path: 'product-template',
    component: ProductTemplateComponent,
    resolve: {
      attributeGroups: ProductTemplateAttributesGroupResolver,
      productType: ProductTemplateProductTypeResolver,
      attributeList: ProductTemplateAttributeListResolver,
      attributes: ProductTemplateAttributesResolver,
      processList: ProductTemplateProcessListResolver,
      conversionCost: ProductTemplateConversionCostResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
