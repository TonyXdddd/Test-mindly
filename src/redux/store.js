import { createStore, combineReducers, applyMiddleware  } from "redux";
import thunk from 'redux-thunk';
import { visitCreationReducer } from "./visitCreationPageReducer";


const reducer = combineReducers({
  visitCreationReducer: visitCreationReducer,
});

export const store = createStore(reducer, applyMiddleware(thunk));
