import { combineReducers } from 'redux';
import DetailsReducer from './DetailsReducer';
import ChartReducer from './ChartReducer';
import MineReducer from './MineReducer';
import MainReducer from './MainReducer';
import BookkeepReducer from './BookkeepReducer';
// import NavigationReducer from './NavigationReducer';


import Tabbar from '../../containers/tabbar/Tabbar';

const rootReducer = combineReducers({
    DetailsReducer: DetailsReducer,
    ChartReducer: ChartReducer,
    BookkeepReducer: BookkeepReducer,
    MineReducer: MineReducer,
    // NavigationReducer: NavigationReducer,
    MainReducer: MainReducer,
});

export default rootReducer;

