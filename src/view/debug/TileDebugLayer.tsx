import { Hex } from '../../engine/types';
import { Tile } from '../../engine/tile';
import { TileCoords } from '../debug/TileCoords';
import { useContext } from 'react';
import { DebugContext } from '../../Debug';

interface Props {
  hex: Hex;
  tile: Tile;
}

export function TileDebugLayer({ hex }: Props) {
  const { showCoords } = useContext(DebugContext);
  return <>{showCoords && <TileCoords hex={hex} />}</>;
}
