import { Dispatch } from 'redux';

import api from '../apis/api';
import { ActionTypes } from './types';
import { IValue } from './../models/value';

export interface IFetchValueAction {
  type: ActionTypes.fetchValues;
  payload: IValue[];
}

export const fetchValues = () => async (dispatch: Dispatch) => {
  const { data: values } = await api.get<IValue[]>('/values');

  dispatch<IFetchValueAction>({
    type: ActionTypes.fetchValues,
    payload: values
  });
};

export interface IDeleteValueAction {
  type: ActionTypes.deleteValue;
  payload: number;
}

export const deleteValue = (id: number) => (dispatch: Dispatch) => {
  dispatch<IDeleteValueAction>({
    type: ActionTypes.deleteValue,
    payload: id
  });
};
