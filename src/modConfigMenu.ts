import { config } from "./config";
import { refreshNormalizedRespawns } from "./data/normalizedIRespawns";

if (ModConfigMenu !== undefined) {
  const TRANSPARENCY_LEVELS = [0.25, 0.3, 0.4, 0.5, 0.6, 0.75, 0.8, 0.9, 1];

  ModConfigMenu.RemoveCategory("Detailed Respawn");

  ModConfigMenu.AddSetting("Detailed Respawn", "General", {
    Type: ModConfigMenuOptionType.BOOLEAN,
    CurrentSetting() {
      return config.enabled;
    },
    Display() {
      let onOff = "Disabled";
      if (config.enabled) {
        onOff = "Enabled";
      }
      return `The mod is currently: ${onOff}`;
    },
    OnChange(IsOn) {
      config.enabled = IsOn as boolean;
    },
    Info: ["Disable to hide the respawn information"]
  });
  ModConfigMenu.AddSetting("Detailed Respawn", "General", {
    Type: ModConfigMenuOptionType.BOOLEAN,
    CurrentSetting() {
      return config.showAdditionalText;
    },
    Display() {
      let onOff = "Disabled";
      if (config.showAdditionalText) {
        onOff = "Enabled";
      }
      return `Show additional text: ${onOff}`;
    },
    OnChange(IsOn) {
      config.showAdditionalText = IsOn as boolean;
    },
    Info: [
      "Disable to hide additional text",
      'Additional text can be: "50%" for Guppy\'s collar',
      "And the number of nine lives left"
    ]
  });
  ModConfigMenu.AddSetting("Detailed Respawn", "General", {
    Type: ModConfigMenuOptionType.BOOLEAN,
    CurrentSetting() {
      return config.onlyShowNextRespawn;
    },
    Display() {
      let onOff = "Disabled";
      if (config.onlyShowNextRespawn) {
        onOff = "Enabled";
      }
      return `Only show next respawn: ${onOff}`;
    },
    OnChange(IsOn) {
      config.onlyShowNextRespawn = IsOn as boolean;
    },
    Info: [
      "Only show the next respawn",
      "That is going to activate.",
      "Instead of all respawns"
    ]
  });
  ModConfigMenu.AddSetting("Detailed Respawn", "General", {
    Type: ModConfigMenuOptionType.BOOLEAN,
    CurrentSetting() {
      return config.hideOnCurseOfTheUnknown;
    },
    Display() {
      let onOff = "Disabled";
      if (config.hideOnCurseOfTheUnknown) {
        onOff = "Enabled";
      }
      return `Hide on Curse Of The Unknown: ${onOff}`;
    },
    OnChange(IsOn) {
      config.hideOnCurseOfTheUnknown = IsOn as boolean;
    },
    Info: ["Hide respawn info on curse of the unknown."]
  });
  ModConfigMenu.AddSetting("Detailed Respawn", "Style", {
    Type: ModConfigMenuOptionType.NUMBER,
    CurrentSetting() {
      return TRANSPARENCY_LEVELS.indexOf(config.transparency);
    },
    Minimum: 0,
    Maximum: TRANSPARENCY_LEVELS.length - 1,
    Display() {
      return `Transparency: ${config.transparency}`;
    },
    OnChange(num) {
      config.transparency = TRANSPARENCY_LEVELS[num as number];
    },
    Info: ["Transparency of the hud", "1 is maximum (completly visible)"]
  });
  const sizes = [0.25, 0.3, 0.4, 0.5, 0.6, 0.75, 0.8, 0.9, 1];
  ModConfigMenu.AddText("Detailed Respawn", "Style", "For sizes,");
  ModConfigMenu.AddText(
    "Detailed Respawn",
    "Style",
    "anything other than 0.5 looks weird."
  );
  ModConfigMenu.AddText("Detailed Respawn", "Style", "But you do you :D");
  ModConfigMenu.AddSetting("Detailed Respawn", "Style", {
    Type: ModConfigMenuOptionType.NUMBER,
    CurrentSetting() {
      return sizes.indexOf(config.spriteScale);
    },
    Minimum: 0,
    Maximum: sizes.length - 1,
    Display() {
      return `Icons size: ${config.spriteScale}`;
    },
    OnChange(num) {
      config.spriteScale = sizes[num as number];
    },
    Info: ["Size of the respawn icons", "I recommend 0.5"]
  });
  ModConfigMenu.AddSetting("Detailed Respawn", "Style", {
    Type: ModConfigMenuOptionType.NUMBER,
    CurrentSetting() {
      return sizes.indexOf(config.fontScale);
    },
    Minimum: 0,
    Maximum: sizes.length - 1,
    Display() {
      return `Text size: ${config.fontScale}`;
    },
    OnChange(num) {
      config.fontScale = sizes[num as number];
    },
    Info: ["Size of the additional text", "I recommend 0.5"]
  });
  ModConfigMenu.AddSetting("Detailed Respawn", "Style", {
    Type: ModConfigMenuOptionType.BOOLEAN,
    CurrentSetting() {
      return config.useAlternateSprites;
    },
    Display() {
      let onOff = "Disabled";
      if (config.useAlternateSprites) {
        onOff = "Enabled";
      }
      return `Use alternate sprites: ${onOff}`;
    },
    OnChange(IsOn) {
      config.useAlternateSprites = IsOn as boolean;
      refreshNormalizedRespawns();
    },
    Info: [
      "Use the character icons",
      "Instead of the item icons",
      "eg: Dark Judas for Judas' Shadow"
    ]
  });
}
