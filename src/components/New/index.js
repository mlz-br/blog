import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import './new.css';
import firebase from '../../firebase';

class New extends Component {

    constructor(props) {
        super(props);
        this.state = {
            título: '',
            imagem: '',
            descricao: '',
            alert: ''
        }
        this.cadastrar = this.cadastrar.bind(this)

    }
    componentDidMount(){
        if(!firebase.getCurrent()) {
            this.props.history.replace('/');
            return null;
        }
    }

    cadastrar = async(e) => {

        e.preventDefault(); 
        if(this.state.titulo !== '' && this.state.imagem !== '' && this.state.descricao !== '') {
            let posts = firebase.app.ref('posts');
            let chave = posts.push().key;
            await posts.child(chave).set({
                titulo: this.state.titulo,
                image: this.state.image,
                descricao: this.state.descricao,
                autor: localStorage.nome
            });
            this.props.history.push('/dashboard');
        } else {
            this.setState({alert: 'Preencha todos os campos' });
        }

    }
 
    render() {
        return(
            <div> 
               <header id="new">
                   <Link to="/dashboard">Voltar</Link>
               </header>
               <form onSubmit={this.cadastrar} id="new-post">
                   <span>{this.state.alert}</span>
                   <label>Título</label>
                   <input type="text" 
                        placeholder="Nome do post" 
                        value= {this.state.título}
                        autoFocus
                        onChange={(e) => this.setState({titulo: e.target.value})} /> <br/>

                   <label>Url da imagem:</label>
                   <input type="text" 
                        placeholder="Url do imagem..." 
                        value= {this.state.imagem}
                        onChange={(e) => this.setState({titulo: e.target.imagem})} /> <br/>

                   <label>Descrição</label>
                   <textarea type="text" 
                        placeholder="Descrição do post ..." 
                        value= {this.state.descricao}
                        onChange={(e) => this.setState({descricao: e.target.value})} /> <br/>

                   <button type="submit">Cadastar</button>


               </form>
            </div>
        );
    }
}


export default withRouter(New);