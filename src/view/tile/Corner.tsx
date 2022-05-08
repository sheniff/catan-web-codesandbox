import { Occupation } from '../../engine/corner';
import styled from 'styled-components';
import { TileCorner } from '../../engine/tileHelpers';

interface Props {
  onClick?: () => void;
  occupation?: Occupation;
  position: TileCorner;
}

const StyledCircle = styled.circle`
  fill: red;
  stroke: black;
  stroke-width: 0.2;
`;

export function Corner({ occupation, position }: Props) {
  return <StyledCircle r="2" cx="0" cy={position === TileCorner.N ? -7 : 7} />;
}
