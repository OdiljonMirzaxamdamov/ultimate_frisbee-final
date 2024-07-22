import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import styles from './GameStyles';

function GameTabs(props) {
  const { classes, tabValue, handleChangeTab } = props;

  return (
    <AppBar position="static" color="default" className={classes.tabs}>
      <Tabs
        value={tabValue}
        onChange={handleChangeTab}
        variant="scrollable"
        scrollButtons="off"
        indicatorColor="primary"
        textColor="primary"
        className={classes.tab}
      >
        <Tab label="Управление" className={classes.tab} />
        <Tab label="Лог" className={classes.tab} />
        <Tab label="Статистика" className={classes.tab} />
        <Tab label="Ход игры" className={classes.tab} />
      </Tabs>
    </AppBar>
  );
}

GameTabs.propTypes = {
  classes: PropTypes.object.isRequired,
  tabValue: PropTypes.number.isRequired,
  handleChangeTab: PropTypes.func.isRequired,
};

export default withStyles(styles)(GameTabs);
