function TaxCalculator(ammount) {
  switch (true) {
    case (ammount > 0 && ammount <= 18200):
      break;
    case (ammount > 18200 && ammount <= 37000):
      fullTax(0, ammount, 18200, 0.19);
      break;
    case (ammount > 37000 && ammount <= 80000):
      fullTax(3572, ammount, 37000, 0.325);
      break;
    case (ammount > 80000 && ammount <= 180000):
      fullTax(17547, ammount, 80000, 0.37);
      break;
    case (ammount > 180000):
      fullTax(54547, ammount, 180000, 0.45);
      break;
    default:
      throw 'Invalid ammount';
  }
}
function fullTax(baseTax, salary, baseTaxAmmount, coefficient) {
  let res = (baseTax + (salary - baseTaxAmmount) * coefficient) / 12;
  return Math.round(res);
}

module.exports = TaxCalculator;

//***************************************************************
// Rules
//0 - $18,200 Nil
//$18,201 - $37,000 19c for each $1 over $18,200
//$37,001 - $80,000 $3,572 plus 32.5c for each $1 over $37,000
//$80,001 - $180,000 $17,547 plus 37c for each $1 over $80,000
//$180,001 and over $54,547 plus 45c for each $1 over $180,000
//***************************************************************
