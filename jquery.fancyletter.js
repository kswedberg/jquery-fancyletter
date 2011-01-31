/*!
 * jQuery Fancy Letter Plugin v1.0
 *
 * Date: Sun Jan 30 21:55:00 2011 CST
 * Requires: jQuery v1.2.6+
 *
 * Copyright 2010-11, Karl Swedberg, Matt Wiebe
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
      '“': 'ldquo-',
      '‘': 'lsquo-',
      '(': 'lparen',
      '«': 'laquo',
      '‹': 'lsaquo'
    };
    return this.each(function() {
      var text, firstLetter, firstltr, nodeInfo,
          node = this,
          $this = $(this),
          opts = $.extend({}, $.fn.fancyletter.defaults, options || {}, $.metadata ? $this.metadata() : $.meta ? $this.data() : {}),
          re = new RegExp(opts.characters),
          sliceDepth = 1;
          
      nodeInfo = getNodeValue(node);
      text = nodeInfo.val;
      node = nodeInfo.node;

      firstLetter = text.slice(0,sliceDepth);
      // do we have punctuation?
      if ( opts.groupPunctuation && firstLetter in specialChars ) {
         // proper inclusion of initial punctuation in first-letter
         if ( opts.groupPunctuation ) {
            sliceDepth = 2;
            firstltr = opts.punctuatedClass + "  " + opts.ltrClassPrefix + specialChars[firstLetter];
            firstLetter = text.slice(1,2);
            firstltr = firstLetter.toLowerCase() + " " + firstltr;
         }
         else {
            firstltr = specialChars[firstletter];
         }

      }
      else {
         firstltr = firstLetter.toLowerCase();
      }

      if ( text && re.test(firstLetter) ) {
        var $span = $('<span></span>');
        firstLetter = text.slice(0,sliceDepth);
        node.nodeValue = text.slice(sliceDepth);

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
    characters:       '[a-zA-Z]',
    punctuatedClass:  'punct',
    groupPunctuation: true
  };

})(jQuery);
