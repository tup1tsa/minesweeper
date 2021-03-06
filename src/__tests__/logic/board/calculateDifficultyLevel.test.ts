import { ICellPosition } from "../../../application/actions/actions";
import { calculateDifficultyLevel } from "../../../application/logic/board/calculateDifficultyLevel";
import { generateEmptyField } from "../../../application/logic/board/generateEmptyField";
import { openCells } from "../../../application/logic/board/openCells";
import { placeMines } from "../../../application/logic/board/placeMines";
import { restoreField } from "../../../application/logic/board/restoreField";
import { findCellsToOpenContainer } from "../../../DIContainers/logic/board/findCellsToOpenContainer";
import { recalculateMinesAroundContainer } from "../../../DIContainers/logic/board/recalculateMinesAroundContainer";

it("should return 1 for empty board", () => {
  const field = generateEmptyField(5, 5);
  expect(
    calculateDifficultyLevel(
      field,
      findCellsToOpenContainer,
      openCells,
      restoreField
    )
  ).toBe(1);
});

it("should return 39 for the board from the wiki", () => {
  // page with board: http://www.minesweeper.info/wiki/3BV
  const board = generateEmptyField(16, 16);
  const mines: ICellPosition[] = [
    { row: 0, column: 0 },
    { row: 0, column: 1 },
    { row: 0, column: 6 },
    { row: 0, column: 9 },
    { row: 1, column: 0 },
    { row: 1, column: 1 },
    { row: 1, column: 6 },
    { row: 1, column: 12 },
    { row: 2, column: 0 },
    { row: 2, column: 5 },
    { row: 2, column: 8 },
    { row: 4, column: 12 },
    { row: 4, column: 13 },
    { row: 5, column: 13 },
    { row: 6, column: 2 },
    { row: 6, column: 6 },
    { row: 6, column: 7 },
    { row: 7, column: 5 },
    { row: 7, column: 11 },
    { row: 8, column: 5 },
    { row: 8, column: 6 },
    { row: 8, column: 7 },
    { row: 8, column: 13 },
    { row: 9, column: 5 },
    { row: 9, column: 6 },
    { row: 9, column: 7 },
    { row: 9, column: 12 },
    { row: 10, column: 4 },
    { row: 10, column: 6 },
    { row: 11, column: 2 },
    { row: 11, column: 3 },
    { row: 11, column: 6 },
    { row: 11, column: 11 },
    { row: 12, column: 2 },
    { row: 12, column: 12 },
    { row: 12, column: 15 },
    { row: 13, column: 0 },
    { row: 13, column: 5 },
    { row: 13, column: 9 },
    { row: 14, column: 2 }
  ];
  const boardWithMines = recalculateMinesAroundContainer(
    placeMines(board, mines)
  );
  expect(
    calculateDifficultyLevel(
      boardWithMines,
      findCellsToOpenContainer,
      openCells,
      restoreField
    )
  ).toBe(39);
});

it("should work for opened field", () => {
  const field = generateEmptyField(10, 10);
  const fieldWithMines = recalculateMinesAroundContainer(
    placeMines(field, [{ row: 0, column: 0 }, { row: 9, column: 9 }])
  );
  const openedField = openCells(
    fieldWithMines,
    findCellsToOpenContainer(fieldWithMines, { row: 6, column: 6 })
  );
  expect(
    calculateDifficultyLevel(
      openedField,
      findCellsToOpenContainer,
      openCells,
      restoreField
    )
  ).toBe(1);
});
