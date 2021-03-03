function importAll(r) {
  return r.keys().map(r);
}

function randomInteger(min, max) {
  const rand = Math.floor(min + Math.random() * (max + 1 - min));
  return Math.floor(rand);
}

export { importAll, randomInteger };