import { AnyAction } from "../../actions";
import { calculateCells } from "../../application/logic/calculateCells";
import {
  IRightClickState,
  rightClickReducer
} from "../../reducers/rightClickReducer";

export type RightClickReducerFactory = (
  state: IRightClickState,
  action: AnyAction
) => IRightClickState;

export const rightClickReducerFactory: RightClickReducerFactory = (
  state,
  action
) => rightClickReducer(state, action, calculateCells);
