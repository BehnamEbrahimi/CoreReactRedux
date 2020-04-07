import { ActionTypes } from "./types";
import { IOpenModalAction, ICloseModalAction } from "./types/modalActions";

// Open Modal
export type IOpenModal = (content: any) => void;
export const openModal = (content: any): IOpenModalAction => ({
  type: ActionTypes.OPEN_MODAL,
  payload: content,
});

// Close Modal
export type ICloseModal = () => void;
export const closeModal = (): ICloseModalAction => ({
  type: ActionTypes.CLOSE_MODAL,
});
