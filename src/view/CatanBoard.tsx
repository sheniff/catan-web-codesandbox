import React from 'react';
import { HexGrid, Layout } from 'react-hexgrid';
import { Board } from '../engine/board';
import { Tile, TileType } from '../engine/tile';
import { CatanTile } from './CatanTile';
import styled from 'styled-components';

interface Props {
  board: Board;
}

const StyledWrapper = styled.div`
  display: inline-block;
  position: relative;
  width: 100%;
  padding-bottom: 100%;
  vertical-align: middle;
  overflow: hidden;
`;

const StyledSvg = styled.svg`
  display: inline-block;
  position: absolute;
  top: 0;
  left: 0;
`;

export const CatanBoard: React.FC<Props> = ({ board }) => {
  const hexagons = board.getHexes();

  return (
    <StyledWrapper>
      <StyledSvg
        viewBox="-35 -30 70 60"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <Layout size={{ x: 7, y: 7 }} spacing={1.02} flat={false}>
          {hexagons
            // Get tile for each hex
            .map((hex) => ({ hex, tile: board.getTile(hex) as Tile }))
            // Ignore offset ring
            .filter(({ tile }) => tile.getTileType() === TileType.TILE)
            // Render
            .map(({ hex, tile }, i: number) => (
              <CatanTile key={i} hex={hex} tile={tile} />
            ))}
        </Layout>
      </StyledSvg>
    </StyledWrapper>
  );
};
