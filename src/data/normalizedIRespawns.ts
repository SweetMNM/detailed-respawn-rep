import { config } from "../config";
import { NormalizeRespawns } from "../helpers/normalizeRespawn";
import { NormalizedRespawn } from "../types";
import { VANILLA_RESPAWNS } from "../VANILLA_RESPAWNS";

let normalizedRespawns = NormalizeRespawns(VANILLA_RESPAWNS, config);

export function setNormalizedRespawns(data: NormalizedRespawn[]) {
  normalizedRespawns = data;
}

export function getNormalizedRespawns() {
  return normalizedRespawns;
}

export function refreshNormalizedRespawns() {
  normalizedRespawns = NormalizeRespawns(VANILLA_RESPAWNS, config);
}
