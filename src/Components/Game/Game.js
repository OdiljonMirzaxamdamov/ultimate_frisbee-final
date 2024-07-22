import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles/index';

import { saveGameAndLog } from '../../helpers';
import {
  gameControl, loadGames, loadLog, loadRosters, updateGameTimer, loadPlayers, clearGame,
} from '../../AC';
import {
  FORCE_UPLOAD_GAME, TIME_PAUSE, TIME_START, TIME_STOP,
} from '../../constants';

import AppDrawer from '../AppDrawer';
import GameTimer from '../GameTimer';
import GameControl from '../GameControl';
import GameLog from '../GameLog';
import GameViewLog from '../GameViewLog';
import TabContainer from './TabContainer';
import GameTabs from './GameTabs';
import styles from './GameStyles';

function Game({
  id, classes, game, log, loadGames, loadLog, loadRosters, loadPlayers, clearGame, gameControl,
}) {
  const [tabValue, setTabValue] = useState(0);

  const toggleTimer = () => {
    gameControl(game.isTimeOn ? TIME_PAUSE : TIME_START, game);
  };

  const handlerStop = () => {
    if (!game.inProgress) {
      window.alert('Не могу завершить игру! Игра не запущена.');
      return;
    }
    if (window.confirm('Вы хотите завершить игру?') && !game.isFinished) {
      gameControl(TIME_STOP, game);
    }
  };

  const handlerForceUploadGame = () => {
    gameControl(FORCE_UPLOAD_GAME, game);
  };

  const handleChangeTab = (event, newValue) => {
    setTabValue(newValue);
  };

  const forceUpdateFromServer = () => {
    if (window.confirm('Загрузить версию игры с сервера? (возможна потеря последних данных, введенных с Вашего устройства)')) {
      loadGames();
      loadLog(game.logID);
      loadPlayers();
      loadRosters();
    }
  };

  const forceEraseGame = () => {
    if (window.confirm('Внимание! Вы сотрете все данные об игре без возможности восстановления! Продолжить?')) {
      clearGame(game);
    }
  };

  const handleSaveGame = () => {
    saveGameAndLog(game, log);
  };

  return (
    <div>
      <AppDrawer
        title={(
          <GameTimer
            gameID={id}
            initialTime={game.timePassed || 0}
            isTimerOn={game.isTimeOn}
            isGameInProgress={game.inProgress}
          />
)}
        isGame
        isTimerOn={game.isTimeOn}
        toggleTimer={toggleTimer}
        handlerStop={handlerStop}
        handlerForceUploadGame={handlerForceUploadGame}
        forceUpdateFromServer={forceUpdateFromServer}
        forceEraseGame={forceEraseGame}
        uploadingStatus={game.isUploading}
        saveGame={handleSaveGame}
      />

      <main className={classes.content}>
        <GameTabs
          tabValue={tabValue}
          handleChangeTab={handleChangeTab}
        />

        {tabValue === 0 && (
        <TabContainer>
          <GameControl gameID={id} />
        </TabContainer>
        )}

        {tabValue === 1 && (
        <TabContainer>
          <GameLog
            gameID={id}
            logID={game.logID}
            teamOneID={game.teamOneID}
            teamTwoID={game.teamTwoID}
          />
        </TabContainer>
        )}

        {tabValue === 2 && (
        <TabContainer>
          Статистика
        </TabContainer>
        )}

        {tabValue === 3 && (
        <TabContainer>
          <GameViewLog
            gameID={id}
            logID={game.logID}
            teamOneID={game.teamOneID}
            teamTwoID={game.teamTwoID}
          />
        </TabContainer>
        )}
      </main>
    </div>
  );
}

Game.propTypes = {
  id: PropTypes.string.isRequired,
  tournamentID: PropTypes.string.isRequired,
  // from store
  user: PropTypes.object.isRequired,
  game: PropTypes.object.isRequired,
  log: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  const { id } = ownProps;
  return {
    user: state.user.userData,
    game: state.games.list.get(id),
    log: state.logs.list.get(state.games.list.get(id).logID),
  };
};

const mapDispatchToProps = (dispatch) => ({
  loadGames: () => dispatch(loadGames()),
  loadLog: (logID) => dispatch(loadLog(logID)),
  loadRosters: () => dispatch(loadRosters()),
  loadPlayers: () => dispatch(loadPlayers()),
  clearGame: (game) => dispatch(clearGame(game)),
  updateGameTimer: (gameID, time) => dispatch(updateGameTimer(gameID, time)),
  gameControl: (type, game, log) => dispatch(gameControl(type, game, log)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(Game));
