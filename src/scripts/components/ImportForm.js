import React, { Component } from 'react';
import Dialog from './Dialog';

export default class ImportForm extends Component {
	constructor(props) {
		super(props);

		this.parseInput = this.parseInput.bind(this);
	}

	parseInput (text) {
		const { onParsed } = this.props;

		try {
			onParsed(JSON.parse(text));
		} catch (e) {
			alert(`Error converting the provided JSON to CRC Cards. Please make sure the syntax is correct.`);
		}
	}

	render () {
		const { isVisible, onClose } = this.props;

		// React automatically won't render this if we return null
		if (!isVisible) return null;

		return (
      <Dialog title='Import from JSON' onClose={onClose}>
        <textarea className='import-form__input' onChange={e => this.inputJson = e.target.value}></textarea>

        <div className='import-form__actions'>
          <button onClick={() => this.parseInput(this.inputJson)}>Import</button>
          <button onClick={onClose}>Close</button>
        </div>
      </Dialog>
    );
	}
}
