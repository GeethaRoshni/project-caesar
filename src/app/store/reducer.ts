import { createReducer, on } from "@ngrx/store"
import { CoreActions } from "./action-types";

export interface CoreState {
    attributeGroupsData: any;
    isAttributeGroupsReset: boolean;
    productTypeData: any;
    isproductTypeReset: boolean;
    attributeListData: any;
    isAttributeListReset: boolean;
    attributesData: any;
    isAttributesReset: boolean;
    processList: any;
    isProcessListReset: boolean;
    conversionCostData: any;
    isConversionCostReset: boolean;
    tableData: any;
}

export const initialState: CoreState = {
    attributeGroupsData: null,
    isAttributeGroupsReset: false,
    productTypeData: null,
    isproductTypeReset: false,
    attributeListData: null,
    isAttributeListReset: false,
    attributesData: null,
    isAttributesReset: false,
    processList: null,
    isProcessListReset: false,
    conversionCostData: null,
    isConversionCostReset: false,
    tableData: null
}

export const coreStateReducer = createReducer(
    initialState,
    on(CoreActions.attributeGroupLoaded, (state, action) => {
        return {
            ...state,
            attributeGroupsData: action.attributeGroup,
            isAttributeGroupsReset: true
        }
    }),
    on(CoreActions.resetAttributeGroup, (state) => {
        return {
            ...state,
            isAttributeGroupsReset: false
        }
    }),
    on(CoreActions.attributeListLoaded, (state, action) => {
        return {
            ...state,
            attributeListData: action.attributeList,
            isAttributeListReset: true
        }
    }),
    on(CoreActions.resetAttributeList, (state) => {
        return {
            ...state,
            isAttributeListReset: false
        }
    }),
    on(CoreActions.attributesLoaded, (state, action) => {
        return {
            ...state,
            attributesData: action.attributes,
            isAttributesReset: true
        }
    }),
    on(CoreActions.resetAttributes, (state) => {
        return {
            ...state,
            isAttributesReset: false
        }
    }),
    on(CoreActions.productTypeLoaded, (state, action) => {
        return {
            ...state,
            productTypeData: action.productType,
            isproductTypeReset: true
        }
    }),
    on(CoreActions.resetProductType, (state) => {
        return {
            ...state,
            isproductTypeReset: false
        }
    }),
    on(CoreActions.processListLoaded, (state, action) => {
        return {
            ...state,
            processList: action.processList,
            isProcessListReset: true
        }
    }),
    on(CoreActions.resetProcessList, (state) => {
        return {
            ...state,
            isProcessListReset: false
        }
    }),
    on(CoreActions.conversionCostLoaded, (state, action) => {
        return {
            ...state,
            conversionCostData: action.conversionCost,
            isConversionCostReset: true
        }
    }),
    on(CoreActions.resetConversionCost, (state) => {
        return {
            ...state,
            isConversionCostReset: false
        }
    }),
    on(CoreActions.tableDataLoaded, (state, action) => {
        return {
            ...state,
            tableData: action.tableData
        }
    })
);

export function coreReducer(state, action) {
    return coreStateReducer(state, action);
}