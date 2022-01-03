// cpu intensive service

const fibonacci = (num) => {
  if (num < 2) {
    return 1;
  }
  return fibonacci(num - 1) + fibonacci(num - 2);
}

process.on('message', (message) => {
  // const sum = fibonacci(message);
  const sum = 1;
  process.send(sum);
  process.exit(0);
});

export default fibonacci;
