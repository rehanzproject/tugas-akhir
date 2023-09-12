export const generateRandomNumbers = () => {
  for (let i = 0; i < 6; i++) {
    const min = 100000;
    const max = 999999;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
};
