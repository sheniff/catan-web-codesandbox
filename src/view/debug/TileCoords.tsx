import { Hex } from '../../engine/types';
import styled from 'styled-components';

export function TileCoords({ hex }: { hex: Hex }) {
  const StyledText = styled.text`
    fill: white;
    font-size: 3px;
  `;

  return (
    <StyledText
      x={0}
      y={'0.3em'}
      textAnchor="middle"
    >{`${hex.q},${hex.r},${hex.s}`}</StyledText>
  );
}
