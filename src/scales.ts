export function linearScale(domain: [number, number], range: [number, number]) {
  const [d0, d1] = domain;
  const [r0, r1] = range;
  const m = (r1 - r0) / (d1 - d0);
  return (x: number) => r0 + (x - d0) * m;
}

export function logScale(
  domain: [number, number],
  range: [number, number],
  base = 10
) {
  const [d0, d1] = domain;
  const [r0, r1] = range;
  const logBase = Math.log(base);
  const logD0 = Math.log(d0) / logBase;
  const logD1 = Math.log(d1) / logBase;
  const m = (r1 - r0) / (logD1 - logD0);
  return (x: number) => r0 + (Math.log(x) / logBase - logD0) * m;
}

export function bandScale(
  domain: string[],
  range: [number, number],
  padding = 0.1
) {
  const [r0, r1] = range;
  const n = domain.length;
  const step = (r1 - r0) / (n + padding * (n - 1));
  const bandwidth = step / (1 + padding);
  const offset = step - bandwidth;

  const indexMap = new Map(domain.map((d, i) => [d, i]));

  return {
    scale: (x: string) => {
      const i = indexMap.get(x);
      return i !== undefined ? r0 + i * step : r0;
    },
    bandwidth,
    step,
  };
}

export function niceTicks(min: number, max: number, count = 5) {
  const span = max - min;
  if (span <= 0) return Array(count).fill(min);
  const step = Math.pow(10, Math.floor(Math.log10(span / count)));
  const err = span / count / step;
  const nice = err >= 7.5 ? 10 : err >= 3.5 ? 5 : err >= 1.5 ? 2 : 1;
  const niceStep = nice * step;
  const niceMin = Math.floor(min / niceStep) * niceStep;
  const niceMax = Math.ceil(max / niceStep) * niceStep;
  const ticks: number[] = [];
  for (let v = niceMin; v <= niceMax + 1e-9; v += niceStep)
    ticks.push(+v.toFixed(12));
  return ticks;
}

export function extent(data: number[]): [number, number] {
  if (data.length === 0) return [0, 0];
  let min = data[0];
  let max = data[0];
  for (let i = 1; i < data.length; i++) {
    if (data[i] < min) min = data[i];
    if (data[i] > max) max = data[i];
  }
  return [min, max];
}
