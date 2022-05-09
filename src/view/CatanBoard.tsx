import React from 'react';
import { Layout } from 'react-hexgrid';
import { Board } from '../engine/board';
import styled from 'styled-components';
import { Corners } from './corner/CatanCorners';
import { Tiles } from './tile/CatanTiles';
import { Corner as CornerData } from '../engine/corner';
import { Edge as EdgeData } from '../engine/edge';
import { BaseTile } from '../engine/tile';
import { Edges } from './edge/CatanEdges';

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
  const layout = {
    size: { x: 7, y: 7 },
    spacing: 1.02,
    flat: false
  };
  const handleCornerClick = (corner: CornerData, tile: BaseTile) => {
    console.log('clicked corner!', corner, tile);
  };
  const handleEdgeClick = (edge: EdgeData, tile: BaseTile) => {
    console.log('clicked edge!', edge, tile);
  };

  return (
    <StyledWrapper>
      <StyledSvg
        viewBox="-35 -30 70 60"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <Layout size={layout.size} spacing={layout.spacing} flat={layout.flat}>
          <Tiles hexagons={hexagons} board={board} />
          <Corners
            hexagons={hexagons}
            board={board}
            onClick={handleCornerClick}
          />
          <Edges hexagons={hexagons} board={board} onClick={handleEdgeClick} />
        </Layout>
      </StyledSvg>
    </StyledWrapper>
  );
};
