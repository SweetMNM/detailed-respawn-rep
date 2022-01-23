export interface Respawn {
  name: string;
  itemId?: CollectibleType | number;
  positionModifier?: Vector;
  gfx?: string;
  condition?: (player: EntityPlayer) => boolean;
  additionalText?: string | ((player: EntityPlayer) => string);
  hasAltSprite?: boolean;
  increaseCount?: boolean;
}

export interface NormalizedRespawn {
  name: string;
  gfx: string;
  positionModifier: Vector;
  additionalText: (player: EntityPlayer) => string;
  shouldRender: (player: EntityPlayer) => boolean;
  sprite: Sprite;
  font: Font;
  increaseCount: (player: EntityPlayer) => number;
}

export interface Config {
  enabled: boolean;
  showAdditionalText: boolean;
  hideOnCurseOfTheUnknown: boolean;
  onlyShowNextRespawn: boolean;

  transparency: number;
  useAlternateSprites: boolean;
  spriteScale: number;
  fontScale: number;

  position: Vector;
}
