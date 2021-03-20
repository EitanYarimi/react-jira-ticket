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
import CheckIcon from '@material-ui/icons/Check';
import Box from '@material-ui/core/Box';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';


class Ticket extends React.Component {
  
  constructor(props) {
    super(props);
    this.ticketFormRef = React.createRef();
    this.state = {
      formSubmited: false,
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

  handleCreateTicket = () => {
    const ticketData = this.ticketFormRef.current.validate() 
    if (ticketData) {
      ProjectService.postTicket(ticketData, this.state.ticketType).then(respose => {
        if (respose.data.ok) {
          this.setState({ formSubmited: true })
        }
      })
    }
  }

  onTicketTypeClick = (event, ticketType) => {
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
              onChange={this.onTicketTypeClick}
              showLabels
              className={classes.root}
            >
              <BottomNavigationAction value={TicketTypes.JIRA} label="Jira"  />
              <BottomNavigationAction value={TicketTypes.MONDAY} label="Monday"/>
              <BottomNavigationAction value={TicketTypes.SLACK} label="Slack" />
            </BottomNavigation>
          <TicketForm
            ref={this.ticketFormRef}
            ticketType={this.state.ticketType}
            projects={this.state.projects}
          ></TicketForm>
          { !this.state.formSubmited &&
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
          }
          
          {this.state.formSubmited &&
            <Box color="success.main">
              <Typography component="h5" variant="h6" align="right">
                <span> <InlineIcon icon={CheckIcon} />Ticket Submitted</span>  
              </Typography>
            </Box>
          }
        </Paper>
      </main>
    </React.Fragment>
  }
}

export default withStyles(styles, { withTheme: true })(Ticket);