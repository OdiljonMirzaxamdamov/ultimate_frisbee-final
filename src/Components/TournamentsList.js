import React from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {mapToArr} from "../helpers";

import {withStyles} from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
// import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import MoreVert from '@material-ui/icons/MoreVert';

import TournamentDetails from "./TournamentDetails/TournamentDetails";
import AddTournament from "./AddTournament";
import Loader from "./Loader";
import {loadTournamentsList} from "../AC";
import {Fab} from "@material-ui/core";


const styles = theme => ({
    root: {
        width: '100%',
        marginBottom: 50,
        // maxWidth: 700,
        backgroundColor: theme.palette.background.paper,
    },
    nested: {
        paddingLeft: theme.spacing.unit * 4,
        display: 'flex',
        flexDirection: 'column',
        // alignItems: 'right'
    },
    mainList: {
        paddingLeft: 0,
        marginTop: 64,

        display: 'flex',
        flexDirection: 'column',
    },

    link: {
        textDecoration: 'none',
    },

    fab: {
        position: 'fixed',
        bottom: theme.spacing.unit * 2,
        right: theme.spacing.unit * 2,

    },
    collapse: {
        color: 'rgba(0, 0, 0, 0.54)'
    },

    item: {
        display: 'flex',
        justifyContent: 'space-around',
    },

    name: {
        display: 'flex',
        justifyContent: 'flex-start',
        flexGrow: '0',
        flexBasis: '33%',
    },

    dates: {
        whiteSpace: 'normal',

        display: 'flex',
        justifyContent: 'center',
        flexGrow: '0',
        flexBasis: '33%',

        borderLeft: '1px solid grey',
        borderRight: '1px solid grey'
    },

    place: {
        display: 'flex',
        justifyContent: 'center',
        flexGrow: '0',
        flexBasis: '33%',
    },

    dateNowrap: {
        fontSize: '0.875rem',
        color: 'gray',
        whiteSpace: 'nowrap'
    },
});

class TournamentsList extends React.Component {
    state = {
        isCollapseOpen: [],
        isOpenAddTournament: false,
        clickedID: null,
    };

    componentDidMount() {
        const {loadTournamentsList} = this.props;
        loadTournamentsList();
    }

    componentDidUpdate(){
        const {shouldReload, loadTournamentsList} = this.props;

        if (shouldReload) {
            loadTournamentsList();
        }
    }

    setClickedID = (id, evt) => {
        evt.preventDefault();
        this.setState({
            clickedID: id
        })
    };

    renderTournamentsList() {
        const {tournamentsList, classes} = this.props;
        const list = mapToArr(tournamentsList.list);

        return list.map((tournament) => {
            return (
                <Link to={`/network/keeper/tournament/${tournament.id}`} className={classes.link} key={tournament.id}>
                    <ListItem className={classes.item}>

                        <ListItemText className={classes.name} primary={tournament.name}/>

                        <ListItemText className={classes.dates}>
                            <span className={classes.dateNowrap}>{tournament.dateStart} &nbsp;&nbsp;&nbsp;&nbsp;-</span>
                            <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                            <span className={classes.dateNowrap}>{tournament.dateEnd}</span>
                        </ListItemText>

                        <ListItemText className={classes.place} secondary={tournament.place}/>

                        {/*кнопка три-точки для подробной информайии о турнире*/}
                        <ListItemSecondaryAction>
                            <IconButton aria-label="Details" onClick={(evt) => this.setClickedID(tournament.id, evt)}>
                                <MoreVert />
                            </IconButton>
                        </ListItemSecondaryAction>

                    </ListItem>
                </Link>
            )
        })

    }

    handleOpenAddTournament = () => {
        this.setState({
            isOpenAddTournament: true
        })
    };

    // handleCloseAddTournament = (evt) =>{
    //     this.setState({
    //         isOpenAddTournament: false
    //     })
    // };

    resetClickedID = () => {
      this.setState({
          clickedID: null
      });
    };


    render() {
        const {classes, shouldReload, tournamentsList} = this.props;
        const {clickedID, isOpenAddTournament} = this.state;

        return (
            <div className={classes.root}>
                <List className={classes.mainList} component="nav" subheader={<ListSubheader component="div">Список турниров</ListSubheader>}>
                    {(shouldReload || tournamentsList.isLoading) ? <Loader />  : this.renderTournamentsList()}
                </List>

                {/*красная кнопка на основной странице для добавления турниров*/}
                {(shouldReload || tournamentsList.isLoading) ? null :
                    <Fab className={classes.fab} color='secondary' onClick={this.handleOpenAddTournament}>
                        <AddIcon/>
                    </Fab>
                }

                {isOpenAddTournament ? <AddTournament isOpen={isOpenAddTournament} toggleClose={() => this.setState({isOpenAddTournament: false})} /> : null}

                {clickedID ? <TournamentDetails id={clickedID} resetClickedID={this.resetClickedID} /> : null }
            </div>
        );
    }
}

TournamentsList.propTypes = {
    classes: PropTypes.object.isRequired,
    // from store
    tournamentsList: PropTypes.object.isRequired,
    shouldReload: PropTypes.bool
};
const mapStateToProps = (state) => {
    return {
        tournamentsList: state.tournamentsList,
        shouldReload: state.tournamentsList.shouldReload,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        loadTournamentsList: () => dispatch(loadTournamentsList())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(TournamentsList));
