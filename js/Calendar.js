import React from 'react'
import { render } from 'react-dom'
import BigCalendar from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { getEvents } from './memgo-api'

BigCalendar.momentLocalizer(moment)

class MemtechCalendar extends React.Component {
  constructor () {
    super()
    this.state = {
      events: []
    }
  }
  componentDidMount () {
    getEvents((events) => {
      this.setState({events})
    })
  }
  render () {
    return (
      // React Components in JSX look like HTML tags
      <BigCalendar
        popup
        style={{height: '100vh'}}
        events={this.state.events}
        onSelectEvent={this.handleSelectEvent}
        views={['month']}
      />
    )
  }
  handleSelectEvent (event, e) {
    window.open(event.url, '_blank')
  }
}

render(<MemtechCalendar />, document.getElementById('memtech-calendar'))
