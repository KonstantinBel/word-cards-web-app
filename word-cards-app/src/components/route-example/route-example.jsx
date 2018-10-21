import React from 'react';
import {Switch, Link, Route} from 'react-router-dom'
import topicsArray from './topics'

export default class RouteExample extends React.Component {
  constructor(props) {
    super(props)
    this.match = props.match
  }
  render () {
    return (
      <div>
        <h1>Menu</h1>
        <ul>
          <li><Link to={this.match.url}>Home</Link></li>
          <li><Link to={`${this.match.url}/topics`}>Topics</Link></li>
          <li><Link to='/word-cards-app'>Go to main app page</Link></li>
        </ul>
        <hr/>
        <Switch>
          <Route exact path={this.match.path} component={Home}></Route>
          <Route path={`${this.match.path}/topics`} component={Topics}></Route>
        </Switch>
      </div>
    )
  }
}

function Home () {
  return (
    <h2>
      HOME
    </h2>
  )
}

function Topics ({ match }) {
  return (
    <div>
      <h2>Topics</h2>
      <ul>
        {topicsArray.map((val, id) => (
          <li key={id}>
            <Link to={`${match.url}/${val.id}`}>{val.name}</Link>
          </li>
        ))}
      </ul>
      <hr/>
      <Route path={`${match.path}/:topicId`} component={Topic}/>
    </div>
  )
}

function Topic ({ match }) {
  const topic = topicsArray.find(({ id }) => id === match.params.topicId)
  return (
    <div>
      <h3>Topic menu</h3>
      <p>{topic.description}</p>
      <ul>
        {topic.resources.map(({ id, name }) => (
          <li key={id}>
            <Link to={`${match.url}/${id}`}>{name}</Link>
          </li>
        ))}
      </ul>
      <Route path={`${match.path}/:resourceId`} component={Resource}/>
    </div>
  )
}

function Resource ({ match }) {
  const resourse = topicsArray.find(({ id }) => id === match.params.topicId).resources
    .find(({ id }) => id === match.params.resourceId)
  return (
    <div>
      <h4>{resourse.name}</h4>
      <p>{resourse.description}</p>
      <a href={resourse.url}>read more</a>
    </div>
  )
}
