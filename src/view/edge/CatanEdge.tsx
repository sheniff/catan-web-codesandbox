import { Edge as EdgeData } from '../../engine/edge';
import styled from 'styled-components';
import { BaseTile } from '../../engine/tile';

interface Props {
  onClick?: (edge: EdgeData, tile: BaseTile) => void;
  edge: EdgeData;
  coords: { x: number; y: number };
  tile: BaseTile;
  height: number;
}

const StyledRect = styled.rect`
  fill: red;
  stroke: black;
  stroke-width: 0.2;
  opacity: 0.7;
`;

export function Edge({ edge, tile, coords, height, onClick }: Props) {
  return (
    <StyledRect
      width="1"
      height={height}
      x={coords.x}
      y={coords.y}
      onClick={() => onClick?.(edge, tile)}
    />
  );
}
