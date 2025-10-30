import * as React from "react";

export const Svg: React.FC<
  React.SVGProps<SVGSVGElement> & { width: number; height: number }
> = ({ width, height, className, children, ...rest }) => (
  <svg
    width={width}
    height={height}
    viewBox={`0 0 ${width} ${height}`}
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    {...rest}
  >
    {children}
  </svg>
);

export const Group: React.FC<
  React.SVGProps<SVGGElement> & { translate?: { x: number; y: number } }
> = ({ translate, children, className, ...rest }) => (
  <g
    transform={
      translate ? `translate(${translate.x},${translate.y})` : undefined
    }
    className={className}
    {...rest}
  >
    {children}
  </g>
);

export const Rect = (props: React.SVGProps<SVGRectElement>) => (
  <rect {...props} />
);
export const Line = (props: React.SVGProps<SVGLineElement>) => (
  <line {...props} />
);
export const Text = (props: React.SVGProps<SVGTextElement>) => (
  <text {...props} />
);
