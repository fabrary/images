const fs = require("fs");
const path = require("path");
const glob = require("glob");
const sharp = require("sharp");

const cardSource = "jpeg/cards";
const cardDestination = "webp/cards";
const heroSource = "jpeg/heroes";
const heroDestination = "webp/heroes";

(async () => {
  const deleteExistingImages = async () => {
    console.log("Removing existing images");
    const options = { recursive: true };

    fs.rmSync(cardDestination, options);
    fs.mkdirSync(cardDestination);

    fs.rmSync(heroDestination, options);
    fs.mkdirSync(heroDestination);
  };

  const convertImages = async (images, destination) => {
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
          .webp({ quality: 100 })
          .toFile(imageOutput, (err) => {
            if (err) {
              console.error(`Error processing ${image}`, err);
            }
          });
      }
    }
  };

  await deleteExistingImages();

  const cards = glob.sync(`${cardSource}/**/*`);
  const heroes = glob.sync(`${heroSource}/**/*`);
  console.log(`Converting ${cards.length + heroes.length} images`);
  // await convertImages(cards, cardDestination);
  // await convertImages(heroes, heroDestination);
})();
