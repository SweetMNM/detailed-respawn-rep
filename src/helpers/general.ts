import { NormalizedRespawn } from "../types";

// export const RespawnPosition = {
//   First: 1,
//   Last: "DetailedRespawn.RespawnPositions.Last",
//   After(after: string) {
//     for (const [index, respawn] of pairs(DetailedRespawn.NormalizedRespawns)) {
//       if (respawn.name === after) {
//         return index + 1;
//       }
//     }
//   }
// };

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

// DetailedRespawn.AddCustomRespawn = function (respawnObject, respawnPosition) {
//   const normalizedRespawn = DetailedRespawn.NormalizeRespawn(respawnObject);
//   if (type(respawnPosition) === "number") {
//     table.insert(DetailedRespawn.Respawns, respawnPosition, respawnObject);
//     table.insert(
//       DetailedRespawn.NormalizedRespawns,
//       respawnPosition,
//       normalizedRespawn
//     );
//   } else {
//     table.insert(DetailedRespawn.Respawns, respawnPosition, respawnObject);
//     table.insert(DetailedRespawn.NormalizedRespawns, normalizedRespawn);
//   }
// };
