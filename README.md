baucis-csv
===========

CSV Formatter plugin for [Baucis](http://kun.io/baucis) Format streams of data as CSV.

 [![NPM Version](https://img.shields.io/npm/v/baucis-csv.svg?style=flat)](https://www.npmjs.org/package/baucis-csv)
 [![Build Status](https://img.shields.io/travis/pjmolina/baucis-csv.svg?style=flat)](https://travis-ci.org/pjmolina/baucis-csv)  
 [![Coverage Status](https://img.shields.io/coveralls/pjmolina/baucis-csv.svg)](https://coveralls.io/r/pjmolina/baucis-csv) 
 
## Usage ##

1. Include the plugin: ```var baucisCsv = require('baucis-csv');```
2. Register the plugin in baucis with: ```baucisCsv.apply(baucis);```

## Test ##

Query a **baucis** resource passing the MIME Header ```Accept: text/csv```
For example, using ```curl``` tool from the command line:

```curl localhost:5000//api/myresource -H "Accept: text/csv"```

Sample output:
```
HTTP/1.1 200 OK
Content-Type: text/csv; charset=utf-8

_id,name,surname,index,active,__v
53cff8081c6821a40eecd795,Alicia,Keys,12,true,0
53d9370ddc9707301e0801ea,Jessica,Alba,34,true,0
```