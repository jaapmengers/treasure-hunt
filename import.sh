#!/usr/bin/env bash

curl https://spreadsheets.google.com/feeds/list/1fZn-ofB0OLaakrXOF93d6QIc_qGszlBujR9GsppWrv0/1/public/values\?alt\=json | jq '.feed.entry | map({id: (.["gsx$id"] | .["$t"]), lat: (.["gsx$lat"] | .["$t"] | tonumber), lng: (.["gsx$lng"] | .["$t"] | tonumber), body: (.["gsx$body"] | .["$t"]), image: (.["gsx$image"] | .["$t"])})' > src/challenges.json