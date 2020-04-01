import { IValue } from './../models/value';
import { IAction, ActionTypes } from './../actions/types';

export default function(state: IValue[] = [], action: IAction) {
  switch (action.type) {
    case ActionTypes.fetchValues:
      return action.payload;

    case ActionTypes.deleteValue:
      return state.filter(value => value.id !== action.payload);

    default:
      return state;
  }
}
