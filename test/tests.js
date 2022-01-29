module('Basic Fancy Letters', {
  setup: function() {
    $('#latin').find('p').fancyletter();
  }
});

test('Paragraphs have Fancy Letter', 3, function() {
  var $p = $('#latin').find('p'),
      countFancy = 0,
      letters = ['L', 'U', 'D'],
      lettersMatch = [];

  $p.each(function(i) {
    var $thisLetter = $(this).find('span.fancy-letter');

    if ( $thisLetter.length === 1 ) {
      countFancy++;
    } else {
      countFancy = -99;
    }
    lettersMatch.push( $thisLetter.text() );
  });
  equal($('span.fancy-letter').length, $p.length, 'The correct number of fancy letters was created');
  equal(countFancy, $p.length, 'Each paragraph has exactly 1 fancy letter');
  equal(lettersMatch.join(), letters.join(), 'Each paragraph\'s fancy letter is the correct character' );

});

test('Fancy Letters have correct class names applied', 3, function() {
  ok( $('span.fancy-letter').eq(0).hasClass('ltr-l') );
  ok( $('span.fancy-letter').eq(1).hasClass('ltr-u') );
  ok( $('span.fancy-letter').eq(2).hasClass('ltr-d') );
});

test('Fancy Letters have correct style applied', 6, function() {
  $('span.fancy-letter').each(function(index) {
    equal($(this).css('fontSize'), '40px', 'Fancy Letter has correct font size');
    equal( $(this).css('borderLeftWidth'), '20px', 'Fancy Letter has correct left border width' );
  });
});

module('Options and Difficult DOM', {
  setup: function() {
    var li = $('#sl').children();
    li.fancyletter({
      characters: '\\S',
      commonClass: 'hawthorne',
      ltrClassPrefix: 'nate-'
    });
  }
});

test('Fancy Letter applied to all list items', 1, function() {
  var li = $('#sl').children(),
      countFancy = 0;

  li.each(function(index) {

    var thisLi = $(this);

    if ( thisLi.find('span.hawthorne').length === 1 ) {
      countFancy++;
    }
  });
  equal(countFancy, li.length, 'Each list item has exactly 1 fancy letter');
});

test('Fancy Letter applies correct custom class names', 10, function() {
  var li = $('#sl').children();

  $.each(['y', 't', '1', 's', 't'], function(index, val) {
    ok( li.eq(index).find('span:first').hasClass('hawthorne'), 'hawthorne class applied' );
    ok (li.eq(index).find('span:first').hasClass('nate-' + val), 'nate-' + val + ' class applied' );
  });

});
test('Fancy Letter applied to nested text', 2, function() {
  var li = $('#sl').children();
  equal( li.eq(3).find('.hawthorne').text(), 'S', 'fancy letter character is "S."' );
  equal( li.eq(4).find('.hawthorne').text(), 'T', 'fancy letter character is "T."' );

});
test('Remaining text after fancy letter is correct', 5, function() {
    var li = $('#sl').children(),
        contents = ['"Young Goodman Brown"',
        'The Minister\'s Black Veil',
        '1 two three',
         'S carlet Letter',
         'Twice-Told Tales'
        ];
    li.each(function(index) {
      var txt = $(this).text().trim().replace(/\s\s+/g, ' ');
      equal(contents[index], txt, 'full text is ' +  contents[index]);

    });
});

module('Punctuation Grouping', {
  setup: function() {
    var c = $('#characters').children();
    c.fancyletter({
      commonClass: 'character'
    });
  }
});
test('Fancy Letter grouped with punctuation before and after', 4, function() {
  var c = $('#characters').children();
  equal( c.eq(0).find('.character').text(), '(1)', 'left and right parens grouped with first char' );
  equal( c.eq(0).find('.character').children('span').length, 2, 'each paren in its own span' );

  equal( c.eq(1).find('.character').text(), '"D', 'opening quotation mark grouped with first char' );
  equal( c.eq(1).find('.character').children('span').length, 1, 'opening quotation mark in its own span' );


});
