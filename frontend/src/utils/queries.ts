import {gql } from '@apollo/client';

export const GET_ITEMS = gql`
  query GetItems {
    books{
      author
      coverPhotoURL
      readingLevel
      title
    }
  }
`;
