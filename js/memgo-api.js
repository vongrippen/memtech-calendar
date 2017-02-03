import request from 'superagent'
import moment from 'moment'

export function getEvents (callback) {
  let start = moment().subtract(6, 'months').valueOf()
  let end = moment().add(6, 'months').valueOf()
  let url = `https://memgo-api.herokuapp.com/calendar/range.json?timerange=${start},${end}`
  request
    .get(url)
    .end((err, resp) => {
      if (!err) {
        const events = []
        JSON.parse(resp.text).map((event) => {
          events.push({
            start: moment(event.time),
            end: moment(event.time).add(1, 'hours'),
            title: event.name,
            url: event.event_url
          })
        })
        callback(events)
      }
    })
}
