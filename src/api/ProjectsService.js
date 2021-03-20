import axios from 'axios'
import MockAdapter from 'axios-mock-adapter';
import { JIRA_API_REQUEST, SLACK_API_REQUEST, MONDAY_API_REQUEST, SEEMPLICITY_SERVER_API } from './URL'
import { JiraProjects, MondayProjects, SlackChannels } from './mock/projectsData'
import {TicketTypes } from '../common/TickeTypes'

const mock = new MockAdapter(axios);
mock.onGet(JIRA_API_REQUEST).reply(200, { data: JiraProjects });
mock.onGet(SLACK_API_REQUEST).reply(200, { data: SlackChannels });
mock.onGet(MONDAY_API_REQUEST).reply(200, { data: MondayProjects });
mock.onPost(SEEMPLICITY_SERVER_API).reply(200, {ok: true});



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
   static postTicket(tickerData, ticketType) {
     return axios.post(SEEMPLICITY_SERVER_API, { data: tickerData, type: ticketType })
  }
}

export const ProjectServiceMapper = {
  [TicketTypes.JIRA]: ProjectService.getJIRAProjects,
  [TicketTypes.MONDAY]: ProjectService.getMondayProjects,
  [TicketTypes.SLACK]: ProjectService.getSlackChannels,
}
