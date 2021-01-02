/*$( "#payTroller" ).load( "./../index.html #troller", function( response, status, xhr ) {
    if ( status == "error" ) {
      var msg = "Sorry but there was an error: ";
      $( "#error" ).html( msg + xhr.status + " " + xhr.statusText );
    }
  });
*/

import {FillCart, productTable} from './module.js'

console.log(productTable);
FillCart(productTable);