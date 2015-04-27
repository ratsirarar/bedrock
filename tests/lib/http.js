/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

/* global casper */
'use strict';

var require = patchRequire(require);
var config = require('../lib/config');
var utils = require('utils');
var Http = {};

/**
 * Basic check for a valid URL that starts with http(s)://
 * @param: {url} String.
 */
Http.isValidURL = function(url) {
    return /^https?\:\/\/[^/]+/.test(url);
};

/**
 * Convert relative links to absolute paths.
 * @param: {url} String.
 */
Http.getAbsolutePath = function(url) {
    if (!Http.isValidURL(url)) {
        url = config.domain + url;
    }
    return url;
};

/**
 * Test a single URL for a valid HTTP 200 response.
 * @param {url} URL string.
 */
Http.testResponse = function(url) {

    // make sure url is an absolute path
    url = Http.getAbsolutePath(url);

    casper.thenOpen(url, function(response) {
        // PhantomJS handles most redirects OK, but should we encounter a 300
        // response for some reason, log some useful info and skip the URL.
        if (response.status && response.status >= 300 && response.status < 400) {
            casper.warn('HTTP: ' + response.status + ', ' + url);
            casper.warn('HTTP: redirected to ' + response.url);
            casper.test.skip(1, 'Skipping test due to redirect');
        } else {
            casper.test.assertHttpStatus(200, 'HTTP 200: ' + url);
        }
    });
};

/**
 * Test an array of URLs for valid HTTP 200 responses.
 * @param {urls} Array of URLs.
 */
Http.testResponses = function(urls) {

    if (!utils.isArray(urls)) {
        casper.die('Helper.testHttpResponses: first arg should be type Array.', 1);
    }

    casper.each(urls, function(self, url) {
        Http.testResponse(url);
    });
};

module.exports = Http;
