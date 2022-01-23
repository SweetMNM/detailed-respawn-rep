import { config } from "../config";
import { NormalizedRespawn } from "../types";

export function hasCurseOfTheUnknown() {
  return Game().GetLevel().GetCurses() === LevelCurse.CURSE_OF_THE_UNKNOWN;
}

export function updateRespawnsForPlayer(
  player: EntityPlayer,
  respawnsForRender: NormalizedRespawn[]
) {
  const data = player.GetData();
  data.DetailedRespawnRespawnInfo = respawnsForRender;
}

export function getRespawnsForPlayer(player: EntityPlayer) {
  return player.GetData().DetailedRespawnRespawnInfo as NormalizedRespawn[];
}

export function shouldRunModStuff() {
  return (
    config.enabled &&
    !(config.hideOnCurseOfTheUnknown && hasCurseOfTheUnknown()) &&
    Game().GetHUD().IsVisible()
  );
}
