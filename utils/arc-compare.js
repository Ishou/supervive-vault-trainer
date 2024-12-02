export default function compareRange(r1, r2) {
  const norm = (r) => [r[0], r[1] < r[0] ? r[1] + 360 : r[1]];
  const slide = (r) => [r[0] + 360, r[1] + 360];
  r1 = norm(r1);
  r2 = norm(r2);
  const compare = (a, b) =>
    (b[0] <= a[0] && a[0] <= b[1]) || (b[0] <= a[1] && a[1] <= b[1]);
  const log = (r, i) => console.log(`R${i}: ${r[0]}->${r[1]}`);
  log(r1, 1);
  log(r2, 2);
  log(slide(r1), "slide1");
  log(slide(r2), "slide2");
  return (
    compare(r1, r2) ||
    compare(r2, r1) ||
    compare(slide(r1), r2) ||
    compare(slide(r2), r1)
  );
}
