/*
	Copyright (C) Germán Franco Dorca
	This program is free software and is licensed under GNU GPLv2.
*/

(function() { 'use strict'

	document.addEventListener('DOMContentLoaded', translateDocument);

	/**
	 * Translates all elements with the attribute data-i18nid in the document.
	 */
	function translateDocument() {
		var to_translate = document.querySelectorAll('[data-i18nid]');
		var json_id, new_text;
		for(var i=0, length=to_translate.length; i<length; i++) {
			json_id = to_translate[i].dataset.i18nid;
			new_text = chrome.i18n.getMessage(json_id);
			if(new_text !== "")
				to_translate[i].textContent = new_text;
		}
	}
})();
