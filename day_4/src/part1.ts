
async function find() {
  const start = 347312;
  const end = 805915;

  const increasingRegex = /,1*2*3*4*5*6*7*8*9*,/g;
  const adjecentDigitsRegex = /,\d*(\d)\1\d*,/g;

  const count = new Array(end - start)
    .fill(0)
    .map((_, i) => `,${start + i},`).join('\n')
    .match(increasingRegex).join('\n')
    .match(adjecentDigitsRegex)
    .length;
  console.log(`Number of passwords is ${count}`);
}

find();
