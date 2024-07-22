import {
  LOAD_TOURNAMENTS, SHOULD_RELOAD, START, SUCCESS, DELETE_TOURNAMENT,
} from '../constants';
import { arrToMap } from '../helpers';
import { TournamentData, TournamentsListState } from '../model';

const defaultTournamentList = TournamentsListState();

export default (tournamentsListState = defaultTournamentList, action) => {
  const { type, payload } = action;

  switch (type) {
    case LOAD_TOURNAMENTS + START:
      return tournamentsListState.set('isLoading', true);

    case LOAD_TOURNAMENTS + SUCCESS:
      return tournamentsListState
        .set('isLoading', false)
        .set('shouldReload', false)
        .set('list', arrToMap(payload, TournamentData));

    case LOAD_TOURNAMENTS + SHOULD_RELOAD:
      return tournamentsListState.set('shouldReload', true);

    case DELETE_TOURNAMENT + START:
      return tournamentsListState.set('isLoading', true);

    case DELETE_TOURNAMENT + SUCCESS:
      return tournamentsListState
        .set('isLoading', false)
        .set('shouldReload', true);

    default:
      return tournamentsListState;
  }
};
