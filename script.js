import * as stableDiffusion from 'stable-diffusion-js';
const openai = require('openai');

openai.apiKey = "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";

const generateImage = async (prompt) => {
  try {
    // Check for client-side support
    if (stableDiffusion.isSupported()) {
      const imageData = await stableDiffusion.generateImage(prompt);
      return imageData;
    } else {
      // Use OpenAI API
      const response = await openai.createImage({
        model: "dall-e-3",
        prompt: prompt,
        n: 1,
        size: "1024x1024",
      });

      const imageUrl = response.data.data[0].url;
      return imageUrl;
    }
  } catch (error) {
    console.error(error); // Log the error for debugging
    throw new Error('Image generation failed'); // Re-throw for consistent error handling
  }
};

// ... rest of  code, including event listners


const generateButton = document.getElementById('generate-button');
const generatedImage = document.getElementById('generated-image');

generateButton.addEventListener('click', async () => {
  try {
    const prompt = document.getElementById('prompt').value;
    const imageDataOrUrl = await generateImage(prompt);

    if (typeof imageDataOrUrl === 'string') {
      // Handle image URL from API
      generatedImage.src = imageDataOrUrl;
    } else {
      // Handle image data from client-side library
      generatedImage.src = URL.createObjectURL(new Blob([imageDataOrUrl], { type: 'image/jpeg' }));
    }
  } catch (error) {
    alert('Error generating image'); // Provide user feedback
  }
});
