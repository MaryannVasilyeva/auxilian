import React from 'react'
import favicon from '../favicon.ico'

const { arrayOf, string, node, object } = React.PropTypes

const shims = `
  (String.prototype.trim && Function.prototype.bind) || document.write('<script src="/es5-shim.js"><\\/script>');
  window.Promise || document.write('<script src="/Promise.js"><\\/script>');
  window.fetch || document.write('<script src="/fetch.js"><\\/script>');
  window.mapboxgl || document.write('<script src="https://api.tiles.mapbox.com/mapbox-gl-js/v0.18.0/mapbox-gl.js"><\\/script>');
  window.$ || document.write('<script src="/vendor/jquery/dist/jquery.min.js"><\\/script>')
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
          <meta name="viewport" content="initial-scale=1,maximum-scale=1,user-scalable=no" />
          <link rel="shortcut icon" href={favicon}/>
          <title>{title}</title>
          <link href='https://api.tiles.mapbox.com/mapbox-gl-js/v0.18.0/mapbox-gl.css' rel='stylesheet' />
          <link rel='stylesheet' href='https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v1.1.0/mapbox-gl-geocoder.css' />
          <link rel="stylesheet" href="/vendor/Materialize/dist/css/materialize.min.css" />
          {styles}
        </head>
        <body>
          <div id="app" dangerouslySetInnerHTML={{ __html: content }}/>
          <script dangerouslySetInnerHTML={{ __html: shims }}/>
          <script src='https://api.tiles.mapbox.com/mapbox-gl-js/v0.18.0/mapbox-gl.js'></script>
          <script src='https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v1.1.0/mapbox-gl-geocoder.js'></script>
          {scripts}
        </body>
      </html>
    )
  }

})

export default Document
