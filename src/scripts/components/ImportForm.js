import React, { Component } from 'react';
import Dialog from './Dialog';

export default class ImportForm extends Component {
  constructor (props) {
    super(props);
    this.state = {};
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

  handleDragIn = (e) =>{
    e.preventDefault()
    e.stopPropagation()
    if (e.dataTransfer.items && e.dataTransfer.items.length == 1) {
      this.setState({dragging: true})
    }
  }

  handleDragOut = (e) =>{
    e.preventDefault()
    e.stopPropagation()
    this.setState({dragging: false})
  }

  handleDrag = (e) =>{
    e.preventDefault()
    e.stopPropagation()
  }

  handleDrop = (e) =>{
    e.preventDefault()
    e.stopPropagation()
    if(this.state.dragging){
      this.setState({dragging: false})
      
      const file = e.dataTransfer.files[0]
      const reader = new FileReader();
      reader.onload = (e2) => {
          // finished reading file data.
          this.setState({inputJson: e2.target.result})
      }
      reader.readAsText(file);
      e.dataTransfer.clearData()
    }
  }

  render () {
    const { inputJson, dragging } = this.state
    const { isVisible, onClose } = this.props;
    if (!isVisible) return null;

    return (
      <Dialog title='Import from JSON' onClose={onClose}>
        <textarea style={{borderStyle: dragging ? 'dashed' : 'solid'}} className='import-form__input'
          value={inputJson}
          onChange={e => this.setState({inputJson: e.target.value})}
          onDragEnter={this.handleDragIn}
          onDragLeave={this.handleDragOut}
          onDragOver={this.handleDrag}
          onDrop={this.handleDrop}
        ></textarea>

        <div className='import-form__actions'>
          <button className='import-form__action' onClick={() => this.parseInput(inputJson)}>Import</button>
          <button className='import-form__action' onClick={onClose}>Close</button>
        </div>
      </Dialog>
    );
  }
}
