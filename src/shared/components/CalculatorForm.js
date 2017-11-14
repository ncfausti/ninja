import React, {Component} from 'react'
import {PropTypes} from 'prop-types'

export default class CalculatorForm extends Component {
	constructor(props){
		super(props);
		this.state = {
			twitter:0,
			bs:1.233
		}
	}
	componentDidMount(){

	}

    componentWillReceiveProps() {
        // You don't have to do this check first, but it can help prevent an unneeded render
            this.setState({ twitter: this.props.twitter });
            console.log(this.props.graphData);
            try{
            	console.log(this.props.graphData[12]["kiva"]);
            	this.setState({bs:this.props.graphData[12]["kiva"]});
            	console.log(this.state.bs);
			}
            catch(Exception){
				console.log("failed");
			}
    }

	render(){
		return(
			<span className={"center"}>
			<h1>{parseFloat(this.state.bs).toFixed(3)}%</h1>
            <h6 className="text-uppercase h6">Brandshare Calculator</h6>
		<div className="small mb-4 card-subtitle">Make adjustments to see change in shares</div>
			<div className={"calculator-inputs"}>
			<form className="calculator-form">
				<label htmlFor="followers">Twitter Followers </label>
				<input ref="fo" defaultValue={9425}  id="followers" step={100} type="number"
					    onChange={this.props.update.bind(this)} />
				<br />
				{/*<label htmlFor="facebook">Facebook </label>*/}
				{/*<input ref="fb" defaultValue={9425} id="facebook" type="number" required onChange={this.props.update.bind(this)} />*/}
				{/*<br />*/}
				<label htmlFor="articles">Articles </label>
				<input ref="ar" defaultValue={20} id="articles" type="number"
					   onChange={this.props.update.bind(this)} />
				<br />
				<label htmlFor="forums">Forum Posts </label>
				<input ref="fr" defaultValue={3} id="forums" type="number"
					   onChange={this.props.update.bind(this)} />
				<br />
				<label htmlFor="tweets">Tweets </label>
				<input ref="tw" defaultValue={310} id="tweets" type="number"
					   onChange={this.props.update.bind(this)} />
				<br />
				<label htmlFor="sentiment">Sentiment Rating </label>
				<input ref="se" defaultValue={.97} id="sentiment" type="number"
					   onChange={this.props.update.bind(this)} step={".01"} />
				<br />
				<label htmlFor="stores">Dispensaries </label>
				<input ref="st" id="stores" type="number" defaultValue={1506} required onChange={this.props.update.bind(this)} />
			</form>
			</div>
			</span>
			)
	}
}

CalculatorForm.propTypes = {
	followers: PropTypes.number.isRequired,
	articles: PropTypes.number.isRequired,
	forums: PropTypes.number.isRequired,
	tweets: PropTypes.number.isRequired,
	sentiment: PropTypes.number.isRequired,
	stores: PropTypes.number.isRequired

}

/*
-86.9(Quarter)+2.03(Dispensary)+4.21(Forums)-0.4(Twitter)+337.8885 = BrandShares
*/