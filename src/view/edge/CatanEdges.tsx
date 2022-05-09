import { Component } from 'react';
import PropTypes from 'prop-types';
import { Board } from '../../engine/board';
import { Hex } from '../../engine/types';
import { TileCorner, TileEdge } from '../../engine/tileHelpers';
import { HexUtils } from 'react-hexgrid';
import { BaseTile, TileType } from '../../engine/tile';
import { Edge as EdgeData } from '../../engine/edge';
import { Edge } from './CatanEdge';

function shouldRenderEdge(tile: BaseTile, hex: Hex, edge: TileEdge): boolean {
  return true;
  return (
    tile.getTileType() === TileType.TILE ||
    (hex.r > 0 && corner === TileCorner.N) ||
    (hex.r < 0 && corner === TileCorner.S)
  );
}

interface Props {
  hexagons: Hex[];
  board: Board;
  onClick: (Edge: EdgeData, tile: BaseTile) => void;
}

export class Edges extends Component<Props> {
  static contextTypes = {
    layout: PropTypes.object
  };

  render() {
    const { layout } = this.context;
    const { board, hexagons, onClick } = this.props;

    return (
      hexagons
        // Get every hex coords and tile data
        .map((hex) => ({
          hexCoords: HexUtils.hexToPixel(hex, layout),
          tile: board.getTile(hex),
          renderNE: shouldRenderEdge(board.getTile(hex), hex, TileEdge.NE),
          renderNW: shouldRenderEdge(board.getTile(hex), hex, TileEdge.NW),
          renderW: shouldRenderEdge(board.getTile(hex), hex, TileEdge.W)
        }))
        // Render
        .map(({ hexCoords, tile, renderNE, renderNW, renderW }, i: number) => (
          <>
            {renderW && (
              <Edge
                key={`edge-${i}-W`}
                edge={tile.getEdges()[TileEdge.W]}
                tile={tile}
                coords={{
                  x: hexCoords.x + layout.size.x / 1.15 - 0.35,
                  y: hexCoords.y - layout.size.y / 2
                }}
                height={layout.size.y}
                onClick={onClick}
              />
            )}
          </>
        ))
    );
  }
}
