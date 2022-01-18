// função getRandomInt copiada do site
// https://www.horadecodar.com.br/2021/05/10/como-embaralhar-um-array-em-javascript-shuffle/
const magic3 = 3;
const magic4 = 4;
const getRandomInt = (arr = [1, 2, magic3, magic4]) => {
  for (let i = arr.length - 1; i > 0; i -= 1) {
    // Escolhendo elemento aleatório
    const j = Math.floor(Math.random() * (i + 1));
    // Reposicionando elemento
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  // Retornando array com aleatoriedade
  return arr;
};

export default getRandomInt;
