import { createAction, props } from "@ngrx/store";

export const loadAttributeGroup = createAction(
    '[Product Template Component] Load Attribute Groups'
)

export const attributeGroupLoaded = createAction(
    '[Product Template Component] Attribute Groups Loaded',
    props<{ attributeGroup: any }>()
)

export const resetAttributeGroup = createAction(
    '[Product Template Component] Reset Attribute Groups'
)

export const loadAttributeList = createAction(
    '[Product Template Component] Load Attribute List'
)

export const attributeListLoaded = createAction(
    '[Product Template Component]  Attribute List Loaded',
    props<{ attributeList: any }>()
)

export const resetAttributeList = createAction(
    '[Product Template Component] Reset Attribute List'
)

export const loadAttributes = createAction(
    '[Product Template Component] Load Attributes'
)

export const attributesLoaded = createAction(
    '[Product Template Component]  Attributes Loaded',
    props<{ attributes: any }>()
)

export const resetAttributes = createAction(
    '[Product Template Component] Reset Attributes'
)

export const loadProductType = createAction(
    '[Product Template Component] Load Product Type'
)

export const productTypeLoaded = createAction(
    '[Product Template Component]  Product Type Loaded',
    props<{ productType: any }>()
)

export const resetProductType = createAction(
    '[Product Template Component] Reset Product Type'
)

export const loadProcessList = createAction(
    '[Product Template Component] Load Process List'
)

export const processListLoaded = createAction(
    '[Product Template Component]  Process List Loaded',
    props<{ processList: any }>()
)

export const resetProcessList = createAction(
    '[Product Template Component] Reset Process List'
)

export const loadConversionCost = createAction(
    '[Product Template Component] Load Conversion Cost'
)

export const conversionCostLoaded = createAction(
    '[Product Template Component]  Conversion Cost Loaded',
    props<{ conversionCost: any }>()
)

export const resetConversionCost = createAction(
    '[Product Template Component] Reset Conversion Cost'
)

export const loadTableData = createAction(
    '[Product Template Component] Load Table Data'
)

export const tableDataLoaded = createAction(
    '[Product Template Component]  Table Data Loaded',
    props<{ tableData: any }>()
)
