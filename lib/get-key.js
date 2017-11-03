const dns = require('dns');
const DKIM = require('./dkim');

/**
 * Retrieve a domain key
 * @memberOf DKIM
 * @todo DNS seems to FORMERR on unregistered / expired domains,
 * which maybe should be a TEMPFAIL (?)
 * @todo make this `public_key = dkim_find_key(q_val, d_val, s_val)`,
 * where `*_val` are the signature's attribute values
 * @NOTE Throw error if the public key is not a Buffer
 * @param {String} domain
 * @param {String} [selector]
 * @param {Function} callback
 */
function getKey(domain, selector, callback) {
	if (typeof selector === 'function') {
		callback = selector;
		selector = null;
	} else {
		domain = selector + '._domainkey.' + domain;
	}

	dns.resolve(domain, 'TXT', (error, records) => {
		let key = null;

		if (error == null) {
      // If the result returned from the query does not adhere to the
      // format defined in this specification, the Verifier MUST ignore
      // the key record and return PERMFAIL (key syntax error).
			try {
				key = DKIM.Key.parse(records.join(''));
				if (!Buffer.isBuffer(key.key))					{
					throw 'Public Key not found';
				}
			} catch (e) {
				error = new Error('Key syntax error');
				error.code = DKIM.PERMFAIL;
			}
		} else {
			switch (error.code) {
        // If the query for the public key fails because the corresponding
        // key record does not exist, the Verifier MUST immediately return
        // PERMFAIL (no key for signature).
				case dns.NOTFOUND:
				case dns.NODATA:
				case dns.FORMERR:
					error = new Error('No key for signature');
					error.code = DKIM.PERMFAIL;
					break;
        // If the query for the public key fails to respond, the Verifier
        // MAY seek a later verification attempt by returning TEMPFAIL
        // (key unavailable).
				default:
					error = new Error('Key unavailable');
					error.code = DKIM.TEMPFAIL;
					break;
			}
		}

		callback(error, key);
	});
}

module.exports = getKey;
