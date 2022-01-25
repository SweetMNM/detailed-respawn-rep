import { hasCurseOfTheUnknown } from "./general";

function getTotalHeartsDisplayed(player: EntityPlayer) {
  return player.GetEffectiveMaxHearts() + player.GetSoulHearts();
}

function getDisplayedHeartsColumns(player: EntityPlayer) {
  const totalHearts = getTotalHeartsDisplayed(player);
  return totalHearts > 12 ? 6 : math.floor(totalHearts / 2 + 0.5);
}

export function calculateHeartsUiOffset(player: EntityPlayer) {
  // No need to shift position
  if (hasCurseOfTheUnknown()) {
    return Vector(0, 0);
  }

  const totalHeartColumns = getDisplayedHeartsColumns(player);

  const heartCountModifier = Vector(12 * (totalHeartColumns - 1), 0);

  let respawnCountText = `x${player.GetExtraLives()}`;
  if (player.HasCollectible(CollectibleType.COLLECTIBLE_GUPPYS_COLLAR)) {
    respawnCountText += "?";
  }
  const respawnCountTextModifier =
    player.GetExtraLives() !== 0
      ? Vector(respawnCountText.length * 5, 0)
      : Vector(0, 0);

  const holyMantleModifier =
    totalHeartColumns < 6 &&
    player
      .GetEffects()
      .HasCollectibleEffect(CollectibleType.COLLECTIBLE_HOLY_MANTLE)
      ? Vector(12, 0)
      : Vector(0, 0);

  return heartCountModifier
    .add(respawnCountTextModifier)
    .add(holyMantleModifier);
}

export function hudOffset() {
  const notches = math.floor(Options.HUDOffset * 10);
  const xoffset = notches * 2;
  const oneovereight = 1 / 8;
  const yoffset = oneovereight * (10 * notches + (-1) ** notches + 7);

  return Vector(xoffset, yoffset);
}
