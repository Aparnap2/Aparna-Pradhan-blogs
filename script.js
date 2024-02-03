import * as stableDiffusion from 'stable-diffusion-js'; // Placeholder for library import

// Function for generating images using either client-side library or API
const generateImage = async (prompt) => {
  try {
    if (stableDiffusion.isSupported()) {
      // Use client-side library if available
      const imageData = await stableDiffusion.generateImage(prompt);
      return imageData; // Return image data directly
    } else {
      // Use API if client-side generation is not supported
      const response = await fetch('YOUR_API_ENDPOINT', {
        method: 'POST',
        headers: {
          'Authorization': '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',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ prompt })
      });

      const imageUrl = await response.json();
      return imageUrl; // Return image URL from API
    }
  } catch (error) {
    console.error(error);
    throw new Error('Image generation failed'); // Re-throw for consistent error handling
  }
};

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
