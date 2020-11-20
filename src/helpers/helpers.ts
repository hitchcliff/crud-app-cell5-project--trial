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

/**
 * A function that checks whether the string is `empty` or `not`
 * @function
 * @param str - Accepts a `any` as an `arg`
 * @returns  {boolean} - It return either `true` or `false`
 */
export const isEmpty = (value: any) => {
  return value === '' || !value ? true : false;
};

/**
 * A function that checks the types if its `number` or not
 * @function
 * @param num - Accepts a type of `any` as an `arg`
 * @returns {boolean} = It return either `true` or `false`
 */
export const isNumber = (value: any) => {
  return typeof value !== 'number' ? false : true;
};

/**
 * A function that check the types if its `string` or not
 * @function
 * @param str - Accepts a type of `any` as an `arg`
 * @returns {boolean} - It return either `true` or `false`
 */
export const isString = (value: any) => {
  return typeof value !== 'string' ? false : true;
};

/**
 * A function that check the types if its `string` or not
 * @function
 * @param str - Accepts a type of `any` as an `arg`
 * @returns {boolean} - It return either `true` or `false`
 */
export const isGender = (value: any) => {
  const val = value.toLowerCase();
  if (val === 'male' || val === 'female') return true;
  return false;
};
