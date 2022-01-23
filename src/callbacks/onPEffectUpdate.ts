import { config } from "../config";
import { getNormalizedRespawns } from "../data/normalizedIRespawns";
import {
  hasCurseOfTheUnknown,
  updateRespawnsForPlayer
} from "../helpers/general";
import { NormalizedRespawn } from "../types";

function filterRespawnsForPlayer(player: EntityPlayer) {
  const respawnsForRender: NormalizedRespawn[] = [];

  for (const respawn of getNormalizedRespawns()) {
    if (respawn.shouldRender(player)) {
      respawnsForRender.push(respawn);

      if (config.onlyShowNextRespawn) {
        break;
      }
    }
  }

  return respawnsForRender;
}

export function onPEffectUpdate(player: EntityPlayer) {
  if (
    !config.enabled ||
    (config.hideOnCurseOfTheUnknown && hasCurseOfTheUnknown())
  ) {
    return;
  }

  // Update respawns
  const fliteredRespawns = filterRespawnsForPlayer(player);
  updateRespawnsForPlayer(player, fliteredRespawns);

  // Dead cat count
  const data = player.GetData();
  const countWithoutDeadCat = fliteredRespawns.reduce(
    (prev, respawn) => prev + respawn.increaseCount(player),
    0
  );
  data.DetailedRespawnDeadCatCount =
    player.GetExtraLives() - countWithoutDeadCat;
}
