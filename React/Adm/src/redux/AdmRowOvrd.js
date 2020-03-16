
import { getAsyncTypes } from '../helpers/actionType'
import * as AdmRowOvrdService from '../services/AdmRowOvrdService'
import { RintagiScreenRedux, initialRintagiScreenReduxState } from './_ScreenReducer'
const Label = {
  PostToAp: 'Post to AP',
}
class AdmRowOvrdRedux extends RintagiScreenRedux {
  allowTmpDtl = false;
  constructor() {
    super();
    this.ActionApiNameMapper = {
      'GET_SEARCH_LIST': 'GetAdmRowOvrd17List',
      'GET_MST': 'GetAdmRowOvrd17ById',
      'GET_DTL_LIST': 'GetAdmRowOvrd17DtlById',
    }
    this.ScreenDdlDef = [
      { columnName: 'ScreenId238', payloadDdlName: 'ScreenId238List', keyName: 'ScreenId238', labelName: 'ScreenId238Text', forMst: true, isAutoComplete: true, apiServiceName: 'GetScreenId238List', actionTypeName: 'GET_DDL_ScreenId238' },
      { columnName: 'ReportId238', payloadDdlName: 'ReportId238List', keyName: 'ReportId238', labelName: 'ReportId238Text', forMst: true, isAutoComplete: true, apiServiceName: 'GetReportId238List', actionTypeName: 'GET_DDL_ReportId238' },
      { columnName: 'RowAuthId238', payloadDdlName: 'RowAuthId238List', keyName: 'RowAuthId238', labelName: 'RowAuthId238Text', forMst: true, isAutoComplete: false, apiServiceName: 'GetRowAuthId238List', actionTypeName: 'GET_DDL_RowAuthId238' },
      { columnName: 'AllowSel238', payloadDdlName: 'AllowSel238List', keyName: 'AllowSel238', labelName: 'AllowSel238Text', forMst: true, isAutoComplete: false, apiServiceName: 'GetAllowSel238List', actionTypeName: 'GET_DDL_AllowSel238' },
      { columnName: 'AndCondition239', payloadDdlName: 'AndCondition239List', keyName: 'AndCondition239', labelName: 'AndCondition239Text', forMst: false, isAutoComplete: false, apiServiceName: 'GetAndCondition239List', actionTypeName: 'GET_DDL_AndCondition239' },
      { columnName: 'PermKeyId239', payloadDdlName: 'PermKeyId239List', keyName: 'PermKeyId239', labelName: 'PermKeyId239Text', forMst: false, isAutoComplete: false, apiServiceName: 'GetPermKeyId239List', actionTypeName: 'GET_DDL_PermKeyId239' },
      { columnName: 'SelLevel239', payloadDdlName: 'SelLevel239List', keyName: 'SelLevel239', labelName: 'SelLevel239Text', forMst: false, isAutoComplete: false, apiServiceName: 'GetSelLevel239List', actionTypeName: 'GET_DDL_SelLevel239' },
    ]
    this.ScreenOnDemandDef = [

    ]
    this.ScreenDocumentDef = [

    ]
    this.ScreenCriDdlDef = [
      { columnName: 'ScreenId10', payloadDdlName: 'ScreenId10List', isAutoComplete: true, apiServiceName: 'GetScreenCriScreenId10List', actionTypeName: 'GET_DDL_CRIScreenId10' },
      { columnName: 'ReportId20', payloadDdlName: 'ReportId20List', isAutoComplete: true, apiServiceName: 'GetScreenCriReportId20List', actionTypeName: 'GET_DDL_CRIReportId20' },
    ]
    this.SearchActions = {
      ...[...this.ScreenDdlDef].reduce((a, v) => { a['Search' + v.columnName] = this.MakeSearchAction(v); return a; }, {}),
      ...[...this.ScreenCriDdlDef].reduce((a, v) => { a['SearchCri' + v.columnName] = this.MakeSearchAction(v); return a; }, {}),
      ...[...this.ScreenOnDemandDef].filter(f => f.type !== 'DocList' && f.type !== 'RefColumn').reduce((a, v) => { a['Get' + v.columnName] = this.MakeGetColumnOnDemandAction(v); return a; }, {}),
      ...[...this.ScreenOnDemandDef].filter(f => f.type === 'RefColumn').reduce((a, v) => { a['Get' + v.columnName] = this.MakeGetRefColumnOnDemandAction(v); return a; }, {}),
      ...this.MakePullUpOnDemandAction([...this.ScreenOnDemandDef].filter(f => f.type === 'RefColumn').reduce((a, v) => { a['GetRef' + v.refColumnName] = { dependents: [...((a['GetRef' + v.refColumnName] || {}).dependents || []), v] }; return a; }, {})),
      ...[...this.ScreenOnDemandDef].filter(f => f.type === 'DocList').reduce((a, v) => { a['Get' + v.columnName] = this.MakeGetDocumentListAction(v); return a; }, {}),
    }
    this.OnDemandActions = {
      ...[...this.ScreenDocumentDef].filter(f => f.type === 'Get').reduce((a, v) => { a['Get' + v.columnName + 'Content'] = this.MakeGetDocumentContentAction(v); return a; }, {}),
      ...[...this.ScreenDocumentDef].filter(f => f.type === 'Add').reduce((a, v) => { a['Add' + v.columnName + 'Content'] = this.MakeAddDocumentContentAction(v); return a; }, {}),
      ...[...this.ScreenDocumentDef].filter(f => f.type === 'Del').reduce((a, v) => { a['Del' + v.columnName + 'Content'] = this.MakeDelDocumentContentAction(v); return a; }, {}),
    }
    this.ScreenDdlSelectors = this.ScreenDdlDef.reduce((a, v) => { a[v.columnName] = this.MakeDdlSelectors(v); return a; }, {})
    this.ScreenCriDdlSelectors = this.ScreenCriDdlDef.reduce((a, v) => { a[v.columnName] = this.MakeCriDdlSelectors(v); return a; }, {})
    this.actionReducers = this.MakeActionReducers();
  }
  GetScreenName() { return 'AdmRowOvrd' }
  GetMstKeyColumnName(isUnderlining = false) { return isUnderlining ? 'RowOvrdId' : 'RowOvrdId238'; }
  GetDtlKeyColumnName(isUnderlining = false) { return isUnderlining ? 'RowOvrdPrmId' : 'RowOvrdPrmId239'; }
  GetPersistDtlName() { return this.GetScreenName() + '_Dtl'; }
  GetPersistMstName() { return this.GetScreenName() + '_Mst'; }
  GetWebService() { return AdmRowOvrdService; }
  GetReducerActionTypePrefix() { return this.GetScreenName(); };
  GetActionType(actionTypeName) { return getAsyncTypes(this.GetReducerActionTypePrefix(), actionTypeName); }
  GetInitState() {
    return {
      ...initialRintagiScreenReduxState,
      Label: {
        ...initialRintagiScreenReduxState.Label,
        ...Label,
      }
    }
  };

  GetDefaultDtl(state) {
    return (state || {}).NewDtl ||
    {
      RowOvrdPrmId239: null,
      AndCondition239: null,
      PermKeyId239: null,
      SelLevel239: null,
    }
  }
  ExpandMst(mst, state, copy) {
    return {
      ...mst,
      key: Date.now(),
      RowOvrdId238: copy ? null : mst.RowOvrdId238,
    }
  }
  ExpandDtl(dtlList, copy) {
    if (!copy) return dtlList;
    else if (!this.allowTmpDtl) return [];
    else {
      const now = Date.now();
      return dtlList.map((v, i) => {
        return {
          ...v,
          RowOvrdId238: null,
          RowOvrdPrmId239: null,
          TmpKeyId: now + i,
        }
      })
    };
  }

  SearchListToSelectList(state) {
    const searchList = ((state || {}).SearchList || {}).data || [];
    return searchList
      .map((v, i) => {
        return {
          key: v.key || null,
          value: v.labelL || v.label || ' ',
          label: v.labelL || v.label || ' ',
          labelR: v.labelR || ' ',
          detailR: v.detailR,
          detail: v.detail || '',
          idx: i,
          isSelected: v.isSelected,
        }
      })
  }
}

/* ReactRule: Redux Custom Function */

/* ReactRule End: Redux Custom Function */

/* helper functions */

export function ShowMstFilterApplied(state) {
  return !state
    || !state.ScreenCriteria
    || (state.ScreenCriteria.ScreenId10 || {}).LastCriteria
    || (state.ScreenCriteria.ReportId20 || {}).LastCriteria
    || state.ScreenCriteria.SearchStr;
}

export default new AdmRowOvrdRedux()
