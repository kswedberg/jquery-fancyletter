/*!
 * jQuery Fancy Letter Plugin v1.0
 *
 * Date: Sun Nov 14 22:37:22 2010 EST
 * Requires: jQuery v1.2.6+
 *
 * Copyright 2010, Karl Swedberg
 * Dual licensed under the MIT and GPL licenses (just like jQuery):
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 * 
 * 
 *
*/

(function($) {

  $.fn.fancyletter = function(options) {
    var specialChars = {
      '"': 'ldquo',
      "'": 'lsquo',
      '(': 'lparen'
    };
    return this.each(function() {
      var text, firstLetter, firstltr, nodeInfo,
          node = this,
          $this = $(this),
          opts = $.extend({}, $.fn.fancyletter.defaults, options || {}, $.metadata ? $this.metadata() : $.meta ? $this.data() : {}),
          re = new RegExp(opts.characters);
          
      nodeInfo = getNodeValue(node);
      text = nodeInfo.val;
      node = nodeInfo.node;
      
      firstLetter = text.slice(0,1);

      if ( text && re.test(firstLetter) ) {
    	  var $span = $('<span></span>');
      
        firstltr = firstLetter.toLowerCase();
        if (firstltr in specialChars) {
          firstltr = specialChars[firstltr];
        }

      	node.nodeValue = text.slice(1);

    	  $span.text(firstLetter);
    	  $span.addClass(opts.commonClass + ' ' + opts.ltrClassPrefix + firstltr);
    		$span.prependTo(this);
        
      }

    });
  };  

  function getNodeValue(node) {
    var startNode = node,
        startChild = node.firstChild,
        val = '';
    
    if (!node ) {
      return '';
    }
        
    while (node.childNodes.length) {
  	  node = node.firstChild;
    }
    
    val = node.nodeValue && node.nodeValue.replace(/^\s\s*/,'') || '';
    
    if ( val === '' && startChild && startChild.nextSibling ) {
      return getNodeValue(startChild.nextSibling);
    } else {
      return {
        node: node,
        val: val
      };
        
    }
  }
  
  $.fn.fancyletter.defaults = {
    commonClass:      'fancy-letter', 
    ltrClassPrefix:   'ltr-',
    characters:       '[a-zA-Z]'
  };

})(jQuery);
