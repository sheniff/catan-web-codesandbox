import { BaseTile } from './tile';
import { Tiles } from './boardHelpers';
import { Corner } from './corner';
import { Edge } from './edge';
import { Player } from './player';

export function getTileCoords(tile: BaseTile): number[] {
  return tile.tileId.split(',').map(Number);
}

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
export enum TileEdge {
  NE = 0,
  NW = 1,
  W = 2
}

export enum TileEdgeDir {
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
  const [q, r, s] = getTileCoords(tile);
  const [qd, rd, sd, dird] = CornerLocations[dir]; // d = delta
  const tileId = [q + qd, r + rd, s + sd].join(',');
  return tiles[tileId].getCorners()[dird];
}

/**
 * Get all corners of a given tile
 */
export function getCorners(tile: BaseTile, tiles: Tiles): Corner[] {
  const [q, r, s] = getTileCoords(tile);
  return CornerLocations.map((l) => {
    const [qd, rd, sd, dird] = l;
    const tileId = [q + qd, r + rd, s + sd].join(',');
    return tiles[tileId].getCorners()[dird];
  });
}

export function getEdge(tile: BaseTile, dir: TileEdgeDir, tiles: Tiles): Edge {
  const [q, r, s] = getTileCoords(tile);
  const [qd, rd, sd, dird] = EdgeLocations[dir];
  const tileId = [q + qd, r + rd, s + sd].join(',');
  return tiles[tileId].getEdges()[dird];
}

export function getEdges(tile: BaseTile, tiles: Tiles): Edge[] {
  const [q, r, s] = getTileCoords(tile);
  return EdgeLocations.map((l) => {
    const [qd, rd, sd, dird] = l;
    const tileId = [q + qd, r + rd, s + sd].join(',');
    return tiles[tileId].getEdges()[dird];
  });
}

/**
 * Endpoints for each edge of a tile.
 * Corners given for the same tile (i.e, use `getCorner()` helper
 * to determine the final corner for the given direction).
 * The pair of endpoints are always listed in clock-wise order.
 * E.g, for TileEdgeDir.W -> [TileCornerDir.SW, TileCornerDir.NW]
 */
const edgeEndpoints = {
  [TileEdgeDir.NE]: [TileCornerDir.N, TileCornerDir.NE],
  [TileEdgeDir.E]: [TileCornerDir.NE, TileCornerDir.SE],
  [TileEdgeDir.SE]: [TileCornerDir.SE, TileCornerDir.S],
  [TileEdgeDir.SW]: [TileCornerDir.S, TileCornerDir.SW],
  [TileEdgeDir.W]: [TileCornerDir.SW, TileCornerDir.NW],
  [TileEdgeDir.NW]: [TileCornerDir.NW, TileCornerDir.N]
};

export function getEdgeEndpoints(
  tile: BaseTile,
  dir: TileEdgeDir,
  tiles: Tiles
): Corner[] {
  return edgeEndpoints[dir].map((d) => getCorner(tile, d, tiles));
}

/**
 * Corner protrudes are the edges that extends from a given corner.
 */
const cornerProtrudes: {
  [id: number]: [number, number, number, TileEdgeDir][];
} = {
  [TileCornerDir.N]: [
    [1, -1, 0, TileEdgeDir.W],
    [0, 0, 0, TileEdgeDir.NE],
    [0, 0, 0, TileEdgeDir.NW]
  ],
  [TileCornerDir.NE]: [
    [1, -1, 0, TileEdgeDir.SE],
    [0, 0, 0, TileEdgeDir.E],
    [0, 0, 0, TileEdgeDir.NE]
  ],
  [TileCornerDir.SE]: [
    [0, 0, 0, TileEdgeDir.E],
    [0, 1, -1, TileEdgeDir.NE],
    [0, 0, 0, TileEdgeDir.SE]
  ],
  [TileCornerDir.S]: [
    [0, 0, 0, TileEdgeDir.SE],
    [0, 1, -1, TileEdgeDir.W],
    [0, 0, 0, TileEdgeDir.SW]
  ],
  [TileCornerDir.SW]: [
    [0, 0, 0, TileEdgeDir.W],
    [0, 0, 0, TileEdgeDir.SW],
    [-1, 0, 1, TileEdgeDir.SE]
  ],
  [TileCornerDir.NW]: [
    [0, 0, 0, TileEdgeDir.NW],
    [0, 0, 0, TileEdgeDir.W],
    [-1, 0, 1, TileEdgeDir.NE]
  ]
};

export function getEdgeNeighbors(
  tile: BaseTile,
  dir: TileEdgeDir,
  tiles: Tiles
): Edge[] {
  const mainEdge = getEdge(tile, dir, tiles);
  const [q, r, s] = getTileCoords(tile);
  const edges: Edge[] = [];

  edgeEndpoints[dir].forEach((d) => {
    cornerProtrudes[d].forEach((edgeLoc) => {
      const [qd, rd, sd, dird] = edgeLoc;
      const tileId = [q + qd, r + rd, s + sd].join(',');
      const edge = tiles[tileId].getEdges()[dird];

      if (edge !== mainEdge) {
        edges.push(edge);
      }
    });
  });

  return edges;
}

/**
 * Checks that rules apply to place a road for a given player, those are
 * - a. One of (2) edge's corners is owned by given player (with settlement or city)
 * - b. There's at least one neighboring edge owned by same player
 */
export function assertPlaceRoad(
  tile: BaseTile,
  dir: TileEdgeDir,
  tiles: Tiles,
  player: Player
): void {
  // Assert player's settlement/city in any endpoint
  const [corner1, corner2] = getEdgeEndpoints(tile, dir, tiles);
  if (corner1.getOwner() === player || corner2.getOwner() === player) {
    return;
  }

  const neighbors = getEdgeNeighbors(tile, dir, tiles);
  if (!!neighbors.filter((edge) => edge.getOwner() === player).length) {
    return;
  }

  throw new Error(
    `[Road Assert] Invalid road for user ${player.getName()} in tile ${
      tile.tileId
    } at edge ${dir}. It violates game rules.`
  );
}
