export function makeId(n = 5) {
  let text = '';
  const possible = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

  for (let i = 0; i < n; ++i) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return text;
}
