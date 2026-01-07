import * as React from "react";

/**
 * SVG container component with ref forwarding
 * Used as the root element for all charts
 */
export const Svg = React.forwardRef<
  SVGSVGElement,
  React.SVGProps<SVGSVGElement> & { width: number; height: number }
>(({ width, height, children, style, ...rest }, ref) => (
  <svg
    ref={ref}
    width={width}
    height={height}
    viewBox={`0 0 ${width} ${height}`}
    xmlns="http://www.w3.org/2000/svg"
    style={style}
    {...rest}
  >
    {children}
  </svg>
));

Svg.displayName = "Svg";

/**
 * Group component for organizing SVG elements with optional translation
 */
export const Group: React.FC<
  React.SVGProps<SVGGElement> & { translate?: { x: number; y: number } }
> = ({ translate, children, style, ...rest }) => (
  <g
    transform={
      translate ? `translate(${translate.x},${translate.y})` : undefined
    }
    style={style}
    {...rest}
  >
    {children}
  </g>
);

/**
 * Rectangle primitive
 */
export const Rect = (props: React.SVGProps<SVGRectElement>) => (
  <rect {...props} />
);

/**
 * Line primitive
 */
export const Line = (props: React.SVGProps<SVGLineElement>) => (
  <line {...props} />
);

/**
 * Text primitive
 */
export const Text = (props: React.SVGProps<SVGTextElement>) => (
  <text {...props} />
);
