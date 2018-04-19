# OpenSweden
This is our contribution to Hack for Sweden 2018

### Click on the picture to see a video about this repository:
[![Video of the project](https://i.vimeocdn.com/video/694697108.webp?mw=1920&mh=1080&q=70)](https://vimeo.com/264826531)

## Setup
Make sure docker is running on your machine.

Then use [Docker compose](https://docs.docker.com/compose/install/)

`$ docker-compose up`

`$ npm start`

### npm commands
* `npm run migrate` - Run migrations
* `npm start` - Start application, this also run migrations
* `npm build` - builds frontend

# Information about this project

## INSPIRATION
Last year there was a terror attack in Stockholm Sweden at Drottninggatan.
As a result of this event people all over Stockholm opened their homes to anyone who was in the need of shelter and comfort. The hashtag #openStockholm trended on twitter and was used over 40.000 times during this time. It is clear that people have the ability and the will to help their fellow human beings in a time of need.

The problem is that if this is not handled in a structured way, the help that is offered might not be used to its full potential. The information on Twitter about where people were offering shelter was not that easy to actually use. People might have found a lot of places where they could go, but it’s hard to know which ones that are close. In these situations people are also desperate for qualified information about what it going on and what areas they should avoid.

## WHAT IT DOES
With our project we want to use open data to create a possibility to handle public crisis situations in an organised and structured manner.

Since shelters are only accessible during war we need another way to keep everyone safe during a crisis: http://opensweden.nu. Our solution makes it possible for anyone who is in a position to offer shelter to register with their phone number and address. This will be shown on a map and allows people to easily access information about a safe place near their location. Each phone number can only be used once and the registration has to be validated by a code that is sent by text to the phone number, to make it harder to misuse this function. The text message service has been provided by Vimla. We also use an API from Polisen to mark any areas on the map that are currently considered to be a dangerous area as a cause of one of the following: detonation, air pollution, natural disasters or terrorism.

## HOW WE BUILT IT
We built a Node.JS API with a PostgresDB to save open houses.
Frontend is built with React and everything is dockerized (Docker).
Deployed to a Digital Ocean server.
Orchestration with Docker Cloud.
SmsPro by Telenor to send text messages.
We utilized Polisens API to get current events

## CHALLENGES WE RAN IN TO
We needed to scrub the JSON from Polisens API to be able to parse it.
Lack of sleep.
Lack of air.

## ACCOPLISHMENTS THAT WE'RE PROUD OF
Using our own open source text message library.
We managed to get a full minimum viable product live http://opensweden.nu.
Team dynamics.

WHAT WE LEARNED
Working with  minimum viable product thinking and killing your darlings makes it easier to see the light at the end of the tunnel.
Nocco keeps you awake.

## WHAT'S NEXT FOR OPENSWEDEN
#1 Firstly we want to add a form where people can submit valuable information directly to the police. We have talked to a few representatives from Polisen and they really wanted this feature to be up and running. This because it is critical for them to receive current updates with qualified information from those who have it. It is problematic for them to handle a large stream of information if it is communicated by phone, which makes this communication method a very useful implementation for them.

#2 Service workers: caches data whilst the user has access to internet. If the internet later would be down, the user can still access the data that existed at their last internet connection. All actions that are made during the period when the internet is down will be executed as soon as the user regains connection.

#3 In these kinds of situations it is natural for people to become worried and there is a lot of miscommunication and a wide spread of false information. We want to implement a news feed with crisis information provided by MSB, their information is the only information that has to be 100% correct for it to be allowed to be published. We think that a continuous stream of qualified information is key to keeping the public safe and to create a sense of calm in an otherwise frantic environment.

#4 From the happening last year, we have been told that there were struggles since a majority of the information was mediated in Swedish. Right now our product is not supported in multiple languages, but this is a future implementation. Although, we have considered this in our design decisions and we are using colours and icons that can be understood regardless of language.

#5 We see potential in this solution to be used in a variety of situations. From times to times there are e.g. issues with trains not going as supposed. This can create situations where a lot of people are not able to get home. We would like to implement an API from SJ to also be able to handle these situations in a more structured manner.

## Contributors

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
[<img src="https://avatars0.githubusercontent.com/u/8521353?v=4" width="100px;"/><br /><sub><b>Jimmy Jardland</b></sub>](https://github.com/Jimjardland) | [<img src="https://avatars3.githubusercontent.com/u/34298599?s=460&v=4" width="100px;"/><br /><sub><b>Jenny Lindgren](https://github.com/jennyliindgren)</b></sub> | [<img src="https://avatars2.githubusercontent.com/u/7723195?s=460&v=4" width="100px;"/><br /><sub><b>Jonathan Gustafsson</b></sub>](https://github.com/jonathangus) |
| :---: | :---: | :---: |
<!-- ALL-CONTRIBUTORS-LIST:END -->
