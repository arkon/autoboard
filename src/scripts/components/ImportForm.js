import Ajv from 'ajv';
import React, { Component } from 'react';
import Dialog from './Dialog';

const jsonSchema = {
  type: 'array',
  items: {
    type: 'object',
    properties: {
      name: { type: 'string' },
      superclasses: { type: 'string' },
      subclasses: { type: 'string' },
      type: { type: 'integer' },
      responsibilities: { type: 'array', items: { type: 'string' } },
      collaborators: { type: 'array', items: { type: 'string' } },
    },
  },
  additionalProperties: false,
};

export default class ImportForm extends Component {
  constructor (props) {
    super(props);

    this.parseInput = this.parseInput.bind(this);
  }

  parseInput (text) {
    const { onParsed } = this.props;

    const ajv = new Ajv();
    try {
      const data = JSON.parse(text);
      const valid = ajv.validate(jsonSchema, data);
      if (!valid) {
        console.error(ajv.errors);
        window.alert('Error validating JSON — please make sure it has the correct data.')
      } else {
        onParsed(data);
      }
    } catch (e) {
      console.error(e);
      window.alert('Error parsing the provided JSON — please make sure the syntax is correct.');
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
