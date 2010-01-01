Fx.TextMorph
===============

Fx.TextMorph is a class that form text element.

![Screenshot](http://github.com/nicodmf/TextMorphMootools/raw/master/icon.png)

Requirements
------------

* [MooTools Core 1.2.4](http://mootools.net/core)

### Extends:

- [Options][]

How to use
----------

### Syntax
	#JS
	var myTextMorph = new Fx.TextMorph(el, {options});

### Arguments

1. el - (*element*) the id of the element or the element itself.
2. options - (*options*) a key/value set of options.

### Options
- width: (*string*), the width of the element. (Default: the width of the actual element)
- height: (*string*), the height of the element. (Default: the height of the actual element)
- lineHeight: (*string*), the line-height of the element. (Default: the line-height of the actual element)
- draw: (*string*),  the result form. (Default: null, 6 are provided : circle, trianglebottom, triangletop, trapeze, diamond, fir)
- functions: (*function*),  the function who draw the form, if exist, this function is the same on right and left. (Default: null)
- functionRight: (*function*),  the function drawing the right of the div. (Default: the function use by circle)
- functionLeft: (*function*), the function drawing the left of the div. (Default: the function use by circle)
- debug: (*boolean*),  view the elements (div) to draw the text. (Default: null)
- backgroundcolor: (*string*), the css background-color of elements (div) used to draw the form. (Default: null)
- shy: (*boolean*), to have better result, add soft hyphen in the text. (Default: true)
- draw: (*string*),  the result form. (Default: null)

### Returns:

* (*object*) A new Fx.TextMorphElement instance.

### Example:

Morphing using an div:

	#JS
	var circle = new Fx.TextMorph($('circle'),{
		width: 600,
		height: 600,
		lineHeight:15
	});
