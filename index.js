fs = require("fs");
const convert = require("xml-js");

const policy = "./policies/B2C_1A_TrustFrameworkBase.xml";

fs.readFile(policy, function(err, data) {
  var json = convert.xml2json(data, { compact: true });
  const parsed = JSON.parse(json);

  parsed.TrustFrameworkPolicy._attributes.TenantId = "newTenant";

  var xml = convert.json2xml(parsed, {
    compact: true,
    ignoreComment: true
  });

  fs.writeFile("base-build.xml", xml, function(err) {
    if (err) {
      return console.log(err);
    }
    console.log("The file was saved!");
  });
});
