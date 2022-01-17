import React from 'react';
import { HexGrid, Layout } from 'react-hexgrid';
import { Board } from '../engine/board';
import { Tile, TileType } from '../engine/tile';
import { CatanTile } from './CatanTile';

interface Props {
  board: Board;
}

export const CatanBoard: React.FC<Props> = ({ board }) => {
  const hexagons = board.getHexes();

  return (
    <HexGrid width={450} height={450} viewBox="-43 -50 100 100">
      <Layout size={{ x: 7, y: 7 }} spacing={1.02} flat={false}>
        {hexagons
          // Get tile for each hex
          .map((hex) => ({ hex, tile: board.getTile(hex) as Tile }))
          // Ignore offset ring
          .filter(({ tile }) => tile.getTileType() === TileType.TILE)
          // Render
          .map(({ hex, tile }) => (
            <CatanTile hex={hex} tile={tile} />
          ))}
      </Layout>
    </HexGrid>
  );
};
