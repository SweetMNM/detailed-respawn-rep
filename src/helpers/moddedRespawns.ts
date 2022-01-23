import {
  getNormalizedRespawns,
  refreshNormalizedRespawns
} from "../data/normalizedIRespawns";
import { Respawn } from "../types";
import { VANILLA_RESPAWNS } from "../VANILLA_RESPAWNS";

export const RespawnPosition = {
  First: 0,
  Last: -1,
  After(after: string) {
    const normalizedRespawns = getNormalizedRespawns();
    for (let i = 0; i < normalizedRespawns.length; i++) {
      const respawn = normalizedRespawns[i];
      if (respawn.name === after) {
        return i + 1;
      }
    }

    error(
      `Error while creating modded respawn - A respawn with the name ${after} does not exists`
    );
  }
};

export function AddCustomRespawn(respawn: Respawn, position: number) {
  if (position === -1) {
    table.insert(VANILLA_RESPAWNS, respawn);
  } else {
    table.insert(VANILLA_RESPAWNS, position + 1, respawn); // Lua is not 0 index
  }

  refreshNormalizedRespawns();
}
