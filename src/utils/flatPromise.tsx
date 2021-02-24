export const flatPromise = async (maybePromise: any) => {
  const value = await maybePromise;
  if (typeof value === 'object' || Array.isArray(value)) {
    for (const k of Object.keys(value)) {
      value[k] = await flatPromise(value[k]);
    }
  }
  return value;
};
