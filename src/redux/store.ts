import mainReducer from './mainReducer';
import { createStore, Store, AnyAction } from 'redux';
import { composeWithDevTools } from "redux-devtools-extension";
import { persistStore, persistReducer } from "redux-persist";
import storage from 'redux-persist/lib/storage';
import { RootState } from '../types/RooState';


const persistConfig = {
    key: 'root',
    storage
};

const persisterReducer = persistReducer(persistConfig, mainReducer);


export let store: Store<RootState, AnyAction> = createStore(persisterReducer, composeWithDevTools());
export let persistor = persistStore(store);
