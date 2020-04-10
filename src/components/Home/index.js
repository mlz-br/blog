import React, { Component } from 'react';
import firebase from '../../firebase';
import './home.css';

class Home extends Component {
    state = {
        posts:[]
    }

    componentDidMount(){
        firebase.app.ref('posts').once('value', (snapshot) => {
            let state=this.state;
            state.posts = [];

            snapshot.forEach((childItem) => {
                state.posts.push({
                    key: childItem.key,
                    titulo: childItem.val().titulo,
                    image: childItem.val().image,
                    descricao: childItem.val().descricao,
                    autor: childItem.val().autor
                })
            });

            this.setState(state);
        })
    }

    render() { 
        return(
            <section id="post">
                {this.state.posts.map((posts) => {
                    return(
                        <article key={posts.key}>
                            <header>
                                <div className="title">
                                    <strong>{posts.titulo}</strong>
                                    <span>{posts.autor}</span>                                    
                                </div>
                            </header>
                            <img src={posts.image} alt="Capa do Post" />
                            <footer>
                                <p>{posts.descricao}</p>
                            </footer>

                        </article>
                    )
                })}
            </section>

        )
    }

}

export default Home;
