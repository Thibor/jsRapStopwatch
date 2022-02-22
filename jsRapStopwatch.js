(function ($) {
	$.fn.jsRapStopwatch = function (options) {

		return this.each(function () {
			this.opt = $.extend({
				enabled: true,
				timeStart: new Date(),
				timeName: ['y ', 'm ', 'd ', 'h ', 'm ', 's'],
				onClick: null
			}, options);
			let base = this;
			$(this).empty().addClass('rapStopwatch');
			let id = $(this).attr('id');

			if (this.opt.enabled)
				$(this).bind({
					click: function (e) {
						Click(e);
					}
				});

			function Click(e) {
				base.opt.timeStart = new Date();
				CookieWrite(id, base.opt.timeStart, 365);
				if (base.opt.onClick)
					base.opt.onClick.call(this);
			}

			function CookieRead(c_name, defValue) {
				let i, x, y, ARRcookies = document.cookie.split(";");
				for (i = 0; i < ARRcookies.length; i++) {
					x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
					y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
					x = x.replace(/^\s+|\s+$/g, "");
					if (x == c_name)
						return unescape(y);
				}
				return defValue;
			}

			function CookieWrite(c_name, value, exdays) {
				let exdate = new Date();
				exdate.setDate(exdate.getDate() + exdays);
				let c_value = escape(value) + ((exdays == null) ? '' : '; expires=' + exdate.toUTCString());
				document.cookie = c_name + "=" + c_value;
			}

			function ShowTime(ts, te) {
				let ys = ts.getFullYear();
				let ye = te.getFullYear();
				let ms = ts.getMonth();
				let me = te.getMonth();
				let ds = ts.getDate();
				let de = te.getDate();
				let hs = ts.getHours();
				let he = te.getHours();
				let is = ts.getMinutes();
				let ie = te.getMinutes();
				let ss = ts.getSeconds();
				let se = te.getSeconds();
				if (se < ss) {
					se += 60;
					ie--;
				}
				if (ie < is) {
					ie += 60;
					he--;
				}
				if (he < hs) {
					he += 24;
					de--;
				}
				if (de < ds) {
					de += 30;
					me--;
				}
				if (me < ms) {
					me += 12;
					ye--;
				}
				let s = '';
				if (ys != ye)
					s += (ye - ys) + base.opt.timeName[0];
				if ((ms != me) || s)
					s += (me - ms) + base.opt.timeName[1];
				if ((ds != de) || s)
					s += (de - ds) + base.opt.timeName[2];
				if ((hs != he) || s)
					s += (he - hs) + base.opt.timeName[3];
				if ((is != ie) || s)
					s += (ie - is) + base.opt.timeName[4];
				s += (se - ss) + base.opt.timeName[5];
				$(base).text(s);
			}

			let d = CookieRead(id, new Date().toISOString());
			this.opt.timeStart.setTime(Date.parse(d));

			let timer = setInterval(function () { ShowTime(base.opt.timeStart, new Date()) }, 900);

		})

	}
})(jQuery);