import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import createHistory from "history/createBrowserHistory";
import { routerReducer, routerMiddleware } from "react-router-redux";
import thunk from "redux-thunk";
import createSagaMiddleware from "redux-saga";
import reducers from "../redux/reducers";
import rootSaga from "../redux/sagas";

const history = createHistory();
const routeMiddleware = routerMiddleware(history);
const middlewares = [thunk, routeMiddleware];

const store = createStore(
  combineReducers({
    ...reducers,
    router: routerReducer
  }),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  compose(applyMiddleware(...middlewares))
);
export { store, history };
