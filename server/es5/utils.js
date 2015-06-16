'use strict';

module.exports = {

	/**
 * Get YouTube ID from various YouTube URL
 * @author: takien
 * @url: https://gist.github.com/takien/4077195
 */

	getYoutubeID: function getYoutubeID(url) {
		var ID = '';
		url = url.replace(/(>|<)/gi, '').split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
		if (url[2] !== undefined) {
			ID = url[2].split(/[^0-9a-z_\-]/i);
			ID = ID[0];
		} else {
			ID = url;
		}
		return ID;
	}

};
//# sourceMappingURL=utils.js.map