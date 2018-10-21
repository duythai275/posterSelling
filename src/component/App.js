import React, { Component } from 'react';
import './css/App.css';
import data from '../data.json';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import PosterSelling from './PosterSelling';
import AddDialog from './AddDialog';



class App extends Component {
    constructor( props ) {
        super(props);
        this.state = {
            posters: data.posters,
            posterSellings: data.posterSellings,
            openDialog: false
        }
    }

    settleAllSellings = e => {   
        this.setState({ 
            posterSellings: this.state.posterSellings.map( ps => {
                ps.status = "settled";
                return ps;
            })
        });
        // store data
    }

    handleOnChange = obj => {
        this.setState({
            posterSellings: this.state.posterSellings.map( ps => {
                if ( ps.id === obj.id ) ps = obj;
                return ps;
            })
        });
        // store data
    }

    calTotal = col => {
        let res = 0;
        this.state.posterSellings.forEach( ps => {
            res += ps[col];
        });
        return res;
    }

    openDialog = e => {
        this.setState({ openDialog: !this.state.openDialog });
    }

    addPosterSelling = ps => {
        this.setState({
            posterSellings: [...this.state.posterSellings,ps]
        });
    }

    render() {
        return (
            <div className="app">
                <div>
                    <table className="table">
                        <thead>
                            <tr>
                                <th className="poster">Poster</th>
                                <th className="col">Price</th>
                                <th className="col">QTY Avail</th>
                                <th className="col">Count In</th>
                                <th className="col">Add</th>
                                <th className="col">Total In</th>
                                <th className="col">Comp</th>
                                <th className="col">Count Out</th>
                                <th className="col">Total Sold</th>
                                <th className="col">Gross</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.posterSellings.map( ps => {
                                    return <PosterSelling ps={ps} p={this.state.posters[ps.poster]} handleOnChange={this.handleOnChange} key={ps.id} />
                                })
                            }
                        </tbody>
                        <tfoot>
                            <tr>
                                <td className="val"><Button variant="contained" className="button" onClick={this.openDialog}>More</Button></td>
                                <td className="val"></td>
                                <td className="val"></td>
                                <td className="val"></td>
                                <td className="val"></td>
                                <td className="val"><TextField disabled variant="outlined" value={this.calTotal("totalIn")} /></td>
                                <td className="val"><TextField disabled variant="outlined" value={this.calTotal("comp")} /></td>
                                <td className="val"><TextField disabled variant="outlined" value={this.calTotal("countOut")} /></td>
                                <td className="val"><TextField disabled variant="outlined" value={this.calTotal("totalSold")} /></td>
                                <td className="val"><TextField disabled variant="outlined" value={`$${this.calTotal("gross")}`} /></td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
                <hr/>
                <div className="settle"><Button variant="contained" className="button" onClick={this.settleAllSellings}>SETTLE</Button></div>
                <AddDialog open={this.state.openDialog} posters={this.state.posters} numberOfPs={this.state.posterSellings.length} onClose={this.openDialog} addPosterSelling={this.addPosterSelling} />
            </div>
        )
    }
}



export default App;