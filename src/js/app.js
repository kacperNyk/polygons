import {
  getAreaOfPolygon,
  getInteriorAngleValue,
  getNOdiagonals,
  getRadiusOfTheInscribedCircle,
  numRoundingToGivenIndex,
} from "./functions.js";

const submitBtn = document.getElementById("submitBtn");
const output = document.getElementById("outputCon");

function displayData([...args]) {
  output.textContent = "";
  const h1 = document.createElement("h1");
  h1.textContent = "wynik";
  output.appendChild(h1);
  const arr = [...args];
  arr.forEach((item) => {
    const p = document.createElement("p");
    p.textContent = item;
    output.appendChild(p);
  });
  output.classList.add("active");
}

submitBtn.addEventListener("click", () => {
  const diagonalCheckbox = document.getElementById("diagonalsCheckbox");
  const internalAngleCheckbox = document.getElementById(
    "internalAngleCheckbox"
  );
  const roundingValue = document.getElementById("roundingValue");
  const InscribedCircleCheckbox = document.getElementById("InsCirc");
  const a = parseInt(document.getElementById("LOArms").value); //lenght of one arm
  const n = parseInt(document.getElementById("NOArms").value); //number of interior angles
  const r = parseFloat(getRadiusOfTheInscribedCircle(a, n));
  const displayArgsArr = [];

  displayArgsArr.push(
    `"pole wynosi: "${numRoundingToGivenIndex(
      getAreaOfPolygon(n, a, r),
      roundingValue
    )}cm²`
  );

  if (diagonalCheckbox.checked) {
    displayArgsArr.push(
      `liczba przekątnych: ${numRoundingToGivenIndex(
        getNOdiagonals(n),
        roundingValue
      )}`
    );
    getNOdiagonals(n);
  }
  if (internalAngleCheckbox.checked) {
    displayArgsArr.push(
      `wartość kątów wewnętrznych: ${numRoundingToGivenIndex(
        getInteriorAngleValue(n),
        roundingValue
      )}°`
    );
    getInteriorAngleValue(n);
  }
  if (InscribedCircleCheckbox.checked) {
    displayArgsArr.push(
      `promień okręgu wpisanego: ${numRoundingToGivenIndex(
        getRadiusOfTheInscribedCircle(a, n),
        roundingValue
      )}`
    );
  }
  displayData(displayArgsArr);
});
