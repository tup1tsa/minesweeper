import { AnyAction, TOGGLE_CELL } from "../actions";
import { CalculateCells } from "../logic/calculateCells";
import { IsWinCondition } from "../logic/isWinCondition";

export interface ICell {
  readonly column: number;
  readonly row: number;
  readonly open: boolean;
  readonly isMine: boolean;
  readonly flag: boolean;
  readonly questionMark: boolean;
  readonly minesAround: number;
}

export type Row = ReadonlyArray<ICell>;
export type Field = ReadonlyArray<Row>;

export interface IToggleCellReducerState {
  readonly gameTimeMs: number;
  readonly isFinished: boolean;
  readonly field: Field;
}

type ToggleCellReducer = (
  state: IToggleCellReducerState,
  action: AnyAction,
  functions: {
    calculateCells: CalculateCells;
    getTime: () => number;
    isWinCondition: IsWinCondition;
  }
) => IToggleCellReducerState;

export const toggleCellReducer: ToggleCellReducer = (
  state,
  action,
  functions
) => {
  if (action.type !== TOGGLE_CELL || state.isFinished) {
    return state;
  }
  const { row, column } = action.payload;
  if (
    !state.field[row] ||
    !state.field[row][column] ||
    state.field[row][column].open
  ) {
    return state;
  }
  const flagsCount = functions.calculateCells(state.field, "flag");
  const totalMines = functions.calculateCells(state.field, "mine");
  const shouldPlaceFlag =
    state.field[row][column].flag === false &&
    state.field[row][column].questionMark === false;
  if (flagsCount === totalMines && shouldPlaceFlag) {
    return state;
  }
  const newField = state.field.map((currentRow, rowIndex) => {
    if (rowIndex !== row) {
      return currentRow;
    }
    return currentRow.map((currentCell, columnIndex) => {
      if (columnIndex !== column) {
        return currentCell;
      }
      if (currentCell.flag) {
        return { ...currentCell, flag: false, questionMark: true };
      }
      if (currentCell.questionMark) {
        return { ...currentCell, questionMark: false };
      }
      return { ...currentCell, flag: true };
    });
  });
  if (functions.isWinCondition(newField)) {
    return {
      isFinished: true,
      field: newField,
      gameTimeMs: functions.getTime()
    };
  }
  return { ...state, field: newField };
};
