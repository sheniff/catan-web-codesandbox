import { Edge as EdgeData } from '../../engine/edge';
import styled, { css } from 'styled-components';
import { BaseTile } from '../../engine/tile';
import { TileEdge } from '../../engine/tileHelpers';

interface Props {
  onClick?: (edge: EdgeData, tile: BaseTile) => void;
  edge: EdgeData;
  coords: { x: number; y: number };
  tile: BaseTile;
  height: number;
  position: TileEdge;
}

const StyledRect = styled.rect`
  fill: red;
  stroke: black;
  stroke-width: 0.2;
  opacity: 0.7;
  transform-box: fill-box;

  ${({ position }: { position: TileEdge }) =>
    css`
      transform: rotate(
        ${position === TileEdge.NE ? 300 : position === TileEdge.NW ? 60 : 0}deg
      );
    `}
`;

export function Edge({ edge, tile, coords, height, onClick, position }: Props) {
  return (
    <StyledRect
      width="1"
      height={height}
      x={coords.x}
      y={coords.y}
      onClick={() => onClick?.(edge, tile)}
      position={position}
    />
  );
}
