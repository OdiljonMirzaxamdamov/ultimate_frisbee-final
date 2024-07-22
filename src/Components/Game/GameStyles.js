import { DRAWER_WIDTH } from '../../constants';

const styles = (theme) => ({

  root: {
    display: 'flex',
  },

  toolbar: theme.mixins.toolbar,

  content: {
    flexGrow: 1,

    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${DRAWER_WIDTH}px)`,
      marginLeft: DRAWER_WIDTH,
      paddingTop: 48,
    },

    paddingTop: 32,
  },

  tabs: {
    flexGrow: 1,
  },

  tab: {
    minHeight: 30,
  },

});

export default styles;
