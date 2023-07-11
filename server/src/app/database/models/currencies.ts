/**
 * @author Abhijit Baldawa
 */

interface CurrencyModel {
  /**
   * Database id of the currency
   */
  id: string;

  /**
   * Full name of the currency
   *
   * Ex. `Euro`
   */
  name: string;

  /**
   * Three digit ISO currency code
   *
   * Ex. `EUR`
   */
  isoCode: string;

  /**
   * Symbol of the currency record
   *
   * Ex. `€`
   */
  symbol: string;
}

/**
 * Dummy mock table data for this model
 */
const mockCurrencies: CurrencyModel[] = [
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

const findCurrencyById = (currencyId: CurrencyModel['id']) =>
  mockCurrencies.find((currency) => currency.id === currencyId);

export { CurrencyModel, findCurrencyById };
