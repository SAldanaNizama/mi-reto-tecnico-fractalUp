import { gql } from '@apollo/client';

export const GET_ALL_COUNTRIES = gql`
    query {
        countries {
            code
            name
            capital
            languages {
                name
            }continent {
        code
        name
      }
            currency
            states {
                name
            }
        }
    }
`;

export const GET_COUNTRY_BY_CODE = gql`
    query getCountryByCode($code: ID!) {
        country(code: $code) {
            code
            name
            capital
            languages {
                name
            }
            currency
            states {
                name
            }
        }
    }
`;
