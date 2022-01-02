import { Corner } from "./corner";
import { Edge } from "./edge";
import { Resource, Desert } from "./types";

export enum TileType {
  TILE = 1,
  OFFSET
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

enum TileCornerDir {
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

export abstract class BaseTile {
  protected type: TileType;
  /* 
    Note to self: Each tile will store
    - 2 corners (N, S)
    - 3 edges (NE, NW, W)
    The corners and edges that fall outside of boundaries
    will be stored in the "offset tiles" in Board.
  */
  protected corners: Corner[];
  protected edges: Edge[];

  constructor(type: TileType) {
    this.type = type;
    this.corners = this.initCorners();
    this.edges = this.initEdges();
  }

  get tileType() {
    return this.type;
  }

  getCorners() {
    return this.corners;
  }

  getEdges() {
    return this.edges;
  }

  private initCorners(): Corner[] {
    return [new Corner(), new Corner()];
  }

  private initEdges(): Edge[] {
    return [new Edge(), new Edge(), new Edge()];
  }
}

/**
 * Defines the special type of tile to wrap around the board, to store
 * offset corners and edges.
 */
export class OffsetTile extends BaseTile {
  constructor() {
    super(TileType.OFFSET);
  }
}

/**
 * Da tile.
 */
export class Tile extends BaseTile {
  private resource: Resource | Desert | undefined;
  private diceNumber: number | undefined;
  private hasRobber: boolean;
  // Following structure from
  // https://www.redblobgames.com/grids/parts/#hexagons

  constructor() {
    super(TileType.TILE);
    this.hasRobber = false;
  }

  setResource(r: Resource | Desert) {
    this.resource = r;
  }

  setDiceNumber(n: number) {
    this.diceNumber = n;
  }

  didMatchDice(diceNumber: number): boolean {
    return diceNumber === this.diceNumber;
  }
}
