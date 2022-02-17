import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import 'antd/dist/antd.min.css'
import codemirror from 'codemirror'
window.CodeMirror = codemirror
import 'codemirror/lib/codemirror.css'
import 'codemirror/mode/javascript/javascript.js'
import 'codemirror/mode/vue/vue.js'
import 'codemirror/mode/jsx/jsx.js'
import 'codemirror/theme/idea.css'


ReactDOM.render(
  <App />,
  document.getElementById('root')
)
