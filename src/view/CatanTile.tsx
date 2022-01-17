import { Hexagon, HexUtils } from 'react-hexgrid';
import { Tile } from '../engine/tile';
import { Hex } from '../engine/types';

interface Props {
  hex: Hex;
  tile: Tile;
}

export const CatanTile = ({ hex, tile }: Props) => {
  const key = HexUtils.getID(hex);
  return (
    <Hexagon key={key} q={hex.q} r={hex.r} s={hex.s}>
      {/* Add things here */}
    </Hexagon>
  );
};
