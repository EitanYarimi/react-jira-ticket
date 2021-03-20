import React from 'react';
import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { IssueTypes } from '../common/IssueTypes';


class TicketForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      validate: false,
      ticketType: props.ticketType,
      issueTypes: [],
      issueType:'',
      project:'',
      description: '',
      summary: ''
    };
  }

  validate = () => {
    this.setState({ validate: true });

    const ticketData = {
      issueType: this.state.issueType,
      project: this.state.project,
      description: this.state.description,
      summary: this.state.summary
    }

    const isValid = Object.values(ticketData).every(x => (x !== null && x !== ''));
    
    return  isValid? ticketData : null
  }
  onDescriptionFieldChange = (event) => {
    this.setState({description: event.target.value});
  }
  onSummaryFieldChange = (event) =>{
    this.setState({summary: event.target.value});
 }
  onProjectChange = (changeEvent, value) => { 
    this.setState({
      issueTypes: IssueTypes,
      project: value.props.value,
    })
  }
  onIssueTypeChange =(changeEvent, value) => {
    this.setState({
      issueType: value.props.value,
      summary: 'default summary',
      description : 'default description'
    })
  }

  static getDerivedStateFromProps(props, state) {
    if (props.ticketType !== state.ticketType) {
      return {
        ticketType: props.ticketType,
        validate: false,
        issueTypes: [],
        issueType: '',
        project: '',
        description: '',
        summary: ''
      }
    }
    else { return state } 
  }
  
  render() {
    return (
      <React.Fragment>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={9}>
            <Typography variant="h6" gutterBottom>
              Project
      </Typography>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Typography variant="h6" gutterBottom>
              Issue  Type
      </Typography>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={9}>
            <Select
              error={this.state.validate && !this.state.project}
              ref={this.wrapper}
              onChange={this.onProjectChange}
              required
              id="project"
              name="project"
              variant="outlined"
              value={this.state.project}
              fullWidth
            >
              {this.props.projects.map(project => {
                return <MenuItem key={project} value={project}>{project}</MenuItem>
              })}
            </Select>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Select
              error={this.state.validate && !this.state.issueType}
              ref={this.wrapper}
              onChange={this.onIssueTypeChange}
              required
              id="issueType"
              name="issueType"
              variant="outlined"
              value={this.state.issueType}
              fullWidth
            >
              {this.state.issueTypes.map(type => {
                return <MenuItem key={type} value={type}>{type}</MenuItem>
              })}
            </Select>
          </Grid>
        </Grid>
        <Typography variant="h6" gutterBottom>
          Summary
      </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              error={this.state.validate && !this.state.summary}
              value={this.state.summary}
              onChange={this.onSummaryFieldChange}
              id="summary"
              name="summary"
              variant="outlined"
              fullWidth
            />
          </Grid>
        </Grid>
        <Typography variant="h6" gutterBottom>
          Description
         </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              error={this.state.validate && !this.state.description}
              value={this.state.description}
              onChange={this.onDescriptionFieldChange}
              id="description"
              name="description"
              multiline
              rows={5}
              variant="outlined"
              fullWidth
            />
          </Grid>
        </Grid>
      </React.Fragment>
    )
  }
}

export default TicketForm