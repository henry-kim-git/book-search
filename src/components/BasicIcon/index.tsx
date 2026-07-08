import { cloneElement } from "react";
import { twMerge } from "tailwind-merge";
import { useSvg } from "./hooks/useSvg";
import { LINE_ICONS } from "./lineIcons";
import { FILLED_ICONS } from "./filledIcons";

export type BasicIconType =
  | {
      type: "line";
      name: keyof typeof LINE_ICONS;
    }
  | {
      type: "filled";
      name: keyof typeof FILLED_ICONS;
    };

type Props = {
  iconType: BasicIconType;
  size?: number;
  className?: React.ComponentProps<"svg">["className"];
};

function BasicIcon({ iconType, size = 24, className }: Props) {
  const icon = iconType.type === "line" ? LINE_ICONS[iconType.name] : FILLED_ICONS[iconType.name];
  const uniqueIcon = useSvg(icon);

  return cloneElement(uniqueIcon, {
    width: size,
    height: size,
    className: twMerge("text-text-primary", className),
    style: {
      ...uniqueIcon.props.style
    }
  });
}

export default BasicIcon;
