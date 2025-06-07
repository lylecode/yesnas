import ky from 'ky';

const api = ky.create({
  stringifyJson: (data) =>
    JSON.stringify(data, (key, value) => {
      if (key.endsWith('date')) {
        return value;
      }

      return value;
    }),
});

export default api;
