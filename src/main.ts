/* -- Respawn Order --
-------------------------
-- 1up!
-- Lazarus' Rags
-- Dead Cat
-- Guppy's Collar
-- Ankh
-- Broken Ankh
-- Juads' Shadow
-- Missing Poster
*/

import * as json from "json";
import { onPEffectUpdate } from "./callbacks/onPEffectUpdate";
import { onRender } from "./callbacks/onRender";
import { config } from "./config";
import { refreshNormalizedRespawns } from "./data/normalizedIRespawns";
import "./modConfigMenu";

export function main() {
  const mod = RegisterMod("DetailedRespawn", 1);

  mod.AddCallback(ModCallbacks.MC_POST_PEFFECT_UPDATE, onPEffectUpdate);
  mod.AddCallback(ModCallbacks.MC_POST_RENDER, onRender);

  function onGameStart() {
    if (mod.HasData()) {
      const loadedFromSave = json.decode(Isaac.LoadModData(mod)) as Record<
        string,
        any
      >;

      for (const [k, v] of pairs(loadedFromSave)) {
        // @ts-expect-error error
        config[k] = v;
      }

      refreshNormalizedRespawns();
    }
  }

  function onGameExit() {
    mod.SaveData(json.encode(config));
  }

  mod.AddCallback(ModCallbacks.MC_POST_GAME_STARTED, onGameStart);
  mod.AddCallback(ModCallbacks.MC_PRE_GAME_EXIT, onGameExit);
  // mod.AddCallback(ModCallbacks.MC_POST_PLAYER_UPDATE, (player) => {
  //   const data = player.GetData() as {
  //     DetailedRespawnPlayerJustDied: boolean;
  //     hasDeadCat: boolean;
  //     DetailedRespawnNextRespawn: NormalizedRespawn | undefined;
  //   };
  //   const isDead = player.IsDead();

  //   if (
  //     !data.hasDeadCat &&
  //     player.HasCollectible(CollectibleType.COLLECTIBLE_DEAD_CAT)
  //   ) {
  //     print("just got dead cat");
  //   }

  //   data.hasDeadCat = player.HasCollectible(
  //     CollectibleType.COLLECTIBLE_DEAD_CAT
  //   );

  //   if (data.DetailedRespawnPlayerJustDied && !isDead) {
  //     print("respawned");
  //     print(`Respawned with ${data.DetailedRespawnNextRespawn?.name}`);

  //     data.DetailedRespawnPlayerJustDied = false;
  //   } else if (isDead) {
  //     data.DetailedRespawnPlayerJustDied = true;
  //     data.DetailedRespawnNextRespawn = getRespawnsForPlayer(player)[0];
  //   }
  // });

  Isaac.DebugString("detailed respawn initialized.");
}
