import * as bwipjs from 'bwip-js';

export async function generateEAN13(): Promise<string> {
  const baseBarcode = Math.floor(Math.random() * 1000000000000)
    .toString()
    .padStart(12, '0'); // Ensure it's 12 digits

  try {
    // Generate a valid EAN-13 barcode number using bwip-js (bwip-js calculates the check digit)
    const barcodeBuffer = await bwipjs.toBuffer({
      bcid: 'ean13', // Barcode type
      text: baseBarcode, // 12-digit base (bwip-js will append the check digit)
      includetext: false, // We don't need the image or human-readable text
    });

    // Return the 12-digit base (bwip-js calculates the check digit and appends it)
    const fullBarcode = baseBarcode + barcodeBuffer.slice(-1).toString(); // Append check digit
    return fullBarcode;
  } catch (error) {
    console.error('Error generating EAN-13 barcode:', error);
    throw error;
  }
}
