import { Board } from './board';
import {
  getCorner,
  getCorners,
  TileCorner,
  TileCornerDir,
  TileEdgeDir,
  getEdge,
  getEdges,
  TileEdge,
  getCornerEdges,
  getEdgeEndpoints
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

describe('getEdge', () => {
  it('should return the right edges for a tile, given a direction', () => {
    const board = new Board(0);
    const tiles = board.getTiles();
    const tile = tiles['0,0,0'];

    // Each edge has to match with the expected edge in the tile we get it from
    const cornerNE = getEdge(tile, TileEdgeDir.NE, tiles);
    const expectNE = tile.getEdges()[TileEdge.NE];
    expect(cornerNE).toBe(expectNE);

    const cornerE = getEdge(tile, TileEdgeDir.E, tiles);
    const expectE = tiles['1,0,-1'].getEdges()[TileEdge.W];
    expect(cornerE).toBe(expectE);

    const cornerSE = getEdge(tile, TileEdgeDir.SE, tiles);
    const expectSE = tiles['0,1,-1'].getEdges()[TileEdge.NW];
    expect(cornerSE).toBe(expectSE);

    const cornerSW = getEdge(tile, TileEdgeDir.SW, tiles);
    const expectSW = tiles['-1,1,0'].getEdges()[TileEdge.NE];
    expect(cornerSW).toBe(expectSW);

    const cornerW = getEdge(tile, TileEdgeDir.W, tiles);
    const expectW = tile.getEdges()[TileEdge.W];
    expect(cornerW).toBe(expectW);

    const cornerNW = getEdge(tile, TileEdgeDir.NW, tiles);
    const expectNW = tile.getEdges()[TileEdge.NW];
    expect(cornerNW).toBe(expectNW);
  });
});

describe('getEdges', () => {
  it('should return all the edges for a tile', () => {
    const board = new Board(0);
    const tiles = board.getTiles();
    const tile = tiles['0,0,0'];

    const edges = getEdges(tile, tiles);
    const expectNE = tile.getEdges()[TileEdge.NE];
    const expectE = tiles['1,0,-1'].getEdges()[TileEdge.W];
    const expectSE = tiles['0,1,-1'].getEdges()[TileEdge.NW];
    const expectSW = tiles['-1,1,0'].getEdges()[TileEdge.NE];
    const expectW = tile.getEdges()[TileEdge.W];
    const expectNW = tile.getEdges()[TileEdge.NW];

    expect(edges).toStrictEqual([
      expectNE,
      expectE,
      expectSE,
      expectSW,
      expectW,
      expectNW
    ]);
  });
});

describe('getCornerEdges', () => {
  // If you get lost with the coords, use
  // https://www.redblobgames.com/grids/hexagons/#coordinates-cube
  it('should return the edges for any given corner', () => {
    const board = new Board(0);
    const tiles = board.getTiles();
    const tile = tiles['0,0,0'];

    let edges = getCornerEdges(tile, TileCornerDir.N, tiles);
    expect(edges[0]).toBe(tiles['1,-1,0'].getEdges()[TileEdge.W]);
    expect(edges[1]).toBe(tiles['0,0,0'].getEdges()[TileEdge.NE]);
    expect(edges[2]).toBe(tiles['0,0,0'].getEdges()[TileEdge.NW]);

    edges = getCornerEdges(tile, TileCornerDir.NE, tiles);
    expect(edges[0]).toBe(tiles['1,0,-1'].getEdges()[TileEdge.NW]);
    expect(edges[1]).toBe(tiles['1,0,-1'].getEdges()[TileEdge.W]);
    expect(edges[2]).toBe(tiles['0,0,0'].getEdges()[TileEdge.NE]);

    edges = getCornerEdges(tile, TileCornerDir.SE, tiles);
    expect(edges[0]).toBe(tiles['1,0,-1'].getEdges()[TileEdge.W]);
    expect(edges[1]).toBe(tiles['0,1,-1'].getEdges()[TileEdge.NE]);
    expect(edges[2]).toBe(tiles['0,1,-1'].getEdges()[TileEdge.NW]);

    edges = getCornerEdges(tile, TileCornerDir.S, tiles);
    expect(edges[0]).toBe(tiles['0,1,-1'].getEdges()[TileEdge.NW]);
    expect(edges[1]).toBe(tiles['0,1,-1'].getEdges()[TileEdge.W]);
    expect(edges[2]).toBe(tiles['-1,1,0'].getEdges()[TileEdge.NE]);

    edges = getCornerEdges(tile, TileCornerDir.SW, tiles);
    expect(edges[0]).toBe(tiles['0,0,0'].getEdges()[TileEdge.W]);
    expect(edges[1]).toBe(tiles['-1,1,0'].getEdges()[TileEdge.NE]);
    expect(edges[2]).toBe(tiles['-1,1,0'].getEdges()[TileEdge.NW]);

    edges = getCornerEdges(tile, TileCornerDir.NW, tiles);
    expect(edges[0]).toBe(tiles['0,0,0'].getEdges()[TileEdge.NW]);
    expect(edges[1]).toBe(tiles['0,0,0'].getEdges()[TileEdge.W]);
    expect(edges[2]).toBe(tiles['-1,0,1'].getEdges()[TileEdge.NE]);
  });
});

describe('getEdgeEndpoints', () => {
  it('should return the corners for any given edge', () => {
    const board = new Board(0);
    const tiles = board.getTiles();
    const tile = tiles['0,0,0'];

    let corners = getEdgeEndpoints(tile, TileEdgeDir.NE, tiles);
    expect(corners[0]).toBe(tiles['0,0,0'].getCorners()[TileCorner.N]);
    expect(corners[1]).toBe(tiles['1,-1,0'].getCorners()[TileCorner.S]);

    corners = getEdgeEndpoints(tile, TileEdgeDir.E, tiles);
    expect(corners[0]).toBe(tiles['1,-1,0'].getCorners()[TileCorner.S]);
    expect(corners[1]).toBe(tiles['0,1,-1'].getCorners()[TileCorner.N]);

    corners = getEdgeEndpoints(tile, TileEdgeDir.SE, tiles);
    expect(corners[0]).toBe(tiles['0,1,-1'].getCorners()[TileCorner.N]);
    expect(corners[1]).toBe(tiles['0,0,0'].getCorners()[TileCorner.S]);

    corners = getEdgeEndpoints(tile, TileEdgeDir.SW, tiles);
    expect(corners[0]).toBe(tiles['0,0,0'].getCorners()[TileCorner.S]);
    expect(corners[1]).toBe(tiles['-1,1,0'].getCorners()[TileCorner.N]);

    corners = getEdgeEndpoints(tile, TileEdgeDir.W, tiles);
    expect(corners[0]).toBe(tiles['-1,1,0'].getCorners()[TileCorner.N]);
    expect(corners[1]).toBe(tiles['0,-1,1'].getCorners()[TileCorner.S]);

    corners = getEdgeEndpoints(tile, TileEdgeDir.NW, tiles);
    expect(corners[0]).toBe(tiles['0,-1,1'].getCorners()[TileCorner.S]);
    expect(corners[1]).toBe(tiles['0,0,0'].getCorners()[TileCorner.N]);
  });
});
