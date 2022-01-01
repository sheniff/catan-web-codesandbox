import { GridGenerator } from "react-hexgrid";
import { initTiles, Tiles } from "./boardHelpers";
import { Hex, GameConfig } from "./types";

/**
 * This will be the class for a Catan Board,
 * also the main entry point for most actions against the game board.
 *
 * It will:
 * - Store the basic board hexagons, generated using GridGenerator
 * - Store the tiles info, a dictionary of Tiles, keyed by each hex ID
 * - Will API all the logic to interact with the board, such as
 * -- initialize the game from a given configuration
 * -- board.addSettlement(tile (coords?), corner, player)
 * -- board.addRoad(tile (coords?), edge, player)
 * -- (all the associated checking methods)
 */

export class Board {
  private hexagons: Hex[];
  private tiles: Tiles;
  /**
   * TODO: Rethinking this
   * I'm gonna store an extra ring around the "official board" to be considered
   * the "border" of the board. Those will be of class BorderTile, which contains only
   * - type: Border
   * - corners[]
   * - edges[]
   * this will simplify the logic as we can still get the hexes for those positions
   * but then we'll never render them...
   */
  // These are the corners and edges that don't belong to any tile.
  // E.g, NW corner of northern-most tile,
  // which is actually (q, r-1, S) when r-1 < 0...
  // Check https://www.redblobgames.com/grids/parts/#hexagon-relationships

  constructor(size: number, config?: GameConfig) {
    this.hexagons = GridGenerator.hexagon(size + 1); // +1 for the overflow ring
    this.tiles = initTiles(this.hexagons, size, config);
  }

  getHexes() {
    return this.hexagons;
  }

  getTiles() {
    return this.tiles;
  }
}
