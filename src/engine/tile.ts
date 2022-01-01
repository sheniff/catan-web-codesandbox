import { Corner } from "./corner";
import { Edge } from "./edge";
import { Resource, Desert } from "./types";

export enum TileType {
  TILE = 1,
  OFFSET
}

export abstract class BaseTile {
  protected type: TileType;
  /* 
    Note to self: Each tile will store
    - 2 corners (N, S)
    - 3 edges (NE, NW, W)
    The corners and edges that fall outside of boundaries
    will be stored in OverflowEdges and OverflowCorners in
    Board.
  */
  private corners: Corner[];
  private edges: Edge[];

  get tileType() {
    return this.type;
  }
}

/**
 * Defines the special type of tile to wrap around the board, to store
 * offset corners and edges.
 */
export class OffsetTile extends BaseTile {
  protected type: TileType.OFFSET = TileType.OFFSET;
}

/**
 * Da tile.
 */
export class Tile extends BaseTile {
  protected type: TileType.TILE = TileType.TILE;
  private resource: Resource | Desert;
  private diceNumber: number;
  private hasRobber: boolean;
  // Following structure from
  // https://www.redblobgames.com/grids/parts/#hexagons

  constructor(resource?: Resource) {
    super();
    this.hasRobber = false;
    this.resource = resource;
    // TODO
    // this.corners = initCorners();
    // this.edges = initEdges();
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
