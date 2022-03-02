(function ($) {
	$.fn.jsRapStopwatch = function (options) {

		return this.each(function () {
			this.opt = $.extend({
				enabled: true,
				timeStart: new Date(),
				timeName: ['y ', 'm ', 'd ', 'h ', 'm ', 's'],
				onClickBefore: null,
				onClickAfter: null
			}, options);
			let base = this;
			$(this).empty().addClass('rapStopwatch');
			let id = $(this).attr('id');
			if (!id)
				id = 'jsRapStopwatch';

			if (this.opt.enabled)
				$(this).bind({
					click: function (e) {
						Click(e);
					}
				});

			function Click(e) {
				if (base.opt.onClickBefore)
					base.opt.onClickBefore.call(this);
				base.opt.timeStart = new Date();
				if (base.opt.onClickAfter)
					base.opt.onClickAfter.call(this);
				CookieWrite(id, base.opt.timeStart, 365);
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

			function ShowTime(st, en) {
				let s = '';
				let ts = st;
				let te = en;
				let mi = '';
				if (st > en) {
					ts = en;
					te = st;
					mi = '-';
				}
				let gs = ts.getTime();
				let ge = te.getTime();
				let second = Math.floor((ge - gs) / 1000);
				let minute = 0
				let hour = 0;
				let day = 0;
				let month = 0;
				let year = 0;
				if (second < 31 * 24 * 60 * 60) {
					day = Math.floor(second / (24 * 60 * 60));
					second %= 24 * 60 * 60;
					hour = Math.floor(second / (60 * 60));
					second %= 60 * 60;
					minute = Math.floor(second / 60);
					second %= 60;
				} else {
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
					year = ye - ys;
					month = me - ms;
					day = de - ds;
					hour = he - hs;
					minute = ie - is;
					second = se - ss;
				}
				if (year)
					s += year + base.opt.timeName[0];
				if (month || s)
					s += month + base.opt.timeName[1];
				if (day || s)
					s += day + base.opt.timeName[2];
				if (hour || s)
					s += hour + base.opt.timeName[3];
				if (minute || s)
					s += minute + base.opt.timeName[4];
				s += second + base.opt.timeName[5];
				$(base).text(mi + s);
			}

			let d = CookieRead(id, new Date().toISOString());
			this.opt.timeStart.setTime(Date.parse(d));

			let timer = setInterval(function () { ShowTime(base.opt.timeStart, new Date()) }, 900);

		})

	}
})(jQuery);