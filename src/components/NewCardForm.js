import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';

import CardTypes from '../constants/CardTypes';
import Dialog from './Dialog';

/**
 * The form for creating a new card, or editing an existing one.
 */
export default class NewCardForm extends Component {
  constructor (props) {
    super(props);

    this.add = this.add.bind(this);
    this.cancel = this.cancel.bind(this);
    this._checkForm = this._checkForm.bind(this);
  }

  componentDidMount () {
    this.elName             = findDOMNode(this.refs.name);
    this.elSuper            = findDOMNode(this.refs.superclasses);
    this.elSub              = findDOMNode(this.refs.subclasses);
    this.elTypeNormal       = findDOMNode(this.refs.type_normal);
    this.elTypeAbstract     = findDOMNode(this.refs.type_abstract);
    this.elTypeInterface    = findDOMNode(this.refs.type_interface);
    this.elResponsibilities = findDOMNode(this.refs.responsibilities);
    this.elCollaborators    = findDOMNode(this.refs.collaborators);
  }

  add () {
    var type = CardTypes.NORMAL;
    if (this.elTypeAbstract.checked) {
      type = CardTypes.ABSTRACT;
    } else if (this.elTypeInterface.checked) {
      type = CardTypes.INTERFACE;
    }

    this.props.onAdd({
      name             : this.elName.value,
      superclasses     : this.elSuper.value,
      subclasses       : this.elSub.value,
      type             : type,
      responsibilities : this.elResponsibilities.value.split('\n'),
      collaborators    : this.elCollaborators.value.split('\n')
    });
  }

  cancel () {
    const hasChanges = this._checkForm();

    if (!hasChanges || (hasChanges && window.confirm('Are you sure you want to close the editor? You will lose any progress.'))) {
      this.props.onCancel();
    }
  }

  _checkForm () {
      return this.elName.value ||
        this.elSuper.value ||
        this.elSub.value ||
        this.elResponsibilities.value ||
        this.elCollaborators.value;
  }

  render () {
    const data = this.props.data;

    return (
      <Dialog title='New card' onClose={this.cancel}>
        <label>Class name:</label>
        <input ref='name' type='text' defaultValue={data ? data.name : ''} />

        <label>Superclasses:</label>
        <input id='ncfSuperclass' ref='superclasses' type='text' defaultValue={data ? data.superclasses : ''} />

        <label>Subclasses:</label>
        <input ref='subclasses' type='text' defaultValue={data ? data.sub : ''} />

        <label>Type:</label>
        <label className='new-card__type'>
          <input ref='type_normal' type='radio' name='type'
            defaultChecked={data ? data.type == CardTypes.NORMAL : true}
            value={CardTypes.NORMAL} />
          <span>Normal</span>
        </label>
        <label className='new-card__type'>
          <input ref='type_abstract' type='radio' name='type'
            defaultChecked={data ? data.type == CardTypes.ABSTRACT : false}
            value={CardTypes.ABSTRACT} />
          <span>Abstract</span>
        </label>
        <label className='new-card__type'>
          <input ref='type_interface' type='radio' name='type'
            defaultChecked={data ? data.type == CardTypes.INTERFACE : false}
            value={CardTypes.INTERFACE} />
          <span>Interface</span>
        </label>

        <label>Responsibilities (1 per line):</label>
        <textarea ref='responsibilities' defaultValue={data ? data.responsibilities.join('\n') : ''} />

        <label>Collaborators (1 per line):</label>
        <textarea ref='collaborators' defaultValue={data ? data.collaborators.join('\n') : ''} />

        <div className='new-card__actions'>
          <button onClick={this.add}>Save card</button>
          <button onClick={this.cancel}>Cancel</button>
        </div>
      </Dialog>
    );
  }
}
