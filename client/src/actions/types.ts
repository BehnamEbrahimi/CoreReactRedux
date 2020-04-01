import { IFetchValueAction, IDeleteValueAction } from './values';

export enum ActionTypes {
  fetchValues = 'fetchValues',
  deleteValue = 'deleteValue'
}

export type IAction = IFetchValueAction | IDeleteValueAction;
