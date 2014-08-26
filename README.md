baucis-csv
===========

CSV Formatter plugin for [Baucis](http://kun.io/baucis) Format streams of data as CSV.

# Usage #

1. Include the plugin: ```var baucisCsv = require('baucis-csv');```
2. Register the plugin in baucis with: ```baucisCsv.apply(baucis);```

# Test #

Query a *baucis* resource passing the MIME Header 'Accept: text/csv'
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