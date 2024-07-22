import React from "react";

function getValue() {
  let i = 0;
  return function(value, title) {
    i++;
    return value ? <span style={{display: 'block'}} key={`value-${i}`}>{title} - <b>{value}</b></span> : null;
  }
}

export function getListOfTournamentsFields(tournament) {
  if (!tournament) return;

  let output = [];
  const value = getValue();

  output.push(value(tournament.place, 'город'));
  output.push(value(tournament.country, 'страна'));
  output.push(value(tournament.covering, 'покрытие'));
  output.push(value(tournament.format, 'формат'));
  output.push(value(tournament.games, 'игр'));
  output.push(value(tournament.teams, 'команд'));

  return output;
}
