import { Board } from './board';
import {
  getCorner,
  getCorners,
  TileCorner,
  TileCornerDir
} from './tileHelpers';

describe('getCorner', () => {
  it('should return the right corners for a tile, given a direction', () => {
    const board = new Board(0);
    const tiles = board.getTiles();
    const tile = tiles['0,0,0'];

    // Each corner has to match with the expected corner in the tile we get it from
    const cornerN = getCorner(tile, TileCornerDir.N, tiles);
    const expectN = tile.getCorners()[TileCorner.N];
    expect(cornerN).toBe(expectN);

    const cornerNE = getCorner(tile, TileCornerDir.NE, tiles);
    const expectNE = tiles['1,-1,0'].getCorners()[TileCorner.S];
    expect(cornerNE).toBe(expectNE);

    const cornerSE = getCorner(tile, TileCornerDir.SE, tiles);
    const expectSE = tiles['0,1,-1'].getCorners()[TileCorner.N];
    expect(cornerSE).toBe(expectSE);

    const cornerS = getCorner(tile, TileCornerDir.S, tiles);
    const expectS = tile.getCorners()[TileCorner.S];
    expect(cornerS).toBe(expectS);

    const cornerSW = getCorner(tile, TileCornerDir.SW, tiles);
    const expectSW = tiles['-1,1,0'].getCorners()[TileCorner.N];
    expect(cornerSW).toBe(expectSW);

    const cornerNW = getCorner(tile, TileCornerDir.NW, tiles);
    const expectNW = tiles['0,-1,1'].getCorners()[TileCorner.S];
    expect(cornerNW).toBe(expectNW);
  });
});

describe('getCorners', () => {
  it('should return all the corners for a tile', () => {
    const board = new Board(0);
    const tiles = board.getTiles();
    const tile = tiles['0,0,0'];

    const corners = getCorners(tile, tiles);
    const expectN = tile.getCorners()[TileCorner.N];
    const expectNE = tiles['1,-1,0'].getCorners()[TileCorner.S];
    const expectSE = tiles['0,1,-1'].getCorners()[TileCorner.N];
    const expectS = tile.getCorners()[TileCorner.S];
    const expectSW = tiles['-1,1,0'].getCorners()[TileCorner.N];
    const expectNW = tiles['0,-1,1'].getCorners()[TileCorner.S];

    expect(corners).toStrictEqual([
      expectN,
      expectNE,
      expectSE,
      expectS,
      expectSW,
      expectNW
    ]);
  });
});
