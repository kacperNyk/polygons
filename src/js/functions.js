export function getInteriorAngleValue(NOA) {
  return (180 * (NOA - 2)) / NOA;
}
//P = n x ( n – 3 ) / 2
export function getNOdiagonals(n) {
  return (n * (n - 3)) / 2;
}
export function getRadiusOfTheInscribedCircle(a, n) {
  return a / (2 * Math.tan(Math.PI / n));
}
export function getAreaOfPolygon(n, a, r) {
  return (n * a * r) / 2;
}
export function numRoundingToGivenIndex(number, index) {
  return Number(number.toFixed(index));
}
