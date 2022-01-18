import styled from 'styled-components';

const StyledText = styled.text`
  fill: white;
  font-size: 4px;
`;

export function DiceNumber({ diceNumber }: { diceNumber: number }) {
  // TODO: Put it in a circle?
  return (
    <StyledText x={0} y={'0.3em'} textAnchor="middle">
      {diceNumber}
    </StyledText>
  );
}
