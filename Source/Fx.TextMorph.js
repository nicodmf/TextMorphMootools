/*
---
name: Fx.TextMorph.js
description: Creates a text with predetermined form.
authors: Nicolas de MarquÈ
requires:
    core/1.2.4:
provides: [TextMorph]
license: MIT-style license
version: 1.0.1
...
 */
 
Fx.TextMorph = new Class({

	Implements: [Options],

	options: {
		draw : null,
		functions : null,
		functionRight : null,
		functionLeft : null,
		lineHeight : null,
		width : null,
		height : null,
		debug : null,
		backgroundcolor : null,
		first : true,
		shy : true
	},
	
	initialize: function(element, options){
		this.subject = this.subject || this;
		this.setOptions(options);
		this.element = $(element);
		
	
		if (!this.options.width)
			this.options.width = this.element.getWidth().toInt();
		if (!this.options.height)
			this.options.height = this.element.getHeight().toInt();
		if (this.options.draw != null){
			this.options.functionRight = eval("this."+this.options.draw);
			this.options.functionLeft = eval("this."+this.options.draw);
		}
		if((typeof eval(this.options.functions))=="function"){
			this.options.functionRight=this.options.functions;
			this.options.functionLeft=this.options.functions;
		};		
		if ((typeof eval(this.options.functionRight))!="function")
				this.options.functionRight = this.circle;
		if ((typeof eval(this.options.functionLeft))!="function")
				this.options.functionLeft = this.circle;
 				
		if (!this.options.lineHeight)
			this.options.lineHeight = this.element.getStyle('line-height').toInt();
		this.width =this.options.width;
		this.height=this.options.height;
		this.functionRight = this.options.functionRight || this.circle;
		this.functionLeft  = this.options.functionLeft || this.circle;
		this.lineHeight = this.options.lineHeight;
		this.debug = this.options.debug;
		this.backgroundcolor = this.options.backgroundcolor;
		this.shy = this.options.shy;
		this.changeOrigin();
		this.placeContent();
		this.drawForm();
		//For chrome compatibility
		this.firstChild.previousSibling.parentNode.removeChild(this.firstChild.previousSibling)
	},
	changeOrigin : function() {
		$(this.element).setStyle('width', (this.width) + 'px');
		$(this.element).setStyle('height', (this.height) + 'px');
		$(this.element).setStyle('overflow', 'hidden');
	},
	placeContent : function() {
		divfloat = new Element("div", {
			'class' : 'floatie',
			'style' : 'float:left'
		});
		divclear = new Element("div", {
			'class' : 'floatie',
			'style' : 'clear:both'
		});
		div = new Element("div", {
			'class' : 'content',
			'style' : 'margin-top:-' + (this.height - this.lineHeight) + 'px'
		});
		while (this.element.hasChildNodes()) {
			div.appendChild(this.element.removeChild(this.element.firstChild));
		}
	//Todo: 
		/*	var elements = div.getElementsByTagName("*");
		for ( var i = 0; i < elements.length; i++) {
			this.simplyShy(elements.item(i));
		}
	*/	
		if(this.shy)this.simplyShy(div);
		this.firstChild = div;
		divfloat.appendChild(div);
		this.element.appendChild(divfloat);
		this.element.appendChild(divclear);
	},
	drawForm : function() {
		y = this.height;
		var inc=0;
		while (y > 0) {
			
			var widthLeft = this.functionLeft.attempt ( y, this );
			var widthRight = this.functionRight.attempt( y, this );
			this.makeDivs(widthLeft, widthRight);
			y -= this.lineHeight;
			inc++;
		}
		;
	},
	makeDivs : function(widthLeft, widthRight) {
		var debugcolor="";
		if(this.debug)debugcolor="background:black;";	
		if(this.backgroundcolor)debugcolor="background:"+this.backgroundcolor+";";	
		new Element("div", {
			"style" : debugcolor+"float:left ; width:" + widthLeft + "px; height:"
					+ this.lineHeight + "px"
		}).inject(this.firstChild, 'before');
		new Element("div", {
			"style" : debugcolor+"float:right; width:" + widthRight + "px; height:"
					+ this.lineHeight + "px"
		}).inject(this.firstChild, 'before');
		new Element("div", {
			"style" : "clear:both"
		}).inject(this.firstChild, 'before');
	},
	pregReplace : function(pattern, replacement, subject, limit) {
		// parameter limit is optional (default value is -1)
		// paramater pattern is a string type
		// ex: pregReplace("/Hello/i","Hi",strtoreplace)
		if (typeof limit == "undefined")
			limit = -1;
		if (subject.match(eval(pattern))) {
			if (limit == -1) { // no limit
				return subject.replace(eval(pattern + "g"), replacement);
			} else {
				for (x = 0; x < limit; x++) {
					subject = subject.replace(eval(pattern), replacement);
				}
				return subject;
			}
		} else {
			return subject;
		}
	},
	diamond : function(pos){
		var y=(this.height-pos)/this.height
		if(pos>this.height/2)
			return this.width/2-y*this.width
		else
			return y*this.width-this.width/2
	},
	trapeze: function(pos){
		var y=(this.height-pos)/this.height
		return (1-y)*this.width/4;
	},
	trianglebottom : function(pos){
		var y=(this.height-pos)/this.height
		return y*this.width/2;
	},
	triangletop : function(pos){
		var y=(this.height-pos)/this.height
		return (1-y)*this.width/2;
	},
	
	fir : function(pos) {
		var y = (pos - this.height) * -1;
		var coeff = this.height * 10 / 100;
		var etape = y % coeff;
		if (y >= 0 && y < 10 / 100 * this.height) {
			return 50 / 100 * this.width - (y) * (y) / 2 / (coeff);
		}
		if (y >= 10 / 100 * this.height && y < 20 / 100 * this.height) {
			return 47 / 100 * this.width - (y - 10 / 100 * this.width)
					* (y - 10 / 100 * this.width) / (coeff);
		}
		if (y >= 10 / 100 * this.height && y < 35 / 100 * this.height) {
			return 40 / 100 * this.width - (y - 20 / 100 * this.width)
					* (y - 20 / 100 * this.width) / (coeff * 2);
		}
		if (y >= 35 / 100 * this.height && y < 55 / 100 * this.height) {
			return 35 / 100 * this.width - (y - 35 / 100 * this.width)
					* (y - 35 / 100 * this.width) / (coeff * 2);
		}
		if (y >= 55 / 100 * this.height && y < 80 / 100 * this.height) {
			return 30 / 100 * this.width - (y - 50 / 100 * this.width)
					* (y - 50 / 100 * this.width) / (coeff * 2.7);
		}
		if (y >= 80 / 100 * this.height) {
			return 40 / 100 * this.width;
		}
	},	
	circle : function(y) {
		//alert("circle"+y)
		var r = Math.min(this.height, this.width) / 2;
		var cx = this.width / 2;
		var cy = this.height / 2;
		// alert(r+","+cy+","+cx+","+y)
		var result = Math.abs(Math.round(cx
				- Math.sqrt(Math.pow(r, 2) - Math.pow(y - cy, 2))));
		//alert(r+" "+cx+" "+cy+" "+result)
		return result;
		// return (x - a)≤ + (y - b)≤ = r≤
	},
	simplyShy : function(element) {
		var replacements = "$1\u00ad$2";
		var patterns = "/\([aeiÈË‰‚ÍÔˆouyAEIOUY][bcdfghjklmnpqrstvwxzBCDFGHJKLMNPQRSTVWXZ]\)\([bcdfghjklmnpqrstvwxzBCDFGHJKLMNPQRSTVWXZ]\)/";
		element.set('text', this.pregReplace(patterns, replacements, element
				.get('text')));
		patterns = "/\([aeiÈË‰‚ÍÔˆouyAEIOUY]\)\([bcdfghjklmnpqrstvwxzBCDFGHJKLMNPQRSTVWXZ][aeiÈË‰‚ÍÔˆouyAEIOUY]\)/";
		element.set('text', this.pregReplace(patterns, replacements, element
				.get('text')));
		patterns = "/\([aeiÈË‰‚ÍÔˆouyAEIOUY]\)\([aeiÈË‰‚ÍÔˆouyAEIOUY]\)/";
		element.set('text', this.pregReplace(patterns, replacements, element
				.get('text')));
	}
})
