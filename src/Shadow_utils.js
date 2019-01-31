import { isValid } from "./Board_utils";

const clearShadow = () => [
  [null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null]
];

const createShadow = (selectedTile, gridData) => {
  let gridDataShadow = clearShadow();
  let newShadow = gridDataShadow.map((row, rowIndex) => {
    return row.map((tile, colIndex) => {
      let tileRotate = 0;
      let tileFlipped = false;

      let validity = {
        zero: isValid(
          colIndex,
          rowIndex,
          selectedTile,
          0,
          false,
          "no",
          gridData
        ),
        ninety: isValid(
          colIndex,
          rowIndex,
          selectedTile,
          90,
          false,
          "no",
          gridData
        ),
        oneeighty: isValid(
          colIndex,
          rowIndex,
          selectedTile,
          180,
          false,
          "no",
          gridData
        ),
        twoseventy: isValid(
          colIndex,
          rowIndex,
          selectedTile,
          270,
          false,
          "no",
          gridData
        ),
        zeroflipped: isValid(
          colIndex,
          rowIndex,
          selectedTile,
          0,
          true,
          "no",
          gridData
        ),
        ninetyflipped: isValid(
          colIndex,
          rowIndex,
          selectedTile,
          90,
          true,
          "no",
          gridData
        ),
        gridData,
        oneeightyflipped: isValid(
          colIndex,
          rowIndex,
          selectedTile,
          180,
          true,
          "no",
          gridData
        ),
        twoseventyflipped: isValid(
          colIndex,
          rowIndex,
          selectedTile,
          270,
          true,
          "no",
          gridData
        )
      };
      let validTile = false;
      if (validity.zero.isValid) {
        tileRotate = 0;
        validTile = true;
      }
      if (validity.ninety.isValid) {
        tileRotate = 90;
        validTile = true;
      }
      if (validity.oneeighty.isValid) {
        tileRotate = 180;
        validTile = true;
      }
      if (validity.twoseventy.isValid) {
        tileRotate = 270;
        validTile = true;
      }
      if (validity.zeroflipped.isValid && selectedTile === 9) {
        tileRotate = 0;
        tileFlipped = true;
        validTile = true;
      }
      if (validity.ninetyflipped.isValid && selectedTile === 9) {
        tileRotate = 90;
        tileFlipped = true;
        validTile = true;
      }
      if (validity.oneeightyflipped.isValid && selectedTile === 9) {
        tileRotate = 180;
        tileFlipped = true;
        validTile = true;
      }
      if (validity.twoseventyflipped.isValid && selectedTile === 9) {
        tileRotate = 270;
        tileFlipped = true;
        validTile = true;
      }
      if (rowIndex < 1 || colIndex < 1 || rowIndex > 7 || colIndex > 7) {
        return null;
      }

      if (tile === null && validTile) {
        return {
          tile: selectedTile,
          rotation: tileRotate,
          flipped: tileFlipped
        };
      }
      return null;
    });
  });

  return newShadow;
};

export { clearShadow, createShadow };
