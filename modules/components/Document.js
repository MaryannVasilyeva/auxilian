import React from 'react'
import favicon from '../favicon.ico'
import styles from '../styles.css'
import $ from 'jquery'

const { arrayOf, string, node, object } = React.PropTypes

const shims = `
  (String.prototype.trim && Function.prototype.bind) || document.write('<script src="/es5-shim.js"><\\/script>');
  window.Promise || document.write('<script src="/Promise.js"><\\/script>');
  window.fetch || document.write('<script src="/fetch.js"><\\/script>');
  window.mapboxgl || document.write('<script src="https://api.tiles.mapbox.com/mapbox-gl-js/v0.18.0/mapbox-gl.js"><\\/script>');
  window.$ || document.write('<script src="/vendor/jquery/dist/jquery.min.js"><\\/script>');
  window.materialize || document.write('<script type="text/javascript" src="/vendor/Materialize/bin/materialize.js"><\\/script>');
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
          <link href="http://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
          <meta name="viewport" content="initial-scale=1,maximum-scale=1,user-scalable=no" />
          <link rel="shortcut icon" href={favicon}/>
          <title>{title}</title>
          <link href="https://api.tiles.mapbox.com/mapbox-gl-js/v0.18.0/mapbox-gl.css" rel="stylesheet" />
          <link rel="stylesheet" href="/vendor/Materialize/dist/css/materialize.min.css" />
          <link rel="stylesheet" href="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v1.1.0/mapbox-gl-geocoder.css" />
          <link rel="stylesheet" href="https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.4/themes/smoothness/jquery-ui.css" type="text/css" />
          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css" />
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,600italic" type="text/css"/>
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Orbitron:400" type="text/css"/>
          {styles}
        </head>
        <body>
          <div id="app" dangerouslySetInnerHTML={{ __html: content }}/>
          <script dangerouslySetInnerHTML={{ __html: shims }}/>
          <script src="https://api.tiles.mapbox.com/mapbox-gl-js/v0.18.0/mapbox-gl.js"></script>
          <script src="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v1.1.0/mapbox-gl-geocoder.js"></script>
          {scripts}
        </body>
      </html>
    )
  }

})

export default Document
