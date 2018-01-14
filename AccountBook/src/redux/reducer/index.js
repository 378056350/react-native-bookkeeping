import { combineReducers } from 'redux';
import DataReducer from './DataReducer';

const rootReducer = combineReducers({
    DataReducer: DataReducer,
});

export default rootReducer;

