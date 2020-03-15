import { combineReducers } from 'redux'
import equipment_clientReducer from './equipment_clientReducer';
import globalReducer from './globalReducer';
import reportReducer from './reportReducer';
import millConditionReducer from './millConditionReducer';
import photosReducer from './photosReducer';
import dataSheetReducer from './dataSheetReducer';
//states
const rootReducer = combineReducers({
    equipment_clientReducer,globalReducer,reportReducer,millConditionReducer,photosReducer,dataSheetReducer
})

export default rootReducer

