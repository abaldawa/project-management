/**
 * @author Abhijit Baldawa
 */

interface Currency {
  id: string;
  name: string;
  isoCode: string;
  symbol: string;
}

const mockCurrencies: Currency[] = [
  {
    id: 'f1e9ae8d-9946-45ad-9ead-4164940c2392',
    name: 'Euro',
    isoCode: 'EUR',
    symbol: '€',
  },
  {
    id: '1b634e6c-ff13-459f-be3b-62ca6060e1b2',
    name: 'US Dollar',
    isoCode: 'USD',
    symbol: '$',
  },
];

const findCurrencyById = (currencyId: string) =>
  mockCurrencies.find((currency) => currency.id === currencyId);

const getAllCurrencies = () => mockCurrencies;

export { Currency, findCurrencyById, getAllCurrencies };
