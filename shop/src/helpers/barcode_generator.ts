function calculateCheckDigit(barcode: string): number {
  const digits = barcode.split('').map(Number);
  const oddSum = digits
    .filter((_, i) => i % 2 === 0)
    .reduce((acc, curr) => acc + curr, 0);
  const evenSum = digits
    .filter((_, i) => i % 2 !== 0)
    .reduce((acc, curr) => acc + curr * 3, 0);
  const totalSum = oddSum + evenSum;
  const checkDigit = (10 - (totalSum % 10)) % 10;
  return checkDigit;
}

// Function to generate a valid EAN-13 barcode
export function generateEAN13(): string {
  const baseBarcode = Math.floor(Math.random() * 1000000000000)
    .toString()
    .padStart(12, '0'); // Generate a 12-digit random number
  const checkDigit = calculateCheckDigit(baseBarcode);
  return baseBarcode + checkDigit; // Append the check digit to make a valid 13-digit EAN-13 barcode
}
