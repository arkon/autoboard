export function encode(data){
  let buff = Buffer.from(data);
  let text = buff.toString('base64');
  return text;
}

export function decode(data){
  let buff = Buffer.from(data, 'base64');
  let text = buff.toString();
  console.log(text);
  return text;
}