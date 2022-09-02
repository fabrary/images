# FaB Images

Initial image setup from: https://github.com/flesh-cube/flesh-and-blood-cards/tree/main/download-all-images

### Project setup requirements

- Nodejs
- MacOS ARM64 (for webp image conversion, or add compatible binaries for other OS)
- `npm i` to install Nodejs dependencies

### Spoilers card image conversion steps

- Image files named by set identifier - ie `DYN001` or whatever the set abbreviation is
- Add images to `src/dynasty`
- `npm run convert:dynasty`

### Released card image conversion steps

- Add images from https://github.com/flesh-cube/flesh-and-blood-cards/tree/main/download-all-images to `src/cards`
- `npm run convert`

### Hero card image conversion steps

- For hero avatar with decks
- Create/crop 250 x 250 px jpeg image framing hero
- Add image to `src/heroes`
- `npm run convert:heroes`
