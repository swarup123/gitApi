import React, { Component } from 'react';
//import logo from './logo.svg';
import axios from 'axios';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

class App extends Component {

  state = {
    hits:[],
    value:"",
    
  };
  handleChange=(event)=> {
    this.setState({value: event.target.value});
  }

  handleSubmit = (event) => {
      event.preventDefault();
      const newName = this.state.value.replace(/ +/g, "").toLowerCase();
      if(newName){
      let url = `https://api.github.com/users/${newName}`;
      
      axios.get(url)
      .then(res => {
        const hits = res.data;
        this.setState({ hits });
      })
      .catch( (error) => {
        console.log(error);
      });
    }else{
        alert('Please provide username')
    }
  }
  
  render() {
    const hits = [];
    hits.push(this.state.hits)
    return (
        <form >
            <label>
            Name:
            <input type="text" name="name" value={this.state.value} onChange={this.handleChange}/>
            </label>
            <button type="submit" value="Submit" onClick={this.handleSubmit}>Submit</button>
            
      
      <Paper >
        <Table >
            <TableHead>
            <TableRow>
                <TableCell>Employee Name</TableCell>
                <TableCell numeric>Followers</TableCell>
                <TableCell numeric>Repo</TableCell>
                <TableCell numeric>Blog</TableCell>
                <TableCell numeric>Company</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {hits.map(n => {
                return (
                <TableRow key={n.id}>
                    <TableCell numeric>{n.name}</TableCell>
                    <TableCell numeric>{n.followers}</TableCell>
                    <TableCell numeric>{n.repos_url}</TableCell>
                    <TableCell numeric>{n.blog}</TableCell>
                    <TableCell numeric>{n.company}</TableCell>
                </TableRow>
                );
            })}
            </TableBody>
        </Table>
    </Paper>
    </form>
    );
  }
}


export default App;
