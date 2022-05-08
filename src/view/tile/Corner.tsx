import { Corner as CornerData } from '../../engine/corner';
import styled from 'styled-components';

interface Props {
  onClick?: () => void;
  corner: CornerData;
  coords: { x: number; y: number };
}

const StyledCircle = styled.circle`
  fill: red;
  stroke: black;
  stroke-width: 0.2;
`;

export function Corner({ corner, coords }: Props) {
  return <StyledCircle r="2" cx={coords.x} cy={coords.y} />;
}
