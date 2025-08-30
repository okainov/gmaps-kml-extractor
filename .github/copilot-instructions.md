Create me a simple app based on Vue.js with RU and EN i18n. Prefer Typescript instead of JS where possible.

It should be great looking, utilize Tailwind and be adaptive and responsive for mobiles as well as desktops.

The app is about getting KML/GPX from Google MyMaps.

It should have just one text box for input.

If the input is a valid URL* to google MyMaps, then we should output some success message and a few links to download KML files. The links should be like following, but of course do not show the full URL, make it nicer.

KMZ (compressed) - https://www.google.com/maps/d/u/0/kml?mid=1Mdlz2iXu_iZCPhUhzKvT2B2j-6E
KML (uncompressed, does not support all icons) - https://www.google.com/maps/d/u/0/kml?mid=1Mdlz2iXu_iZCPhUhzKvT2B2j-6E&forcekml=1

* Valid URLs are like 
- https://www.google.com/maps/d/u/0/edit?hl=en&mid=1tWCqTerra6PbOHyn-wncH13ESR2stjw&ll=26.361432629836692%2C52.2930317&z=7
- https://www.google.com/maps/d/u/0/viewer?mid=1-g8EcBCaspkcM3_giYHSVtP2LS1HSr8&femb=1&ll=48.132268571799074%2C11.55401675000002&z=13
- https://www.google.com/maps/d/u/0/embed?mid=1-g8EcBCaspkcM3_giYHSVtP2LS1HSr8&#038;ehbc=2E312F
=> so we are able to extract `mid` ID from the link.

If user provided not a valid Google My Maps URL, display some information message about it.

The app should support docker compose deployment for production (generate static files and serve via nginx) as well as development flow with `npm` locally. Do not bother about SSL/HTTPS, no need.

The app should have production quality, have some fancy README for publishing to Github.