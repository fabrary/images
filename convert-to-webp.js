const fs = require("fs");
const glob = require("glob");
const sharp = require("sharp");

const cardSource = "src/cards";
const cardDestination = "webp/cards";
const heroSource = "src/heroes";
const heroDestination = "webp/heroes";
const dynastySource = "src/dynasty";
const dynastyDestination = "webp/dynasty";
const specialSource = "src/special";
const specialDestination = "webp/special";

(async () => {
  const deleteExistingImages = async (directory) => {
    console.log("Removing existing images");
    const options = { recursive: true };

    if (directory) {
      fs.rmSync(directory, options);
      fs.mkdirSync(directory);
    } else {
      fs.rmSync(cardDestination, options);
      fs.mkdirSync(cardDestination);

      fs.rmSync(heroDestination, options);
      fs.mkdirSync(heroDestination);
    }
  };

  const convertImages = async (images, destination, quality = 70) => {
    for (const image of images) {
      const stat = await fs.promises.stat(image);

      if (stat.isFile()) {
        const imageBuffer = fs.readFileSync(image);
        const imageName = image.substring(
          image.lastIndexOf("/") + 1,
          image.lastIndexOf(".")
        );
        const imageOutput = `${destination}/${imageName}.webp`;

        sharp(imageBuffer)
          .webp({ quality })
          .toFile(imageOutput, (err) => {
            if (err) {
              console.error(`Error processing ${image}`, err);
            }
          });
      }
    }
  };

  if (process.env.DYNASTY_ONLY) {
    await deleteExistingImages(dynastyDestination);
    const dynastyCards = glob.sync(`${dynastySource}/**/*`);
    console.log(`Converting ${dynastyCards.length} images`);
    await convertImages(dynastyCards, dynastyDestination);
  } else if (process.env.HEROES_ONLY) {
    await deleteExistingImages(heroDestination);
    const heroes = glob.sync(`${heroSource}/**/*`);
    console.log(`Converting ${heroes.length} images`);
    await convertImages(heroes, heroDestination);
  } else if (process.env.SPECIAL_ONLY) {
    await deleteExistingImages(specialDestination);
    const special = glob.sync(`${specialSource}/**/*`);
    await convertImages(special, specialDestination, 90);
  } else {
    await deleteExistingImages();
    const cards = glob.sync(`${cardSource}/**/*`);
    const dynastyCards = glob.sync(`${dynastySource}/**/*`);
    const heroes = glob.sync(`${heroSource}/**/*`);
    console.log(
      `Converting ${cards.length + dynastyCards.length + heroes.length} images`
    );
    await convertImages(cards, cardDestination);
    await convertImages(dynastyCards, dynastyDestination);
    await convertImages(heroes, heroDestination);
  }
})();
