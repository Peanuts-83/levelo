[![Leaflet](./openstreetmap-leaflet.svg)](https://leafletjs.com/)
[![Angular](./angular-14.1.0.svg)](https://angular.io)
# Levélo - Marseille

New "levelo" website for learning purpose only. This site intends to give the customers access to Marseille self-service bicycle.
You can view the original website here: [http://www.levelo-mpm.fr/](http://www.levelo-mpm.fr/).

## Install

Git clone this repo, npm install and then ng serve. Plays localy on [localhost:4200](http://localhost:4200).

Make build with "ng build" command.

## OpenStreetMap / Leaflet

You can check branch "v1" to see initial research functionalities for Angular OpenStreetMap integration with Leaflet library.

* CircleMarkers positionning from state API : [https://transport.data.gouv.fr/gbfs/marseille/station_information.json](https://transport.data.gouv.fr/gbfs/marseille/station_information.json)

* Popup feeding from the same API

* Search function for stations name, with auto-pan / auto-zoom / auto-popup on requested station.

## UI/UX design

The "main" branch integrates UI/UX re-designing of original awfull website. It's only a basic suggestion of what it could be, not all functionalities are implemented...


All rights reserved © [Thomas Ranque - aka 'Peanuts83'](mailto:tranque@free.fr)
