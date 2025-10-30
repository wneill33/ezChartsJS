import { describe, it, expect } from "vitest";
import { linearScale, logScale, bandScale, niceTicks, extent } from "./scales";

describe("linearScale", () => {
  it("should map domain to range linearly", () => {
    const scale = linearScale([0, 100], [0, 500]);
    expect(scale(0)).toBe(0);
    expect(scale(50)).toBe(250);
    expect(scale(100)).toBe(500);
  });

  it("should handle negative domains", () => {
    const scale = linearScale([-100, 100], [0, 200]);
    expect(scale(-100)).toBe(0);
    expect(scale(0)).toBe(100);
    expect(scale(100)).toBe(200);
  });

  it("should handle reversed ranges", () => {
    const scale = linearScale([0, 100], [500, 0]);
    expect(scale(0)).toBe(500);
    expect(scale(50)).toBe(250);
    expect(scale(100)).toBe(0);
  });
});

describe("logScale", () => {
  it("should map domain to range logarithmically", () => {
    const scale = logScale([1, 100], [0, 100]);
    expect(scale(1)).toBe(0);
    expect(scale(10)).toBeCloseTo(50, 1);
    expect(scale(100)).toBe(100);
  });
});

describe("bandScale", () => {
  it("should distribute bands evenly", () => {
    const { scale, bandwidth } = bandScale(["A", "B", "C"], [0, 300]);
    expect(scale("A")).toBeLessThan(scale("B"));
    expect(scale("B")).toBeLessThan(scale("C"));
    expect(bandwidth).toBeGreaterThan(0);
  });

  it("should handle padding", () => {
    const { bandwidth: bw1 } = bandScale(["A", "B"], [0, 100], 0);
    const { bandwidth: bw2 } = bandScale(["A", "B"], [0, 100], 0.5);
    expect(bw2).toBeLessThan(bw1);
  });
});

describe("niceTicks", () => {
  it("should generate nice tick values", () => {
    const ticks = niceTicks(0, 100, 5);
    expect(ticks).toContain(0);
    expect(ticks).toContain(100);
    expect(ticks.length).toBeGreaterThanOrEqual(3);
  });

  it("should handle small ranges", () => {
    const ticks = niceTicks(0, 1, 5);
    expect(ticks.length).toBeGreaterThan(0);
    expect(ticks[0]).toBeLessThanOrEqual(0);
    expect(ticks[ticks.length - 1]).toBeGreaterThanOrEqual(1);
  });

  it("should handle equal min and max", () => {
    const ticks = niceTicks(5, 5, 5);
    expect(ticks.every((t) => t === 5)).toBe(true);
  });
});

describe("extent", () => {
  it("should find min and max", () => {
    expect(extent([1, 5, 3, 9, 2])).toEqual([1, 9]);
  });

  it("should handle single value", () => {
    expect(extent([5])).toEqual([5, 5]);
  });

  it("should handle negative values", () => {
    expect(extent([-5, -1, -10, 3])).toEqual([-10, 3]);
  });

  it("should handle empty array", () => {
    expect(extent([])).toEqual([0, 0]);
  });
});
