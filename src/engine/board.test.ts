import { Board } from './board';
import { TileType } from './tile';

describe('board', () => {
  it('should initialize hexagons with offset', () => {
    let board = new Board(0);
    expect(board.getHexes()).toHaveLength(7);
    board = new Board(1);
    expect(board.getHexes()).toHaveLength(19);
  });

  it('should init all catan tiles and offset tiles', () => {
    const board = new Board(0);
    const tiles = board.getTiles();
    expect(tiles['0,0,0'].getTileType()).toEqual(TileType.TILE);
    expect(tiles['-1,0,1'].getTileType()).toEqual(TileType.OFFSET);
    expect(tiles['0,-1,1'].getTileType()).toEqual(TileType.OFFSET);
    expect(tiles['-1,0,1'].getTileType()).toEqual(TileType.OFFSET);
    expect(tiles['0,1,-1'].getTileType()).toEqual(TileType.OFFSET);
    expect(tiles['1,-1,0'].getTileType()).toEqual(TileType.OFFSET);
    expect(tiles['1,0,-1'].getTileType()).toEqual(TileType.OFFSET);
  });
});
