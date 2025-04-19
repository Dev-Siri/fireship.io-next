import type { PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
  name?: string;
}

export default function File({ children, name }: Props) {
  return (
    <div className="file-name">
      <span className="file-icon">{children}</span>
      {name}
    </div>
  );
}
