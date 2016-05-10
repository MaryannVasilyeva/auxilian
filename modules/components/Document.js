import React from 'react'
import favicon from '../favicon.ico'

const { arrayOf, string, node, object } = React.PropTypes

const shims = `
  (String.prototype.trim && Function.prototype.bind) || document.write('<script src="/es5-shim.js"><\\/script>');
  window.Promise || document.write('<script src="/Promise.js"><\\/script>');
  window.fetch || document.write('<script src="/fetch.js"><\\/script>');
  window.mapboxgl || document.write('<script src="https://api.tiles.mapbox.com/mapbox-gl-js/v0.18.0/mapbox-gl.js"><\\/script>');
`

const Document = React.createClass({

  propTypes: {
    styles: arrayOf(node),
    scripts: arrayOf(node),
    content: string,
    title: string,
    initialState: object
  },

  render() {
    const { styles, scripts, content, title } = this.props

    return (
      <html>
        <head>
          <meta charSet="utf-8"/>
          <meta name='viewport' content='initial-scale=1,maximum-scale=1,user-scalable=no' />
          <link rel="shortcut icon" href={favicon}/>
          <title>{title}</title>
           <link href='https://api.tiles.mapbox.com/mapbox-gl-js/v0.18.0/mapbox-gl.css' rel='stylesheet' />
          {styles}
        </head>
        <body>
          <div id="app" dangerouslySetInnerHTML={{ __html: content }}/>
          <script dangerouslySetInnerHTML={{ __html: shims }}/>
          {scripts}
        </body>
      </html>
    )
  }

})

export default Document
