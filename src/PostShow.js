import React from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'

class PostShow extends React.Component{
    constructor(){
        super()
        this.state={
             user:{},
             post:{},
             comments:[]
        }
    }

    componentDidMount()
    {
        
        const userId=this.props.match.params.userId
       
        axios.get(`http://jsonplaceholder.typicode.com/posts/${userId}`)
        .then(response=>{
             const post=response.data
             console.log(post)
            this.setState({post})

        axios.get(`http://jsonplaceholder.typicode.com/users/${post.userId}`)
         .then(response=>{
             const user=response.data
             console.log(user)
             this.setState({user})
           
        })    
         })
       
        axios.get(`https://jsonplaceholder.typicode.com/comments?postId=${userId}`)
        .then(response=>{
            const comments=response.data
            console.log(comments)
            this.setState({comments})
        })

        .catch(err=>{
            console.log(err)
        })
    }

    render(){
        return(
            <div>
                <h2>USER NAME:{this.state.user.name}</h2>
                <h2>TITLE: 
                    {this.state.post.title}
                </h2>
                <h2>BODY:
                    {this.state.post.body}
                </h2>
                <hr/>
                <h2>Comments:</h2>
                <ul>
                    {
                        this.state.comments.map((ele,i)=>{
                        return (<li key={i}>{ele.body}</li>)
                        })
                    }
                </ul><hr/>   
                <Link to={`/users/${this.state.user.id}`}> more posts from users : {this.state.user.name}</Link>
            </div>
        )
    }
}

export default PostShow