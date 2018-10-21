import React, { Component } from 'react';
import './css/AddDialog.css';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';

class AddDialog extends Component {
    constructor( props ) {
        super(props);
        this.state = {
            selectedPoster: null
        }
    }

    closeDialog = e => {
        this.props.onClose();
    }

    handleSelector = e => {
        this.setState({ selectedPoster: e.target.value });
    }

    addPosterSelling = e => {
        let ps = {
            id: this.props.numberOfPs + 1,
            poster: this.state.selectedPoster.id,
            qtyAvail: 0,
            countIn: 0,
            add: 0,
            totalIn: 0,
            comp: 0,
            countOut: 0,
            totalSold: 0,
            gross: 0,
            status: "none"
        };
        this.props.addPosterSelling(ps);
        this.props.onClose();
    }

    render() {
        return(
            <Dialog open={this.props.open}>
                <DialogTitle>Add one more Poster Selling</DialogTitle>
                <DialogContent>
                    <table>
                        <tbody>
                            <tr>
                                <td rowspan="3">
                                    <Select value={this.state.selectedPoster} onChange={this.handleSelector}>
                                    {
                                        Object.keys(this.props.posters).map( p => {
                                            return <MenuItem value={this.props.posters[p]} key={this.props.posters[p].id}>{this.props.posters[p].name}</MenuItem>
                                        })
                                    }
                                    </Select>
                                </td>
                                <td rowspan="3">
                                    {
                                        (this.state.selectedPoster !== null) ? <img src={require(`./img/${this.state.selectedPoster.img}`)} alt={this.state.selectedPoster.description} className="img" /> : ""
                                    }
                                </td>
                                <td>
                                    {
                                        (this.state.selectedPoster !== null) ? <strong>{this.state.selectedPoster.name}</strong> : ""
                                    }
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    {
                                        (this.state.selectedPoster !== null) ? this.state.selectedPoster.description : ""
                                    }
                                </td>
                            </tr>
                            <tr>
                                <td align="right">
                                    {
                                        (this.state.selectedPoster !== null) ? `$${this.state.selectedPoster.price}` : ""
                                    }
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" color="primary" className="button" onClick={this.addPosterSelling}>Add</Button>
                    <Button variant="contained" className="button" onClick={this.closeDialog}>Cancel</Button>
                </DialogActions>
            </Dialog>
        )
    }
}

export default AddDialog;

