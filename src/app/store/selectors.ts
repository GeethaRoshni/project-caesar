import { createSelector } from "@ngrx/store";
import { CoreState } from "./reducer";

const coreFeatureSelector = state => state.coreState as CoreState;

export const selectAttributeGroups = createSelector(
    coreFeatureSelector,
    state => state.attributeGroupsData
);

export const selectResetAttributeGroups = createSelector(
    coreFeatureSelector,
    state => state.isAttributeGroupsReset
);

export const selectAttributeList = createSelector(
    coreFeatureSelector,
    state => state.attributeListData
);

export const selectResetAttributeList = createSelector(
    coreFeatureSelector,
    state => state.isAttributeListReset
);

export const selectAttributes = createSelector(
    coreFeatureSelector,
    state => state.attributesData
);

export const selectResetAttributes = createSelector(
    coreFeatureSelector,
    state => state.isAttributesReset
);

export const selectProductType = createSelector(
    coreFeatureSelector,
    state => state.productTypeData
);

export const selectResetProductType = createSelector(
    coreFeatureSelector,
    state => state.isproductTypeReset
);

export const selectProcessList = createSelector(
    coreFeatureSelector,
    state => state.processList
);

export const selectResetProcessList = createSelector(
    coreFeatureSelector,
    state => state.isProcessListReset
);

export const selectConversionCost = createSelector(
    coreFeatureSelector,
    state => state.conversionCostData
);

export const selectResetConversionCost = createSelector(
    coreFeatureSelector,
    state => state.isConversionCostReset
);

export const selectTableData = createSelector(
    coreFeatureSelector,
    state => state.tableData
);