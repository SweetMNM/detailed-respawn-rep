import { config } from "../config";
import { getRespawnsForPlayer, shouldRunModStuff } from "../helpers/general";
import { calculateHeartsUiOffset, hudOffset } from "../helpers/rendering";

export function onRender() {
  if (!shouldRunModStuff()) {
    return;
  }

  const player = Isaac.GetPlayer(0);
  let position = config.position
    .add(calculateHeartsUiOffset(player))
    .add(hudOffset());

  getRespawnsForPlayer(player).forEach(
    ({ sprite, font, additionalText, positionModifier }) => {
      const text = additionalText(player);

      // Item icon
      sprite.Scale = Vector(config.spriteScale, config.spriteScale);
      sprite.Color = Color(1, 1, 1, config.transparency, 0, 0, 0);
      sprite.Render(position.add(positionModifier), Vector(0, 0), Vector(0, 0));

      // Additional text
      if (config.showAdditionalText && text !== "") {
        const stringWidth = font.GetStringWidth(text) * config.fontScale;
        font.DrawStringScaled(
          text,
          position.X - stringWidth / 2 + positionModifier.X,
          position.Y,
          config.fontScale,
          config.fontScale,
          KColor(1, 1, 1, config.transparency),
          0,
          false
        );
      }

      // Increase position for the next respawn item
      position = position.add(Vector(32 * config.spriteScale, 0));
    }
  );
}
