import { takeEvery } from 'redux-saga'
import { call, put } from 'redux-saga/effects'

import { 
  saveAccountSagas,
  initializationDataSagas,
} from './dataSagas';

function* saga() {
  yield [
    call(saveAccountSagas),
    call(initializationDataSagas),
  ]
}

export default saga;