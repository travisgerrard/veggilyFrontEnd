export function CapatlizeFirstLetter(word) {
  let str = word.split(" ");
  for (var i = 0, x = str.length; i < x; i++) {
    if (str[i][0]) {
      str[i] = str[i][0].toUpperCase() + str[i].substr(1).toLowerCase();
    }
  }
  return str.join(" ");
}
