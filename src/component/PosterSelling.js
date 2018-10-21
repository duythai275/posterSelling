import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import './css/PosterSelling.css';
import Tooltip from '@material-ui/core/Tooltip';

class PosterSelling extends Component {

    handleOnChange = ( property, e ) => {
        let ps = this.props.ps;
        ps[property] = (e.target.value === "") ? 0 : parseInt(e.target.value);

        ps["totalIn"] = ps["countIn"] + ps["add"];
        ps["totalSold"] = ps["totalIn"] - ps["comp"] - ps["countOut"];
        ps["gross"] = ps["totalSold"] * this.props.p.price;

        this.props.handleOnChange(ps);
    }

    render() {
        return (
            <tr>
                <td className="val"><Tooltip title={this.props.p.description}><img src={require(`./img/${this.props.p.img}`)} alt={this.props.p.name} className="img" /></Tooltip></td>
                <td className="val"><TextField disabled variant="outlined" value={`$${this.props.p.price}`} /></td>
                <td className="val"><TextField disabled variant="outlined" value={this.props.ps.qtyAvail} /></td>
                <td className="val">
                {
                    (this.props.ps.status === "settled") ? 
                        <TextField disabled variant="outlined" value={this.props.ps.countIn} /> 
                        : 
                        <TextField variant="outlined" value={this.props.ps.countIn} onChange={e => this.handleOnChange("countIn", e) }/>
                }
                </td>
                <td className="val">
                {
                    (this.props.ps.status === "settled") ? 
                        <TextField disabled variant="outlined" value={this.props.ps.add} /> 
                        : 
                        <TextField variant="outlined" value={this.props.ps.add} onChange={e => this.handleOnChange("add", e) } />
                }
                </td>
                <td className="val"><TextField disabled variant="outlined" value={this.props.ps.totalIn} onChange={e => this.handleOnChange("totalIn", e)} /></td>
                <td className="val">
                {
                    (this.props.ps.status === "settled") ? 
                        <TextField disabled variant="outlined" value={this.props.ps.comp} /> 
                        : 
                        <TextField variant="outlined" value={this.props.ps.comp} onChange={e => this.handleOnChange("comp", e)} />
                }
                </td>
                <td className="val">
                {
                    (this.props.ps.status === "settled") ? 
                        <TextField disabled variant="outlined" value={this.props.ps.countOut} /> 
                        : 
                        <TextField variant="outlined" value={this.props.ps.countOut} onChange={e => this.handleOnChange("countOut", e)} />
                }
                </td>
                <td className="val"><TextField disabled variant="outlined" value={this.props.ps.totalSold} /></td>
                <td className="val"><TextField disabled variant="outlined" value={`$${this.props.ps.gross}`} /></td>
            </tr>
        )
    }
}

export default PosterSelling;