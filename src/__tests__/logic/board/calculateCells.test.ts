import { calculateCells } from "../../../application/logic/board/calculateCells";
import { generateEmptyField } from "../../../application/logic/board/generateEmptyField";
import { placeMines } from "../../../application/logic/board/placeMines";
import { Field, ICell } from "../../../application/reducers/toggleCellReducer";
import { generateMinesFactory } from "../../../factories/logic/board/generateMinesFactory";
import { recalculateMinesAroundFactory } from "../../../factories/logic/board/recalculateMinesAroundFactory";

it("should return correct flags number", () => {
  const cell = {
    row: 0,
    column: 0,
    isMine: false,
    minesAround: 0,
    open: false,
    flag: false,
    questionMark: false
  };
  const flagCell: ICell = { ...cell, flag: true };
  const emptyField = [[cell, cell], [cell, cell]];
  const field: Field = [[cell, flagCell], [flagCell, flagCell]];
  expect(calculateCells(emptyField, "flag")).toBe(0);
  expect(calculateCells(field, "flag")).toBe(3);
});

it("should return correct mines number", () => {
  const emptyField = generateEmptyField(20, 20);
  const mines = generateMinesFactory(
    { width: 20, height: 20, mines: 117 },
    "hello"
  );
  const fieldWithMines = recalculateMinesAroundFactory(
    placeMines(emptyField, mines)
  );
  expect(calculateCells(emptyField, "mine")).toBe(0);
  expect(calculateCells(fieldWithMines, "mine")).toBe(117);
});
