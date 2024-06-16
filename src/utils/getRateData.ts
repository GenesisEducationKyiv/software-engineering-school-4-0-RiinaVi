interface Response {
  response: {
    rates?: {
      UAH: number;
    };
  };
}

const getRateData = async (apiKey: string): Promise<number | undefined> => {
  const URL = 'https://api.currencybeacon.com/v1/latest?';
  const params = `api_key=${apiKey}&symbols=UAH`;
  const rawResponse = await fetch(URL + params);
  const jsonResponse = (await rawResponse.json()) as Response;

  return jsonResponse.response?.rates?.UAH;
};

export default getRateData;
