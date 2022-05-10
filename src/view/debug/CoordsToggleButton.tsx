import styled from 'styled-components';

export function CoordsToggleButton({
  enabled,
  onClick
}: {
  enabled: boolean;
  onClick: () => void;
}) {
  const StyledButton = styled.button`
    background: ${(props: { enabled: boolean }) =>
      props.enabled ? 'black' : 'transparent'};
    border-radius: 3px;
    border: 2px solid
      ${(props: { enabled: boolean }) => (props.enabled ? 'white' : 'black')};
    color: ${(props: { enabled: boolean }) =>
      props.enabled ? 'white' : 'black'};
    margin: 0 1em;
    padding: 0.25em 1em;
  `;

  return (
    <StyledButton enabled={enabled} onClick={onClick}>
      Coords
    </StyledButton>
  );
}
