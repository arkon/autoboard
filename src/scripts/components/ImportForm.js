import React, { Component } from 'react';
import Dialog from './Dialog';

export default class ImportForm extends Component {
  constructor (props) {
    super(props);

    this.parseInput = this.parseInput.bind(this);
  }

  parseInput (text) {
    const { onParsed } = this.props;

    try {
      onParsed(JSON.parse(text));
    } catch (e) {
      alert('Error importing the provided JSON -- please make sure the syntax is correct.');
    }
  }

  render () {
    const { isVisible, onClose } = this.props;
    if (!isVisible) return null;

    return (
      <Dialog title='Import from JSON' onClose={onClose}>
        <textarea className='import-form__input' onChange={e => this.inputJson = e.target.value}></textarea>

        <div className='import-form__actions'>
          <button className='import-form__action' onClick={() => this.parseInput(this.inputJson)}>Import</button>
          <button className='import-form__action' onClick={onClose}>Close</button>
        </div>
      </Dialog>
    );
  }
}
