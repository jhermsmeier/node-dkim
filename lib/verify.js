const DKIM = require('./dkim');

/**
 * Verify a message's signatures
 * @memberOf DKIM
 * @param {Buffer} message
 * @param {Function} callback
 * @throws {Error} If input is not a buffer
 */
function verify(message, callback) {
	if (!Buffer.isBuffer(message))	{
		throw new TypeError('Message must be a Buffer');
	}

	const boundary = message.indexOf(Buffer.from('\r\n\r\n'));
	if (boundary === -1) {
		return callback(new Error('No header boundary found'));
	}

	const header = message.toString('utf8', 0, boundary);
	const body = message.slice(boundary + 4);

	const results = [];
	const signatures = [];

  // eslint-disable-next-line no-control-regex
	header.split(/\r\n(?=[^\x20\x09]|$)/g).forEach((h, i, headers) => {
		if (/^(DKIM-Signature|X-Google-DKIM-Signature)/i.test(h)) {
            // Console.log(signatureHeader)

      // ISSUE: executing line below, may result in including a different 'DKIM-Signature' header
      // signatures.push( headers.slice( i ) )

      // FIX: after slicing, remove any included 'DKIM-Signature' header that differ from "oneHeader"
			headers.slice(i);
			const sigHeaders = processSignature(headers.slice(i), h);
			signatures.push(sigHeaders);
		}
	});

	if (signatures.length === 0) {
		return callback(null, results);
	}

	signatures.forEach(headers => {
		DKIM.verifySignature(body, headers, (error, result) => {
			results.push(result);
			if (results.length === signatures.length) {
				callback(null, results);
			}
		});
	});
}

module.exports = verify;

/**
 *
 * For messages that have multiple signatures,
 * We want add headers to each signature without including signature headers of other signatures
 *
 * ex:
 * Input
 * ===== 1 =====
[ 'DKIM-Signature: v=1; a=rsa-sha256; c=relaxed/relaxed;\r\n        d=fusemachines.com; s=google;\r\n        h=mime-version:from:date:message-id:subject:to;\r\n        bh=9w2H8ucfF1w3+Zqu9gpPcHgTU9GHPjw7E2HYHHlZEkw=;\r\n        b=iPc3RHh9oXL6+dvuPM0hYt1vdj6U4hN83BFxhumWsSXnFDFmbSG4OtXHPF823HoZAA\r\n         4MbFQu5VgfvAQ+FmnKyfON2WdJrAYicyslVXlcA6l0UKSGIH/0NHSqi/kX+4KEKaClY7\r\n         jZkXZZ8EIl5IUBdRRUWSsySFOtrQ/9IeAb6YM=',
  'X-Google-DKIM-Signature: v=1; a=rsa-sha256; c=relaxed/relaxed;\r\n        d=1e100.net; s=20161025;\r\n        h=x-gm-message-state:mime-version:from:date:message-id:subject:to;\r\n        bh=9w2H8ucfF1w3+Zqu9gpPcHgTU9GHPjw7E2HYHHlZEkw=;\r\n        b=gaapyixgX52/f91ifJ2hxRuk13TLcG1ZKUo+Ci3j5a6rKCISPtmLXxwaXq5tghh5qg\r\n         r7S/oe5nDijJmdo1pIBDYGf9U+IDgIT9jHxP3pUoLwmhgnO3pr1di1JH0361ogIsGq/W\r\n         wATmvMTeEA1jAnKw8sr9Rb+jl2MUhqZLhL5Lhkdx/l5CCI0mfUmRAuv1XvGKdrPexM00\r\n         4UTNx9VeK8qYQ/jdf1BiX0ICrj/7e5hSImZ44ctHzn/HA3Htur6cBdFlAVHpW5/vPj0q\r\n         xnz5KQATcG0GmTX2rF27SGhAyPzRl+CZ0SDg9cGV2CvQ5kbDxsxOdzotR2X4hqksqMcC\r\n         S+EQ==',
  'X-Gm-Message-State: AMCzsaVGkvHZbfZofPrsj3QKBCLwg3nAsBM8cWdu5BXU7v1zENATSRJC uiG27aeGnsU8HjTsRFYk1HqnrNYGNuxg5R7wfRrnRw==',
  'X-Google-Smtp-Source: ABhQp+RznzRtpIGeOvxieUGeSxwDHEfX8SuSwMwZJSlXyU4GyjbzDw6PsT5DOScWWomiALUIa/1ktC1p5vFEDe7HcH8=',
  'X-Received: by 10.200.3.87 with SMTP id w23mr15494938qtg.98.1508680821032; Sun, 22 Oct 2017 07:00:21 -0700 (PDT)',
  'MIME-Version: 1.0',
  'Received: by 10.12.141.15 with HTTP; Sun, 22 Oct 2017 07:00:00 -0700 (PDT)',
  'From: Marcellin Nshimiyimana <mars@fusemachines.com>',
  'Date: Sun, 22 Oct 2017 19:45:00 +0545',
  'Message-ID: <CAOwpMi-cqMgYZ4BqFeP2QASdS54oqQ6diFfFQn+eVAVhHEC4yw@mail.gmail.com>',
  'Subject: Test email',
  'To: Mars-sprint <nmarcellin2@gmail.com>',
  'Content-Type: multipart/alternative; boundary="f4030435c3286adbf3055c232081"' ]
 * ===== 2 =====
DKIM-Signature: v=1; a=rsa-sha256; c=relaxed/relaxed;\r\n        d=fusemachines.com; s=google;\r\n        h=mime-version:from:date:message-id:subject:to;\r\n        bh=9w2H8ucfF1w3+Zqu9gpPcHgTU9GHPjw7E2HYHHlZEkw=;\r\n        b=iPc3RHh9oXL6+dvuPM0hYt1vdj6U4hN83BFxhumWsSXnFDFmbSG4OtXHPF823HoZAA\r\n         4MbFQu5VgfvAQ+FmnKyfON2WdJrAYicyslVXlcA6l0UKSGIH/0NHSqi/kX+4KEKaClY7\r\n         jZkXZZ8EIl5IUBdRRUWSsySFOtrQ/9IeAb6YM=
 * =====
 *
 * Output
 * ======
[ 'DKIM-Signature: v=1; a=rsa-sha256; c=relaxed/relaxed;\r\n        d=fusemachines.com; s=google;\r\n        h=mime-version:from:date:message-id:subject:to;\r\n        bh=9w2H8ucfF1w3+Zqu9gpPcHgTU9GHPjw7E2HYHHlZEkw=;\r\n        b=iPc3RHh9oXL6+dvuPM0hYt1vdj6U4hN83BFxhumWsSXnFDFmbSG4OtXHPF823HoZAA\r\n         4MbFQu5VgfvAQ+FmnKyfON2WdJrAYicyslVXlcA6l0UKSGIH/0NHSqi/kX+4KEKaClY7\r\n         jZkXZZ8EIl5IUBdRRUWSsySFOtrQ/9IeAb6YM=',
  'X-Gm-Message-State: AMCzsaVGkvHZbfZofPrsj3QKBCLwg3nAsBM8cWdu5BXU7v1zENATSRJC uiG27aeGnsU8HjTsRFYk1HqnrNYGNuxg5R7wfRrnRw==',
  'X-Google-Smtp-Source: ABhQp+RznzRtpIGeOvxieUGeSxwDHEfX8SuSwMwZJSlXyU4GyjbzDw6PsT5DOScWWomiALUIa/1ktC1p5vFEDe7HcH8=',
  'X-Received: by 10.200.3.87 with SMTP id w23mr15494938qtg.98.1508680821032; Sun, 22 Oct 2017 07:00:21 -0700 (PDT)',
  'MIME-Version: 1.0',
  'Received: by 10.12.141.15 with HTTP; Sun, 22 Oct 2017 07:00:00 -0700 (PDT)',
  'From: Marcellin Nshimiyimana <mars@fusemachines.com>',
  'Date: Sun, 22 Oct 2017 19:45:00 +0545',
  'Message-ID: <CAOwpMi-cqMgYZ4BqFeP2QASdS54oqQ6diFfFQn+eVAVhHEC4yw@mail.gmail.com>',
  'Subject: Test email',
  'To: Mars-sprint <nmarcellin2@gmail.com>',
  'Content-Type: multipart/alternative; boundary="f4030435c3286adbf3055c232081"' ]
 * ======
 *
 *
 */
function processSignature(headers, signatureHeader) {
    // /^(?!(DKIM-Signature|X-Google-DKIM-Signature))/i.test(sh) = true if sh does NOT start with 'DKIM-Signature' or 'X-Google-DKIM-Signature'
	const sigHeaders = headers.filter(h => {
		return h === signatureHeader || /^(?!(DKIM-Signature|X-Google-DKIM-Signature))/i.test(h);
	});

	return sigHeaders;
}

module.exports.processSignature = processSignature;
