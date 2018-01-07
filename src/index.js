import React from 'react';
import ReactDOM from 'react-dom';
import CommentBox from './CommentBox';
import App from './App';
import SignUp from './SignUp';
import style from './style';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from 'react-router-dom'

    //<CommentBox
    //    url='http://localhost:3001/api/comments'
    //    pollInterval={2000} />,

     //   <User
     //   url='http://localhost:3001/api/users' />,

/*
    <Login/>,


    document.getElementById('root')
    */
    //  ReactDOM.render(<App/>, document.getElementById("app"))

/*const Application = () => (
	<Router>
		<div>
		<h1>sdfsdfgsdf</h1>
			<Switch>
			<Route path="/" exact component={App}/>
			<Route path="/comment-box" component={CommentBox}/>
			</Switch>
		</div>
	</Router>
	)

export default Application
*/

//				<Route path="/comment-box" component={CommentBox} url={"http://localhost:3001/api/comments"} pollInterval={2000} />

//				<Route path="/comment-box" render={routeProps => <CommentBox url='http://localhost:3001/api/comments' pollInterval={2000} />} />

/*const PrivateRoute0 = ({ ...rest }) => (
  <Route {...rest} render={(props) => (
    localStorage.getItem('isAuthenticated') === "true"
      ? <CommentBox url='http://localhost:3001/api/comments' pollInterval={2000} id_thread={666} />
      : <Redirect to='/' />
  )} />
)*/

// <Route component={App}/>
const PrivateRoute = ({ id_thread, ...rest }) => (
  <Route {...rest} render={(props) => (
    localStorage.getItem('isAuthenticated') === "true"
      ? <CommentBox url='http://pwa-forum-backend.eu-4.evennode.com/api/comments' pollInterval={2000} id_thread={props.match.params.id_thread} />
      : <Redirect to='/' />
  )} />
)

ReactDOM.render(

	<Router>
		<div>

		<h1 style={ style.h1 }>Welcome {localStorage.getItem('username')}</h1>
          <ul>
            <li><Link to="/" class="btn btn-info" role="button" >Home</Link></li>
          </ul>

			<Switch>
				<Route path="/" exact component={App}/>
				<Route path="/sign-up" component={SignUp}/>
				
				<PrivateRoute path='/comment-box/:id_thread' />

			</Switch>
		</div>
	</Router>,
    
    document.getElementById('root')
   
);