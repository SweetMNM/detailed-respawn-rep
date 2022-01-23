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

export function getCardCountForPlayer(player: EntityPlayer, card: number) {
  let count = 0;

  if (player.GetCard(0) === card) {
    count++;
  }
  if (player.GetCard(1) === card) {
    count++;
  }

  return count;
}
