import { connect } from 'react-redux'
import NBAForm from '../components/NBAForm'
import { fetchPlayerStatsRequest, fetchPlayerIDRequest, showInputError, showLoader } from '../actions'

const mapStateToProps = ({playerInfo}) => ({playerInfo})

const bindActionsToDispatch = dispatch => (
    {
        fetchPlayerIDRequest: (fname, lname, year) => dispatch(fetchPlayerIDRequest(fname, lname, year)),
        fetchPlayerStatsRequest: (player_id, year) => dispatch(fetchPlayerStatsRequest(player_id, year)),
        showInputError: (data) => dispatch(showInputError(data)),
        showLoader: (data) => dispatch(showLoader(data))
    }
)

const AppContainer = connect(mapStateToProps, bindActionsToDispatch)(NBAForm)

export default AppContainer
