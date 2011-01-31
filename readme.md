jQuery Fancy Letter Plugin
==========================

The Fancy Letter Plugin lets you prettify your web page by styling the first letter of any element while keeping the HTML markup clean and readable by both human and machine.

Usage
--------

To use the Fancy Letter Plugin, reference "jquery.fancyletter.js" (or "jquery.fancyletter.min.js") after you reference the jQuery core file and before you reference the script that uses `.fancyletter()`:

    <script src="http://code.jquery.com/jquery-latest.min.js"></script>
    <script src="/path/to/jquery.fancyletter.min.js"></script>
    <script src="/path/to/my-custom-script.js"></script>

Then, in the "my-custom-script.js" file (which you should rename to something more appropriate), you can apply the Fancy Letter to, for example, the first paragraph within `<div id="content">` like so:
  
    $('#content').find('p:first').fancyletter();

If that paragraph begins with "Let us go then, you and I," it will be converted to:

    <span class="fancy-letter ltr-l">L</span>et us go then, you and I
    
You can then style `.fancy-letter` in your stylesheet to make it stand out. See <a href="http://plugins.learningjquery.com/fancyletter/#demos">the demo page</a> for examples.

Options
-------

The following options, shown here with their default values, are available:

    $.fn.fancyletter.defaults = {

      // a String indicating the class name applied to all fancy letters
      commonClass: 'fancy-letter',

      // a String indicating another class name, combined with the actual
      // (lower-cased) fancy letter. for example, if the fancy letter is "T,"
      // the class name would be "ltr-t".
      ltrClassPrefix: 'ltr-',

      // a string containing a Regular Expression indicating the set of characters
      // that can be transformed into a fancy letter.
      characters: '[a-zA-Z]',

      // A String added as a class to fancy letters
      punctuatedClass: 'punct',

      // Bool. Group opening punctuation with initial caps per the W3 spec
      // See http://www.w3.org/TR/css3-selectors/#first-letter
      groupPunctuation: true

    };

You can override them globally before calling `.fancyletter()`. For example, globally change the set of characters that can be transformed into a fancy letter:

    $.fn.fancyletter.defaults.characters = '\S';

You can also override them whenever you call `.fancyletter`:

    $('p').first().fancyletter({characters: '[a-zA-Z0-9]'});
    
Further Information
-------------------

* Visit the 
<a href="http://plugins.learningjquery.com/fancyletter/">Fancy Letter Plugin homepage</a> for more information and examples.
* Run the <a href="http://plugins.learningjquery.com/fancyletter/test/">plugin's tests</a>.
* File a <a href="http://github.com/kswedberg/jquery-fancyletter/issues">bug report</a>.

