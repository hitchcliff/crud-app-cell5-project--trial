/**
 * A Helper function that sits in Root to Format number
 * @function
 * @param num - Takes a number `args`
 * @returns - Returns `$2,500`
 */
export const FormatNumber = (num: number) => {
  const formatter = new Intl.NumberFormat('en-us', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
  return formatter.format(num);
};
