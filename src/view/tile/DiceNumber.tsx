import styled from 'styled-components';

export function DiceNumber({ diceNumber }: { diceNumber: number }) {
  const StyledText = styled.text`
    fill: white;
    font-size: 4px;
  `;

  // TODO: Put it in a circle?
  return (
    <StyledText x={0} y={'0.3em'} textAnchor="middle">
      {diceNumber}
    </StyledText>
  );
}
