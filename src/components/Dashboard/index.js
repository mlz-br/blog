import React, { Component} from 'react';
import { withRouter, Link } from 'react-router-dom';
import firebase from '../../firebase';
import './dashboard.css'
class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            nome:localStorage.nome 
        }

        this.logout = this.logout.bind(this);
    } 

    async componentDidMount(){
        if(!firebase.getCurrent()) {
            this.props.history.replace('/login');
            return null;
        }
        
        firebase.getUserName((info) => {
            try {
                localStorage.nome = info.val().nome || '';
                this.setState({nome: localStorage.nome ||''});
                
            } catch (error) {                   
                localStorage.nome = '';
                this.setState({nome: ''});
            }
        })

    }

    logout = async() => {
        await firebase.logout()
        .catch((error) => {
            console.log(error);
        });
        localStorage.removeItem("nome");
        this.props.history.push ('/');
    }

    render() {
        return(
            <div id="dashboard">
                <div className="user-info">
                    <h1>Olá {this.state.nome} </h1>
                    <Link to="/dashboard/new">Novo post</Link>
                </div>
                <p>Logado com: {firebase.getCurrent()}</p>
                <button onClick={() => this.logout()}>Deslogar</button>
            </div>
        );
    }
}

export default withRouter(Dashboard);