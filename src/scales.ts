export function linearScale(domain: [number, number], range: [number, number]) {
  const [d0, d1] = domain;
  const [r0, r1] = range;
  const m = (r1 - r0) / (d1 - d0);
  return (x: number) => r0 + (x - d0) * m;
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
