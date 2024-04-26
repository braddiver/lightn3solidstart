export function rgba(...rgba: number[]) {
  const trimmed: number[] = [];
  for (let i = 0; i < 4; i++) {
    const num = rgba[i];
    if (num === undefined) {
      if (i === 3) {
        rgba[i] = 1; // When alpha not provided
      } else {
        rgba[i] = 255;
      }
    }
    trimmed[i] = rgba[i];
  }

  const str = trimmed
    // Converts alpha to 255 number
    .map((number, index) => (index === 3 ? Math.round(number * 255) : number))
    // Converts numbers to hex
    .map((number) => number.toString(16))
    // Adds 0 when length of one number is 1
    .map((string) => (string.length === 1 ? '0' + string : string))
    .join('');

  return Number('0x' + str);
}
