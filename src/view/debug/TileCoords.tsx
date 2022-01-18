import { Hex } from '../../engine/types';
import styled from 'styled-components';

const StyledText = styled.text`
  fill: white;
  font-size: 3px;
`;

export function TileCoords({ hex }: { hex: Hex }) {
  return (
    <StyledText
      x={0}
      y={'0.3em'}
      textAnchor="middle"
    >{`${hex.q},${hex.r},${hex.s}`}</StyledText>
  );
}
