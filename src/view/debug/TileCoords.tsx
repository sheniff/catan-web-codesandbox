import { Hex } from '../../engine/types';

export function TileCoords({ hex }: { hex: Hex }) {
  return (
    <text
      x={0}
      y={'0.3em'}
      textAnchor="middle"
      style={{
        fill: 'white',
        fontSize: '3px'
      }}
    >{`${hex.q},${hex.r},${hex.s}`}</text>
  );
}
