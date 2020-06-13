import { createStore, applyMiddleware } from 'redux'
import { persistStore, persistReducer, PersistConfig } from 'redux-persist'
import createSagaMiddleware from 'redux-saga'
import storage from 'redux-persist/lib/storage'

import rootReducer, { AppState } from './ducks'
import { rootSaga } from './sagas/root'

const persistConfig: PersistConfig<AppState> = {
  key: 'pizza@app',
  storage,
  whitelist: ['cart', 'config', 'products', 'user'],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const sagaMiddleware = createSagaMiddleware()

export const store = createStore(
  persistedReducer,
  applyMiddleware(sagaMiddleware)
)
export const persistor = persistStore(store)

sagaMiddleware.run(rootSaga)
