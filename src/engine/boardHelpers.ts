import { OffsetTile, Tile, BaseTile } from "./tile";
import { GameConfig, Hex } from "./types";
import { HexUtils } from "react-hexgrid";
import { Corner } from "./corner";
import { Edge } from "./edge";

export type Tiles = { [id: string]: BaseTile };

function initEmptyTiles(hexes: Hex[], boardRadius: number): Tiles {
  const tiles: Tiles = {};

  hexes.forEach((hex) => {
    const id = HexUtils.getID(hex);
    // any tile outside of the board radius will be considered the offset,
    // only if it is part of the immediate border. Further tiles will throw.
    const largestCoord = Math.max(...[hex.q, hex.r, hex.s].map(Math.abs));

    if (largestCoord < boardRadius + 1) {
      tiles[id] = new Tile();
    } else if (largestCoord === boardRadius + 1) {
      tiles[id] = new OffsetTile();
    } else {
      throw new Error(
        "Unexpected hexagons outside the offset ring, got coord:" + id
      );
    }
  });

  return tiles;
}

export function initTiles(
  hexes: Hex[],
  boardRadius: number,
  config?: GameConfig
): Tiles {
  const tiles = initEmptyTiles(hexes, boardRadius);

  if (config) {
    // TODO: initialize game config (aka, tile types, ports, etc...)
  }

  return tiles;
}

export function getCorner(
  tile: BaseTile,
  dir: TileCornerDir,
  tiles: Tiles
): Corner {}

export function getEdge(tile: BaseTile, dir: TileEdgeDir, tiles: Tiles): Edge {}
