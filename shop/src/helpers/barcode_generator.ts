// Function to calculate EAN-13 check digit
function calculateCheckDigit(baseBarcode: string): number {
  const digits = baseBarcode.split('').map(Number);
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

// Function to generate a valid EAN-13 barcode number
export async function generateEAN13(): Promise<string> {
  // Generate a random 12-digit base
  const baseBarcode = Math.floor(Math.random() * 1000000000000)
    .toString()
    .padStart(12, '0'); // Ensure it's 12 digits

  // Calculate the check digit
  const checkDigit = calculateCheckDigit(baseBarcode);

  // Return the full 13-digit EAN-13 barcode
  return baseBarcode + checkDigit.toString();
}
