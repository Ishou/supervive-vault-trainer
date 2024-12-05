export default function compareRange(r1, r2) {
  const norm = (r) => [r[0], r[1] < r[0] ? r[1] + 360 : r[1]];
  const slide = (r) => [r[0] + 360, r[1] + 360];
  const compare = (a, b) =>
    (b[0] <= a[0] && a[0] <= b[1]) || (b[0] <= a[1] && a[1] <= b[1]);

  r1 = norm(r1);
  r2 = norm(r2);

  return (
    compare(r1, r2) ||
    compare(r2, r1) ||
    compare(slide(r1), r2) ||
    compare(slide(r2), r1)
  );
}
