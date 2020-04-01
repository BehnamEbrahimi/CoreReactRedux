import { combineReducers } from 'redux';
import { IValue } from './../models/value';
import valuesReducer from './valuesReducer';

export interface IStore {
  values: IValue[];
}

export default combineReducers<IStore>({
  values: valuesReducer
});
