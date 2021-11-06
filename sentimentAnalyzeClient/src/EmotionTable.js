import React from 'react';
import './bootstrap.min.css';

class EmotionTable extends React.Component {
    render() {
      //Returns the emotions as an HTML table
      return (  
        <div>
          {
            Object.entries(this.props.emotions).length > 0 ?
            <table className="table table-bordered">
              <tbody>
              {
                /*Write code to use the .map method that you worked on in the 
                Hands-on React lab to extract the emotions. If you are stuck,
                please click the instructions to see how to implement a map*/
                Object.entries(this.props.emotions).map(entry => {
                  return(
                  <tr>
                    <td>{entry[0]}</td>
                    <td>{entry[1]}</td>
                  </tr>)
                })
              }
              </tbody>
            </table> : 
            <p>{'-'}</p>
          }
          </div>
          );
        }
    
}
export default EmotionTable;