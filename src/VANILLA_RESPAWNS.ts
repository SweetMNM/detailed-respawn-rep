import { Respawn } from "./types";

export const VANILLA_RESPAWNS: Respawn[] = [
  {
    name: "Soul Of Lazarus",
    gfx: "gfx/detailedrespawn/Soul Of Lazarus.png",
    positionModifier: Vector(3, 0),
    condition(player) {
      return (
        player.GetCard(0) === Card.CARD_SOUL_LAZARUS ||
        player.GetCard(1) === Card.CARD_SOUL_LAZARUS
      );
    }
  },
  {
    name: "1up!",
    itemId: CollectibleType.COLLECTIBLE_1UP,
    positionModifier: Vector(0.5, 0),
    increaseCount: true
  },
  {
    name: "Second Lazarus",
    gfx: Isaac.GetItemConfig().GetCollectible(
      CollectibleType.COLLECTIBLE_LAZARUS_RAGS
    )!.GfxFileName,
    condition(player) {
      return player.GetPlayerType() === PlayerType.PLAYER_LAZARUS;
    },
    hasAltSprite: true,
    increaseCount: true
  },
  {
    name: "Dead Cat",
    itemId: CollectibleType.COLLECTIBLE_DEAD_CAT,
    additionalText: (player) =>
      `x${player.GetData().DetailedRespawnDeadCatCount}`,
    increaseCount: false // This is not a mistake
  },
  {
    name: "Inner Child",
    itemId: CollectibleType.COLLECTIBLE_INNER_CHILD,
    increaseCount: true
  },
  {
    name: "Lazarus' Rags",
    itemId: CollectibleType.COLLECTIBLE_LAZARUS_RAGS,
    hasAltSprite: true,
    increaseCount: true
  },
  {
    name: "Guppy's Collar",
    itemId: CollectibleType.COLLECTIBLE_GUPPYS_COLLAR,
    additionalText: "50%",
    positionModifier: Vector(1.5, 0),
    increaseCount: true
  },
  {
    name: "Ankh",
    itemId: CollectibleType.COLLECTIBLE_ANKH,
    hasAltSprite: true,
    increaseCount: true
  },
  {
    name: "Broken Ankh",
    gfx: Isaac.GetItemConfig().GetTrinket(TrinketType.TRINKET_BROKEN_ANKH)!
      .GfxFileName,
    additionalText: "22%",
    positionModifier: Vector(0, 0.5),
    condition(player) {
      return player.HasTrinket(TrinketType.TRINKET_BROKEN_ANKH);
    }
  },
  {
    name: "Judas' Shadow",
    itemId: CollectibleType.COLLECTIBLE_JUDAS_SHADOW,
    positionModifier: Vector(-1, -0.5),
    hasAltSprite: true,
    increaseCount: true
  },
  {
    name: "Missing Poster",
    gfx: Isaac.GetItemConfig().GetTrinket(TrinketType.TRINKET_MISSING_POSTER)!
      .GfxFileName,
    positionModifier: Vector(-2, 1),
    condition(player) {
      return player.HasTrinket(TrinketType.TRINKET_MISSING_POSTER, true);
    },
    hasAltSprite: true
  }
];
// Isaac.GetPlayer(0):RemoveCollectible(CollectibleType.COLLECTIBLE_DEAD_CAT); Isaac.GetPlayer(0):AddCollectible(CollectibleType.COLLECTIBLE_DEAD_CAT);
