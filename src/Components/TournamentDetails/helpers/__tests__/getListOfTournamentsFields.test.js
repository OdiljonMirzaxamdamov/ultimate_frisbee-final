
import React from 'react';
import {getListOfTournamentsFields} from "../getListOfTournamentsFields";
import { renderToStaticMarkup } from 'react-dom/server';

describe('getListOfTournamentsFields', () => {
  it('выполнить return если tournament отсутствует(undefined)', () => {
    const result = getListOfTournamentsFields(null);
    expect(result).toBeUndefined();
  });

  it('Параметры турнира должны корректно отображаться', () => {
    const tournament = {
      place: "Великий Новгород",
      country: "Россия",
      covering: "Паркет",
      format: "5x5",
      games: 5,
      teams: 24
    };

    const result = getListOfTournamentsFields(tournament);
    const resultHtml = result.map(element => renderToStaticMarkup(element)).join('');

    const expectedOutput = [
      <span style={{ display: 'block' }} key={`value-1`}>город - <b>Великий Новгород</b></span>,
      <span style={{ display: 'block' }} key={`value-2`}>страна - <b>Россия</b></span>,
      <span style={{ display: 'block' }} key={`value-3`}>покрытие - <b>Паркет</b></span>,
      <span style={{ display: 'block' }} key={`value-4`}>формат - <b>5x5</b></span>,
      <span style={{ display: 'block' }} key={`value-5`}>игр - <b>5</b></span>,
      <span style={{ display: 'block' }} key={`value-6`}>команд - <b>24</b></span>,
    ];

    const expectedOutputHtml = expectedOutput.map(element => renderToStaticMarkup(element)).join('');
    expect(resultHtml).toBe(expectedOutputHtml);
  });

  it('Должны быть показаны только существующие параметры', () => {
    const tournament = {
      place: "Серпухов",
      country: "Россия",
      covering: "",
      format: "7x7",
      games: 5,
      teams: 0
    };

    const result = getListOfTournamentsFields(tournament);
    const resultHtml = result.map(element => renderToStaticMarkup(element)).join('');

    const expectedOutput = [
      <span style={{ display: 'block' }} key={`value-1`}>город - <b>Серпухов</b></span>,
      <span style={{ display: 'block' }} key={`value-2`}>страна - <b>Россия</b></span>,
      <span style={{ display: 'block' }} key={`value-3`}>формат - <b>7x7</b></span>,
      <span style={{ display: 'block' }} key={`value-4`}>игр - <b>5</b></span>
    ];

    const expectedOutputHtml = expectedOutput.map(element => renderToStaticMarkup(element)).join('');
    expect(resultHtml).toBe(expectedOutputHtml);
  });

})
