export async function generateImage(prompt, options) {
    // TODO: do an API request to some image generation service
    console.log('Generating image with prompt:', prompt, 'and options:', options);

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

    console.log(response.body);

    const imageBlob = await response.blob();
    const imageBuffer = await imageBlob.arrayBuffer();
    const image = Buffer.from(imageBuffer);

    return { image, format: imageBlob.type };
}