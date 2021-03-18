import axios from 'axios'
import MockAdapter from 'axios-mock-adapter';
import { JIRA_API_REQUEST, SLACK_API_REQUEST, MONDAY_API_REQUEST } from './URL'
import { JiraProjects, MondayProjects, SlackChannels } from './mock/projectsData'
import {TicketTypes } from '../common/TickeTypes'

const mock = new MockAdapter(axios);
mock.onGet(JIRA_API_REQUEST).reply(200, { data: JiraProjects });
mock.onGet(SLACK_API_REQUEST).reply(200, { data: SlackChannels });
mock.onGet(MONDAY_API_REQUEST).reply(200, { data: MondayProjects });


export class ProjectService {

  static getJIRAProjects() {
     return axios.get(JIRA_API_REQUEST)
         
  }
  static getMondayProjects() {
     return axios.get(MONDAY_API_REQUEST)
         
  }
  static getSlackChannels() {
     return axios.get(SLACK_API_REQUEST)
         
  }
}

export const ProjectServiceMapper = {
  [TicketTypes.JIRA]: ProjectService.getJIRAProjects,
  [TicketTypes.MONDAY]: ProjectService.getMondayProjects,
  [TicketTypes.SLACK]: ProjectService.getSlackChannels,
}
