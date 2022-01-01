import { Player } from "./player";
import { Resource, Generic } from "./types";

enum Reward {
  Settlement = 1,
  City = 2
}

interface Occupation {
  owner: Player;
  reward: Reward;
}

type Harbor = Resource | Generic;

export class Corner {
  constructor(private harbor?: Harbor, private occupation?: Occupation) {}
  // TODO: getters/setters/checkers?
}
