/// <reference types="cypress" />

import ingredients from '../fixtures/ingredients.json';
import token from '../fixtures/token.json';
import order from '../fixtures/order.json';
import { deleteCookie, setCookie } from '../../src/utils/cookie';

beforeEach(() => {
  cy.intercept('GET', '/api/ingredients', ingredients);
});

describe('Проверяем функциональность приложения', function () {
  it('Добавление ингредиента из списка ингредиентов в конструктор', function () {
    cy.visit('/');
    cy.get(`[data-cy=constructor]`).contains('Выберите булки');
    cy.contains('Добавить').click();
    cy.get(`[data-cy=constructor]`)
      .contains('Выберите булки')
      .should('not.exist');
  });

  it('Открытие модального окна', function () {
    cy.visit('/');
    cy.contains('булка').click();
    cy.contains('Калории');
    cy.get(`[data-cy=modal] button`).click();
    cy.contains('Калории').should('not.exist');
  });

  it('Создание заказа', function () {
    cy.intercept('GET', 'api/auth/user', token);
    cy.intercept('POST', 'api/orders', order);
    setCookie('accessToken', token.accessToken);
    localStorage.setItem('refreshToken', token.refreshToken);

    cy.visit('/');
    cy.get(`[data-cy=ingredient]`).eq(1).contains('Добавить').click();
    cy.get(`[data-cy=ingredient]`).eq(3).contains('Добавить').click();
    cy.contains('Оформить').click();
    cy.contains('1120');
    cy.contains('идентификатор заказа');
    cy.get(`[data-cy=modal] button`).click();
    cy.contains('идентификатор заказа').should('not.exist');
    cy.contains('Выберите булки');
    cy.contains('Выберите начинку');

    deleteCookie('accessToken');
    localStorage.removeItem('refreshToken');
  });
});
