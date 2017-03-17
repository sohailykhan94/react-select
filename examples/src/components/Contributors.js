import React from 'react';
import Select from 'react-select';

const CONTRIBUTORS = require('../data/contributors');
const MAX_CONTRIBUTORS = 6;
const ASYNC_DELAY = 500;

const Contributors = React.createClass({
	displayName: 'Contributors',
	propTypes: {
		label: React.PropTypes.string,
	},
	getInitialState () {
		return {
			multi: true,
			value: [CONTRIBUTORS[0]],
			reloadOptions: false,
		};
	},
	onChange (value) {
		console.log('On change triggered');
		this.setState({
			value: value,
		});
	},
	switchToMulti () {
		this.setState({
			multi: true,
			value: [this.state.value],
		});
	},
	switchToSingle () {
		this.setState({
			multi: false,
			value: this.state.value[0],
		});
	},
	getContributors (input, callback) {
		input = input.toLowerCase();
		var options = CONTRIBUTORS.filter(i => {
			return i.github.substr(0, input.length) === input;
		});
		var data = {
			options: options.slice(0, MAX_CONTRIBUTORS),
			complete: options.length <= MAX_CONTRIBUTORS,
		};
		setTimeout(function() {
			callback(null, data);
		}, ASYNC_DELAY);
	},
	gotoContributor (value, event) {
		window.open('https://github.com/' + value.github);
	},
	setNull () {
		this.setState({
			value: 'Please select...',
			reloadOptions: true,
		});
	},
	getReloadStatus () {
		return true;
	},
	render () {
		return (
			<div className="section">
				<h3 className="section-heading">{this.props.label}</h3>
				<Select.Async multi={this.state.multi} value={this.state.value} onChange={this.onChange} cache={false} onValueClick={this.gotoContributor} valueKey="github" labelKey="name" loadOptions={this.getContributors} shouldReloadOptions={this.getReloadStatus} />
				<div className="checkbox-list">
					<label className="checkbox">
						<input type="radio" className="checkbox-control" checked={this.state.multi} onChange={this.switchToMulti}/>
						<span className="checkbox-label">Multiselect</span>
					</label>
					<label className="checkbox">
						<input type="radio" className="checkbox-control" checked={!this.state.multi} onChange={this.switchToSingle}/>
						<span className="checkbox-label">Single Value</span>
					</label>
					<label className="checkbox">
						<input type="radio" className="checkbox-control" checked={this.state.reloadOptions} onChange={this.setNull}/>
						<span className="checkbox-label">Reset</span>
					</label>
				</div>
				<div className="hint">This example implements custom label and value properties, async options and opens the github profiles in a new window when values are clicked</div>
			</div>
		);
	}
});

module.exports = Contributors;
