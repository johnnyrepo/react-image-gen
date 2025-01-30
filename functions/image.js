const { logger } = require("firebase-functions");

module.exports.generateImage = async function(prompt, options) {
    logger.info('Generating image with prompt:', prompt, 'and options:', options);

    // https://ai-girl.site/api/workerai
    // {prompt: "a cat in a hat"}
    const settings = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ prompt })
    };
    const response = await fetch('https://ai-girl.site/api/workerai', settings);

    logger.info(response.body);

    const imageBlob = await response.blob();
    const imageBuffer = await imageBlob.arrayBuffer();
    const image = Buffer.from(imageBuffer);

    return { image, format: imageBlob.type };
}