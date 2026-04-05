export const getRandomValue = (): Promise<{
  value: number;
  success: boolean;
  latency: number;
}> => {
  return new Promise((resolve, reject) => {
    const start = Date.now();

    // simulate latency (100ms - 1000ms)
    const delay = Math.floor(Math.random() * 900) + 100;

    setTimeout(() => {
      const randomNumber = Math.random();
      const latency = Date.now() - start;

      if (randomNumber < 0.5) {
        // simulate failure
        reject({
          value: randomNumber,
          success: false,
          latency,
          message: "Random failure occurred",
        });
      } else {
        // success
        resolve({
          value: randomNumber,
          success: true,
          latency,
        });
      }
    }, delay);
  });
};