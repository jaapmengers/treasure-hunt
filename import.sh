#!/usr/bin/env bash

curl https://spreadsheets.google.com/feeds/list/1fZn-ofB0OLaakrXOF93d6QIc_qGszlBujR9GsppWrv0/1/public/values\?alt\=json | jq '.feed.entry | map({id: (.["gsx$id"] | .["$t"]), lat: (.["gsx$lat"] | .["$t"] | tonumber), lng: (.["gsx$lng"] | .["$t"] | tonumber), body: (.["gsx$body"] | .["$t"]), image: (.["gsx$image"] | .["$t"])})' > src/challenges.json
curl https://spreadsheets.google.com/feeds/list/1fZn-ofB0OLaakrXOF93d6QIc_qGszlBujR9GsppWrv0/2/public/values\?alt\=json | jq '.feed.entry | map({title: (.["gsx$speltitel"] | .["$t"]), phonenumber: (.["gsx$telefoonnummer"] | .["$t"]), codeword: (.["gsx$codewoord"] | .["$t"])}) | first' > settings.json

PHONENUMBER=$(cat settings.json | jq -r '.phonenumber | tostring')
CODEWORD=$(cat settings.json | jq -r '.codeword | tostring')

printf "VUE_APP_PHONENUMBER=$PHONENUMBER\nVUE_APP_CODEWORD=$CODEWORD" > .env