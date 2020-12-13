import { createGlobalStyle } from "styled-components";
export const GlobalStyles = createGlobalStyle`
  body {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    transition: all 0.50s linear;
  }
  .card-body {
    color: ${({ theme }) => theme.text};
  }

  header {
    border-bottom: 1px solid ${({ theme }) => theme.headerBorderColor}; 
  }

  header h3 {
    color: ${({ theme }) => theme.logoColor}; 
  }

  .card {
    background: ${({ theme }) => theme.body};
    border-color: ${({ theme }) => theme.cardBorderColor};
  }

  .card-body {
    color: ${({ theme }) => theme.cardFgColor};
  }

  .card-title {
    color: ${({ theme }) => theme.cardTitleColor};
  }

  .card-text {
    color: ${({ theme }) => theme.cardTextColor};
  }

  .list-group button {
    background: ${({ theme }) => theme.categoriesBgColor};
    color: ${({ theme }) => theme.categoriesFgColor};
    border-color: ${({ theme }) => theme.categoriesBorderColor};
  }

  .new-peer-title {
    color: ${({ theme }) => theme.newPeerTitle};
  }

  .new-peer-category {
    color: ${({ theme }) => theme.newPeerCategoryFgColor};
  }

  .lbl-new-peer {
    color: ${({ theme }) => theme.newPeerLabelColor};
  }

  .submit-title {
    color: ${({ theme }) => theme.submitTitleColor};
  }

  .submit-title-info {
    color: ${({ theme }) => theme.submitTitleInfoColor};
  }

  .lbl-submit-input {
    color: ${({ theme }) => theme.submitLabelColor};
  }

`;
