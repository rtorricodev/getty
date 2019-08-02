import * as React from 'react'
import * as ReactDOM from 'react-dom'

declare function require(path: string): any

class App extends React.Component {
  TextBoxRows: HTMLInputElement
  TextBoxcolumns: HTMLInputElement
  TextBoxNameOfElement: HTMLInputElement

  rowsRef = (TextBoxRows: HTMLInputElement) => {
    if (TextBoxRows) TextBoxRows.value = '5';
    this.TextBoxRows = TextBoxRows;
  }

  columnsRef = (TextBoxcolumns: HTMLInputElement) =>{
    if (TextBoxcolumns) TextBoxcolumns.value = '5';
    this.TextBoxcolumns = TextBoxcolumns;
  }

  nameOfElementRef = (TextBoxcolumns: HTMLInputElement) =>{
    this.TextBoxNameOfElement = TextBoxcolumns;
  }

  onCreate = () => {
    const rows = parseInt(this.TextBoxRows.value, 10);
    const columns = parseInt(this.TextBoxcolumns.value, 10);
    const nameOfElment = this.TextBoxNameOfElement.value;
    parent.postMessage({ pluginMessage: { type: 'create-rectangles', rows, columns, nameOfElment  } }, '*')
  }

  onCancel = () => {
    parent.postMessage({ pluginMessage: { type: 'cancel' } }, '*')
  }

  render() {
    return <div>
      <h2>Rectangle Creator</h2>
      <p>NameOfElement: <input ref={this.nameOfElementRef} /></p>
      <p>Rows: <input ref={this.rowsRef} /></p>
      <p>Columns: <input ref={this.columnsRef} /></p>
      <button onClick={this.onCreate}>Create</button>
      <button onClick={this.onCancel}>Cancel</button>
    </div>
  }
}

ReactDOM.render(<App/>, document.getElementById('react-page'))