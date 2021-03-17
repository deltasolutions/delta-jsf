function sum(a, b) {
    return a + b;
  }

test(`adds 1 + 2 to equal 3`, async () => {
    expect(sum(1, 2)).toBe(3)
});
