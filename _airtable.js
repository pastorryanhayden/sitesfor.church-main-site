var Airtable = require('airtable');
var fs          = require('fs');
var yaml        = require('js-yaml');

function loadConfig() {
  var ymlFile = fs.readFileSync('_config.yml', 'utf8');
  return yaml.load(ymlFile);
}

var config = loadConfig().airtable;
var jsonfile = require('jsonfile');

var fileBlog = '_data/blog.json';
var blog = new Airtable({ apiKey: config.apikey }).base(config.blog);
var blogJson = [];
var blogJsonTest = [];

// blog 

    blog('Posts').select({
        maxRecords: 100,
      //sort
        sort: [{field: "date", direction: "desc"}],
        filterByFormula: "published",
      //Formula to how to get data
      // help https://support.airtable.com/hc/en-us/articles/203255215-Formula-Field-Reference

    }).eachPage(function page(records, fetchNextPage) {

        // This function (`page`) will get called for each page of records.

        records.forEach(function(record) {
          blogJson.push(record._rawJson.fields);
          
        });
        fetchNextPage();

    }, function done(error) {
        if (error) {
            console.log(error);
        }
      jsonfile.writeFile(fileBlog, blogJson, function (err) {
        console.error(err)
      });
      console.log('blog worked');
    });
