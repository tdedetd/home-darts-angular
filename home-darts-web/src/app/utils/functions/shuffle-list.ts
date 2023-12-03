export function shuffleList<T>(list: T[]): T[] {
  const listCopy = [...list];

  for (let i = 0; i < listCopy.length; i++) {
    const randomIndex = Math.floor((listCopy.length - i) * Math.random()) + i;

    const buffer = listCopy[i];
    listCopy[i] = listCopy[randomIndex];
    listCopy[randomIndex] = buffer;
  }

  return listCopy;
}
