(function(window,undefined){
    window.textareaUtils = (function(a) {
        var b = {}, c = document.selection,
            isIE = /msie/.test(navigator.userAgent.toLowerCase());
        /**
         * selectionStart 
         * @param  {HTMLElement} a  DOM object
         * @return {Number}   the start number
         */
        b.selectionStart = function(a) {
            if (!c) try { // lt ie9
                return a.selectionStart
            } catch (b) {
                return 0
            }
            var d = c.createRange(),
                e, f, g = 0,
                h = document.body.createTextRange();
            try {
                h.moveToElementText(a)
            } catch (b) {}
            for (g; h.compareEndPoints("StartToStart", d) < 0; g++) h.moveStart("character", 1);
            return g
        };
        /**
         *  before cursor pointer  characters
         * @param  {[type]} a [description]
         * @return {[type]}   [description]
         */
        b.selectionBefore = function(a) {
            return a.value.slice(0, b.selectionStart(a))
        };

        /**
         *  select  Text characters
         * @param  {HTMLElemnet} a dom object
         * @param  {Number} b range start 
         * @param  {Number} d range end
         * 
         */
        b.selectText = function(a, b, d) {
            a.focus();
            if (!c) a.setSelectionRange(b, d);
            else {
                var e = a.createTextRange();
                e.collapse(1);
                e.moveStart("character", b);
                e.moveEnd("character", d - b);
                e.select()
            }
        };

        /**
         * insert text
         * @param  {HTMLElement} a DOM object
         * @param  {String} d insert Text string
         * @param  {Nubmer} e 
         * @param  {Number} f   
         */
        b.insertText = function(a, d, e, f) {
            a.focus();
            f = f || 0;
            if (!c) {
                var g = a.value,
                    h = e - f,
                    i = h + d.length;
                a.value = g.slice(0, h) + d + g.slice(e, g.length);
                b.selectText(a, i, i)
            } else {
                var j = c.createRange();
                j.moveStart("character", - f);
                j.text = d
            }
        };
        /**
         * replaceText 
         * @param  {HTMLElement} a Dom object
         * @param  {String} d the replace text string
         */
        b.replaceText = function(a, d) {
            a.focus();
            var e = a.value,
                f = b.getSelectedText(a),
                g = f.length;
            if (f.length == 0) b.insertText(a, d, b.getCursorPos(a));
            else {
                var h = b.getCursorPos(a);
                if (!c) {
                    var j = h + f.length;
                    a.value = e.slice(0, h) + d + e.slice(h + g, e.length);
                    b.setCursor(a, h + d.length);
                    return
                }
                var i = c.createRange();
                i.text = d;
                b.setCursor(a, h + d.length)
            }
        };
        /**
         * get cursor position
         * @param  {HTMLElement} a dom object
         * @return {Number}   position
         */
        b.getCursorPos = function(a) {
            var b = 0;
            if (isIE) {
                a.focus();
                var d = null;
                d = c.createRange();
                var e = d.duplicate();
                e.moveToElementText(a);
                e.setEndPoint("EndToEnd", d);
                a.selectionStartIE = e.text.length - d.text.length;
                a.selectionEndIE = a.selectionStartIE + d.text.length;
                b = a.selectionStartIE
            } else if (a.selectionStart || a.selectionStart == "0") b = a.selectionStart;
            return b
        };
        /**
         * get selected text string
         * @param  {HTMLElement} a dom object
         * @return {String}   selected string
         */
        b.getSelectedText = function(a) {
            var b = "",
                d = function(a) {
                    return a.selectionStart != undefined && a.selectionEnd != undefined ? a.value.substring(a.selectionStart, a.selectionEnd) : ""
                };
            window.getSelection ? b = d(a) : b = c.createRange().text;
            return b
        };
        /**
         * set cursor 
         * @param {HTMLElement} a  dom object
         * @param {Number} b  start pointer
         * @param {Number} c  the lenth of selection
         */
        b.setCursor = function(a, b, c) {
            b = b == null ? a.value.length : b;
            c = c == null ? 0 : c;
            a.focus();
            if (a.createTextRange) {
                var d = a.createTextRange();
                d.move("character", b);
                d.moveEnd("character", c);
                d.select()
            } else a.setSelectionRange(b, b + c)
        }
        /**
         * uncover insert text
         * @param  {HTMLElement} a dom object
         * @param  {String} b insert string to replace 
         * @param  {Object} c {rcs:a.value.length,rccl:0} 
         *                    @param {Number} rcs   clear range start pointer
         *                    @param {Number} rccl  clear range characters length
         */
        b.unCoverInsertText = function(a, b, c) {
            c = c == null ? {} : c;
            c.rcs = c.rcs == null ? a.value.length : c.rcs * 1;
            c.rccl = c.rccl == null ? 0 : c.rccl * 1;
            var d = a.value,
                e = d.slice(0, c.rcs),
                f = d.slice(c.rcs + c.rccl, d == "" ? 0 : d.length);
            a.value = e + b + f;
            this.setCursor(a, c.rcs + (b == null ? 0 : b.length))
        };
        return b
    })(this);

    if(window.jQuery != undefined){
        jQuery.textareaUtils  = textareaUtils;
    }

})(window);



