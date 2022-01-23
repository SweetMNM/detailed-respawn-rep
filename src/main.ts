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

  mod.AddCallback(ModCallbacks.MC_POST_PEFFECT_UPDATE, onPEffectUpdate);
  mod.AddCallback(ModCallbacks.MC_POST_RENDER, onRender);
  mod.AddCallback(ModCallbacks.MC_POST_GAME_STARTED, onGameStart);
  mod.AddCallback(ModCallbacks.MC_PRE_GAME_EXIT, onGameExit);

  Isaac.DebugString("detailed respawn initialized.");
}
