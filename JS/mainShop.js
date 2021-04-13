/*$( "#payTroller" ).load( "./../index.html #troller", function( response, status, xhr ) {
    if ( status == "error" ) {
      var msg = "Sorry but there was an error: ";
      $( "#error" ).html( msg + xhr.status + " " + xhr.statusText );
    }
  });
*/

import {RenderCartShop} from './module.js'

RenderCartShop()