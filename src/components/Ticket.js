import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TicketForm from './TicketForm';
import {styles} from '../theme'
import { withStyles } from "@material-ui/core/styles";
import { TicketTypes } from '../common/TickeTypes'
import { ProjectService, ProjectServiceMapper } from '../api/ProjectsService';
import { InlineIcon} from '@iconify/react';
import editIcon from '@iconify-icons/akar-icons/edit';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';


class Ticket extends React.Component {
  
  constructor(props) {
    super(props);
    this.wrapper = React.createRef();
    this.state = {
      ticketType: TicketTypes.JIRA,
      projects: [],
    };
  }
  componentDidMount() {
    ProjectService.getJIRAProjects()
      .then((response) => {
          this.setState({ projects: response.data.data });
        });
  }
  handleCreateTicket() {
    console.log('handleCreateTicket')
  }
  onTicketTypeClick(event, ticketType) {
    this.setState({ ticketType: ticketType }); 
    ProjectServiceMapper[ticketType]()
      .then((response) => {
          this.setState({ projects: response.data.data });
        });

  }
  render() {
    const { classes } = this.props
    return <React.Fragment>
      <CssBaseline />
      <AppBar position="absolute" color="default" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            SeemPlicity
          </Typography>
        </Toolbar>
      </AppBar>
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h3" variant="h5" align="left">
           <span> <InlineIcon icon={editIcon} />Create Ticket</span>  
          </Typography>
          <BottomNavigation
              value={this.state.ticketType}
              onChange={this.onTicketTypeClick.bind(this)}
              showLabels
              className={classes.root}
            >
              <BottomNavigationAction value={TicketTypes.JIRA} label="Jira"  />
              <BottomNavigationAction value={TicketTypes.MONDAY} label="Monday"/>
              <BottomNavigationAction value={TicketTypes.SLACK} label="Slack" />
            </BottomNavigation>
          <TicketForm
            ref={this.wrapper}
            ticketType={this.state.ticketType}
            projects={this.state.projects}
          ></TicketForm>
          <div className={classes.buttons}>
            <Button
              variant="contained"
              color="primary"
              onClick={this.handleCreateTicket}
              className={classes.button}
            >
              Create a Ticket
            </Button>
          </div>
        </Paper>
      </main>
    </React.Fragment>
  }
}

export default withStyles(styles, { withTheme: true })(Ticket);