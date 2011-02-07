/*!
 * jQuery Fancy Letter Plugin v1.1
 *
 * Date: Sun Feb 06 20:51:59 2011 EST
 * Requires: jQuery v1.2.6+
 *
 * Copyright 2011, Karl Swedberg
 * Dual licensed under the MIT and GPL licenses (just like jQuery):
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 * Contributor: Matt Wiebe (::first-letter spec semi-conformance)
 *
 *
*/

(function($) {

  $.fn.fancyletter = function(options) {

    this.each(function() {
      var text, firstHtml, firstLetter, firstltr, nodeInfo,
          node = this,
          $this = $(this),
          opts = $.extend({}, $.fn.fancyletter.defaults, options || {}, $.metadata ? $this.metadata() : $.meta ? $this.data() : {}),
          re = new RegExp(opts.characters);

      nodeInfo = getNodeValue(node, opts);
      if ( !nodeInfo.firstChar ) {
        return;
      }

      text = nodeInfo.val;
      node = nodeInfo.node;
      firstLetter = nodeInfo.firstChar;
      firstltr = firstLetter.toLowerCase();

      if ( re.test(firstLetter) ) {
        var $span = $('<span></span>');


        node.nodeValue = text.slice( nodeInfo.slicePoint );

        $span.html(nodeInfo.pl + firstLetter + nodeInfo.pr);
        $span.addClass(opts.commonClass + ' ' + opts.ltrClassPrefix + firstltr);
        $span.prependTo(this);

      }

    });

    function buildPunctuationSpan( puncSide, puncMark, opts ) {
      var puncSet = opts['punctuation' + puncSide];
      return [
        '<span class="',
          opts.punctuationClass,
          ' ',
          opts.ltrClassPrefix + puncSet[ puncMark ],
        '">',
          puncMark,
        '</span>'
      ].join('');
    }

    function getPunctuation( val, opts ) {
      var pl = '',
          pr = '',
          slicePoint = 0,
          firstChar = val.charAt( slicePoint ),
          puncRet = {};

      while ( (firstChar in opts.punctuationLeft) ) {
        slicePoint++;
        pl += buildPunctuationSpan( 'Left', firstChar, opts );
        firstChar = val.charAt( slicePoint );
      }
      puncRet.pl = pl;
      puncRet.firstChar = firstChar;

      slicePoint++;
      firstChar = val.charAt( slicePoint );
      while ( (firstChar in opts.punctuationRight) ) {
        slicePoint++;
        pr += buildPunctuationSpan( 'Right', firstChar, opts );
        firstChar = val.charAt( slicePoint );
      }
      puncRet.pr = pr;
      puncRet.slicePoint = slicePoint;

      return puncRet;
    }

    function getNodeValue(node, opts) {
      var startNode = node,
          startChild = node.firstChild,
          val = '',
          ret = {};

      if (!node ) {
        return ret;
      }

      while (node.childNodes.length) {
        node = node.firstChild;
      }

      val = node.nodeValue && node.nodeValue.replace(/^\s\s*/,'') || '';

      if ( val === '' && startChild && startChild.nextSibling ) {
        return getNodeValue(startChild.nextSibling, opts);
      } else {
        ret = getPunctuation( val, opts );
        ret.node = node;
        ret.val = val;
        return ret;

      }
    }

    return this;
  };

  $.fn.fancyletter.defaults = {
    commonClass:      'fancy-letter',
    ltrClassPrefix:   'ltr-',
    characters:       '[a-zA-Z0-9]',
    groupPunctuation: true,
    punctuationClass: 'punct',

    punctuationLeft: {
      '"': 'dquo',
      "'": 'squo',
      '“': 'ldquo',
      '‘': 'lsquo',
      '«': 'laquo',
      '‹': 'lsaquo',
      '(': 'lparen'
    },
    punctuationRight: {
      '"': 'dquo',
      "'": 'squo',
      '”': 'rdquo',
      '’': 'rsquo',
      '»': 'raquo',
      '›': 'rsaquo',
      ')': 'rparen'
    }
  };

})(jQuery);
