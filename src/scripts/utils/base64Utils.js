export function encode(data){
  return btoa(unescape(encodeURIComponent(data)));
}

export function decode(data){
  return decodeURIComponent(escape(atob(data)));
}