import JsonRequest from './JsonRequest';

const { GOOGLE_API_KEY } = process.env;

export default function shorten(longUrl, callback) {
  if (typeof GOOGLE_API_KEY === 'undefined') {
    return callback(longUrl);
  }

  new JsonRequest(
    'POST',
    `https://www.googleapis.com/urlshortener/v1/url?key=${GOOGLE_API_KEY}`,
    link => callback(link.id),
    error => console.error(error),
    { longUrl },
    [['Content-Type', 'application/json']]
  );
}
