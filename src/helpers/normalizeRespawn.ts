import { Config, NormalizedRespawn, Respawn } from "../types";

function generateRenderFunction(respawn: Respawn) {
  if (respawn.itemId === undefined) {
    error(`Respawn ${respawn.name} does not have a condition nor an item id`);
  }

  return (player: EntityPlayer) => player.HasCollectible(respawn.itemId!);
}

function getAdditionalTextFunction(
  respawn: Respawn
): (player: EntityPlayer) => string {
  if (typeof respawn.additionalText === "string") {
    return () => respawn.additionalText as string;
  }

  if (typeof respawn.additionalText === "function") {
    return respawn.additionalText;
  }

  return (player: EntityPlayer) => {
    if (respawn.itemId === undefined) {
      return "";
    }

    const collectibleCount = player.GetCollectibleNum(respawn.itemId);
    return collectibleCount > 1 ? `x${collectibleCount}` : "";
  };
}

function getAltIconPath(name: string) {
  return `gfx/detailedrespawn/${name}.png`;
}

function getGfx(respawn: Respawn, useAlternateSprite: boolean) {
  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  if (useAlternateSprite && respawn.hasAltSprite) {
    return getAltIconPath(respawn.name);
  }

  if (respawn.gfx !== undefined) {
    return respawn.gfx;
  }

  if (respawn.itemId === undefined) {
    error(
      `Error in respawn ${respawn.name} - no gfx provided and no itemid to infer gfx from`
    );
  }

  return Isaac.GetItemConfig().GetCollectible(respawn.itemId)!.GfxFileName;
}

function getIncreaseCountFunction(
  respawn: Respawn
): (player: EntityPlayer) => number {
  if (!respawn.increaseCount) {
    return () => 0;
  }

  if (respawn.itemId !== undefined) {
    return (player) => player.GetCollectibleNum(respawn.itemId as number);
  }

  return () => 1;
}

export function normalizeRespawn(respawn: Respawn, config: Config) {
  // Sprite
  const gfx = getGfx(respawn, config.useAlternateSprites);
  const sprite = Sprite();
  sprite.Load("gfx/005.100_collectible.anm2", false);
  sprite.Play("ShopIdle", true);
  sprite.Scale = sprite.Scale.mul(config.spriteScale);
  sprite.Color = Color(1, 1, 1, config.transparency, 0, 0, 0);
  sprite.ReplaceSpritesheet(1, gfx);
  sprite.LoadGraphics();
  sprite.Update();

  // Font
  const font = Font();
  font.Load("font/terminus.fnt");

  const normalizedRespawn: NormalizedRespawn = {
    name: respawn.name,
    gfx,
    sprite,
    font,
    increaseCount: getIncreaseCountFunction(respawn),
    additionalText: getAdditionalTextFunction(respawn),
    positionModifier:
      respawn.positionModifier !== undefined
        ? respawn.positionModifier
        : Vector(0, 0),
    shouldRender:
      respawn.condition !== undefined
        ? respawn.condition
        : generateRenderFunction(respawn)
  };

  return normalizedRespawn;
}

export function NormalizeRespawns(respawns: Respawn[], config: Config) {
  return respawns.map((respawn) => normalizeRespawn(respawn, config));
}
