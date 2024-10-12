export const formatCurrency = (
  value: number | undefined | null,
  locale: string = 'en-US',
  currency: string = 'USD',
  minimumFractionDigits: number = 2,
  maximumFractionDigits: number = 2
): string => {
  // Fallback for undefined or null values
  if (value === undefined || value === null) {
    return '-'; // Or return a default string like '$0.00'
  }

  // Ensure the value is a valid number
  if (isNaN(value)) {
    console.warn(`Invalid value: ${value}`);
    return '-'; // Or any fallback behavior
  }

  // Format the number with optional locale and currency
  return value.toLocaleString(locale, {
    style: 'currency',
    currency: currency,
    minimumFractionDigits,
    maximumFractionDigits,
  });
};
