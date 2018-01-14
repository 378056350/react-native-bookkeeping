
import Tabbar from '../../containers/tabbar/Tabbar';

const reducer = (state, action) => {
    let newState;
    switch (action.type) {
      case 'Mine':
            newState = Tabbar.router.getStateForAction(
            NavigationActions.navigate({ routeName: 'Mine' }),   　// 通过navigat action 改变当前state
            state
        );
        break;
      default:
            newState = Tabbar.router.getStateForAction(action, state);
        break;
    }
    // const newState = Tabbar.router.getStateForAction(action, state);
    return newState || state;
};

export default reducer;