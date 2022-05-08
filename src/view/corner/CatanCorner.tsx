import { Corner as CornerData } from '../../engine/corner';
import styled from 'styled-components';
import { BaseTile } from '../../engine/tile';

interface Props {
  onClick?: (corner: CornerData, tile: BaseTile) => void;
  corner: CornerData;
  coords: { x: number; y: number };
  tile: BaseTile;
}

const StyledCircle = styled.circle`
  fill: red;
  stroke: black;
  stroke-width: 0.2;
  opacity: 0.7;
`;

export function Corner({ corner, tile, coords, onClick }: Props) {
  return (
    <StyledCircle
      r="1.5"
      cx={coords.x}
      cy={coords.y}
      onClick={() => onClick?.(corner, tile)}
    />
  );
}
