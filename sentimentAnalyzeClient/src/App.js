import './bootstrap.min.css';
import './App.css';
import EmotionTable from './EmotionTable.js';
import React from 'react';

class App extends React.Component {
  /*
  We are setting the component as a state named innercomp.
  When this state is accessed, the HTML that is set as the 
  value of the state, will be returned. The initial input mode
  is set to text
  */
  state = {
    innercomp: <textarea rows="4" cols="50" id="textinput"/>,
    mode: "text",
    sentimentOutput:[],
    sentiment:true,
    status: ''
  }
  
  /*
  This method returns the component based on what the input mode is.
  If the requested input mode is "text" it returns a textbox with 4 rows.
  If the requested input mode is "url" it returns a textbox with 1 row.
  */
 
  renderOutput = (input_mode)=>{
    let rows = 1
    let mode = "url"

    //If the input mode is text make it 4 lines
    if(input_mode === "text"){
      mode = "text"
      rows = 4
    }

    this.setState({
      innercomp:<textarea rows={rows} cols="50" id="textinput"/>,
      mode: mode,
      sentimentOutput:[],
      sentiment:true,
      status: ''
    });
  } 
  
  sendForSentimentAnalysis = () => {
    this.setState({sentiment:true, status: 'Loading...', sentimentOutput:''});
    let url = "http://localhost:8080";
    let mode = this.state.mode
    url = url+"/" + mode + "/sentiment?"+ mode + "="+document.getElementById("textinput").value;

    fetch(url).then((response)=>{
        console.log(response)
        response.json().then((data)=>{
          this.setState({sentimentOutput:data.label});
          let output = data.label;
          let color = "white"
          switch(output) {
            case "positive": color = "green";break;
            case "neutral": color = "yellow";break;
            case "negative": color = "red";break;
            default: color = "black";
          }
          output = output ? <div style={{color:color,fontSize:20}}>{output}</div> : '-'
          this.setState({sentimentOutput:output, status: ''});
        }).catch(err => {
          console.log(err)
          this.setState({status: 'Oops! An error occurred :('})
        });
    })
  }

  sendForEmotionAnalysis = () => {

    this.setState({sentiment:false, status: 'Loading...', sentimentOutput:''});
    let url = "http://localhost:8080";
    let mode = this.state.mode
    url = url+"/" + mode + "/emotion?"+ mode + "="+document.getElementById("textinput").value;

    fetch(url).then((response)=>response.json())
    .then((data)=>{
      console.log(data)
      this.setState({sentimentOutput:<EmotionTable emotions={data}/>, status: ''});
    })
    .catch(err => {
      console.log(err)
      this.setState({status: 'Oops! An error occurred :('})
    });
  }
  

  render() {
    return (  
      <div className="App">
        <div className='container'>
          <button className="btn btn-info" onClick={()=>{this.renderOutput('text')}}>Text</button>
          <button className="btn btn-dark"  onClick={()=>{this.renderOutput('url')}}>URL</button>
        </div>
        {this.state.innercomp}
        <div className='container'>
          <button className="btn-primary" onClick={this.sendForSentimentAnalysis}>Analyze Sentiment</button>
          <button className="btn-primary" onClick={this.sendForEmotionAnalysis}>Analyze Emotion</button>
        </div>
        <br/>
        <p>{this.state.status}</p>
        {this.state.sentimentOutput}
      </div>
    );
    }
}

export default App;
