import { BaseTile } from './tile';
import { Tiles } from './boardHelpers';
import { Corner } from './corner';
import { Edge } from './edge';

/**
 * Tile's corners, and where to find them.
 *
 * Listed starting north and clock-wise, that is
 * [N, NE, SE,
 * S, SW, NW]
 *
 * Each entry is defined as the "coords modifier" to spot the
 * tile that contains the corner to use, and which one of its
 * corners we need to use.
 *
 * [q, r, s, TileCorner]
 *
 * E.g, for Tile in coords 0,0,0:
 * - N(orth) corner is owned by itself, therefore the modifier
 *    to locate the tile is all 0's -> [0, 0, 0, N]
 * - NE corner is owned by its north-eastern tile,
 *    southern corner -> [1, -1, 0, S]
 * - etc...
 */
export enum TileCorner {
  N = 0,
  S = 1
}

export enum TileCornerDir {
  N = 0,
  NE,
  SE,
  S,
  SW,
  NW
}

const CornerLocations: [number, number, number, TileCorner][] = [
  [0, 0, 0, TileCorner.N], // N
  [1, -1, 0, TileCorner.S], // NE
  [0, 1, -1, TileCorner.N], // SE
  [0, 0, 0, TileCorner.S], // S
  [-1, 1, 0, TileCorner.N], // SW
  [0, -1, 1, TileCorner.S] // NW
];

/**
 * Tile's Edges and were to find them.
 *
 * Same process as for corners.
 */
enum TileEdge {
  NE = 0,
  NW = 1,
  W = 2
}

enum TileEdgeDir {
  NE = 0,
  E,
  SE,
  SW,
  W,
  NW
}

const EdgeLocations: [number, number, number, TileEdge][] = [
  [0, 0, 0, TileEdge.NE], // NE
  [1, 0, -1, TileEdge.W], // E
  [0, 1, -1, TileEdge.NW], // SE
  [-1, 1, 0, TileEdge.NE], // SW
  [0, 0, 0, TileEdge.W], // W
  [0, 0, 0, TileEdge.NW] // NW
];

/**
 * Get tile corner, given its location (dir): N, NE, SE, etc...
 */
export function getCorner(
  tile: BaseTile,
  dir: TileCornerDir,
  tiles: Tiles
): Corner {
  const [q, r, s] = tile.tileId.split(',').map(Number);
  const [qd, rd, sd, dird] = CornerLocations[dir]; // d = delta
  const tileId = [q + qd, r + rd, s + sd].join(',');
  return tiles[tileId].getCorners()[dird];
}

/**
 * Get all corners of a given tile
 */
export function getCorners(tile: BaseTile, tiles: Tiles): Corner[] {
  const [q, r, s] = tile.tileId.split(',').map(Number);
  return CornerLocations.map((l) => {
    const [qd, rd, sd, dird] = l;
    const tileId = [q + qd, r + rd, s + sd].join(',');
    return tiles[tileId].getCorners()[dird];
  });
}

export function getEdge(tile: BaseTile, dir: TileEdgeDir, tiles: Tiles): Edge {
  // TODO
}

export function getEdges(tile: BaseTile, tiles: Tiles): Edge[] {
  // TODO
}
