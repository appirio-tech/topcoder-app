import moment from 'moment'

export default class FooterController {
  constructor() {
    this.currentYear = moment().format('YYYY')
  }
}
