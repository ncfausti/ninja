import React, {Component} from 'react'
import {PropTypes} from 'prop-types'

export default class CalculatorForm extends Component {
	update(e) {
    	console.log("Val:" + e.target.value);
  	}
	render(){
		return(
			<div className={"calculator-inputs"}>
			<form className="calculator-form">
				<label htmlFor="followers">Twitter Followers </label>
				<input ref="fo" id="followers" step={100} type="number" required onChange={this.props.update.bind(this)} />
				<br />
				<label htmlFor="facebook">Facebook </label>
				<input ref="fb" id="facebook" type="number" required onChange={this.props.update.bind(this)} />
				<br />
				<label htmlFor="articles">Articles </label>
				<input ref="ar" id="articles" type="number" required onChange={this.props.update.bind(this)} />
				<br />
				<label htmlFor="forums">Forum Posts </label>
				<input ref="fr" id="forums" type="number" required onChange={this.props.update.bind(this)} />
				<br />
				<label htmlFor="tweets">Tweets </label>
				<input ref="tw" id="tweets" type="number" required onChange={this.props.update.bind(this)} />
				<br />
				<label htmlFor="sentiment">Sentiment Rating </label>
				<input ref="se" id="sentiment" type="number" required onChange={this.props.update.bind(this)} />
				<br />
				<label htmlFor="stores">Dispensaries </label>
				<input ref="st" id="stores" type="number" required onChange={this.props.update.bind(this)} />
			</form>
			</div>
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