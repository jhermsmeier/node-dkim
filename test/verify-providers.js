const assert = require("assert");
const fs = require("fs");
const path = require("path");
const DKIM = require("../lib/dkim");

const emailsPath = path.join(__dirname, "data", "emails");

describe("DKIM", function() {
  describe(".verify()", function() {
    it("gmail", function(done) {
      const message = fs.readFileSync(path.join(emailsPath, "gmail.eml"));

      DKIM.verify(message, function(error, res) {
        assert.ifError(error);
        assert.ok(res && res.length > 0);
        assert.ok(
          res.every(function(record) {
            return record.verified;
          })
        );
        done(error);
      });
    });

    it("icloud", function(done) {
      const message = fs.readFileSync(path.join(emailsPath, "icloud.eml"));

      DKIM.verify(message, function(error, res) {
        assert.ifError(error);
        assert.ok(res && res.length > 0);
        assert.ok(
          res.every(function(record) {
            return record.verified;
          })
        );
        done(error);
      });
    });

    it("outlook", function(done) {
      const message = fs.readFileSync(path.join(emailsPath, "outlook.eml"));

      DKIM.verify(message, function(error, res) {
        assert.ifError(error);
        assert.ok(res && res.length > 0);
        assert.ok(
          res.every(function(record) {
            return record.verified;
          })
        );
        done(error);
      });
    });

    it("protonmail", function(done) {
      const message = fs.readFileSync(path.join(emailsPath, "protonmail.eml"));

      DKIM.verify(message, function(error, res) {
        assert.ifError(error);
        assert.ok(res && res.length > 0);
        assert.ok(
          res.every(function(record) {
            return record.verified;
          })
        );
        done(error);
      });
    });

    it("yahoo", function(done) {
      const message = fs.readFileSync(path.join(emailsPath, "yahoo.eml"));

      DKIM.verify(message, function(error, res) {
        assert.ifError(error);
        assert.ok(res && res.length > 0);
        assert.ok(
          res.every(function(record) {
            return record.verified;
          })
        );
        done(error);
      });
    });
  });
});
