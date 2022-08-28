#!/usr/bin/env bash

curl https://opensheet.elk.sh/1fZn-ofB0OLaakrXOF93d6QIc_qGszlBujR9GsppWrv0/Opdrachten > src/challenges.json
curl https://opensheet.elk.sh/1fZn-ofB0OLaakrXOF93d6QIc_qGszlBujR9GsppWrv0/Instellingen > settings.json

PHONENUMBER=$(cat settings.json | jq -r .[0].telefoonnummer)
CODEWORD=$(cat settings.json | jq -r .[0].codewoord)

printf "VITE_PHONENUMBER=$PHONENUMBER\nVITE_CODEWORD=$CODEWORD" > .env