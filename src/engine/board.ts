import { GridGenerator } from 'react-hexgrid';
import { initTiles, Tiles } from './boardHelpers';
import { Player } from './player';
import {
  getCorner,
  getEdge,
  TileCornerDir,
  TileEdgeDir,
  assertPlaceRoad
} from './tileHelpers';
import { Hex, GameConfig } from './types';

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

  placeSettlement(tileId: string, dir: TileCornerDir, player: Player) {
    const corner = getCorner(this.tiles[tileId], dir, this.tiles);
    // assertPlaceSettlement(); TODO
    corner.placeSettlement(player);
  }

  placeCity(tileId: string, dir: TileCornerDir, player: Player) {
    const corner = getCorner(this.tiles[tileId], dir, this.tiles);
    // assertPlaceCity(); TODO
    corner.placeCity(player);
  }

  placeRoad(tileId: string, dir: TileEdgeDir, player: Player) {
    const edge = getEdge(this.tiles[tileId], dir, this.tiles);
    assertPlaceRoad();
    edge.placeRoad(player);
  }
}
