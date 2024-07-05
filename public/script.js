document.addEventListener('DOMContentLoaded', function() {
    const numberForm = document.getElementById('numberForm');
    const resultsDiv = document.getElementById('results');

    numberForm.addEventListener('submit', async function(event) {
        event.preventDefault();

        const numMemes = parseInt(document.getElementById('numMemesInput').value, 10);
        
        // Validate user input
        if (!numMemes || isNaN(numMemes) || numMemes <= 0) {
            resultsDiv.innerHTML = '<p class="alert alert-danger">Please enter a valid number</p>';
            return;
        }

        try {
            // Fetch memes data from your server's /memes endpoint
            const response = await axios.get('/memes');
            const memes = response.data.memes;

            // Check if user requested index is within range
            if (numMemes > memes.length) {
                resultsDiv.innerHTML = '<p class="alert alert-danger">Requested meme index exceeds available memes.</p>';
                return;
            }

            // Get the meme object corresponding to user input index
            const selectedMeme = memes[numMemes - 1]; // Adjust index to start from 1
            
            // Display the selected meme
            resultsDiv.innerHTML = '';
            const card = document.createElement('div');
            card.className = 'card mb-3';
            
            const img = document.createElement('img');
            img.src = selectedMeme.url;
            img.className = 'card-img-top';
            img.alt = selectedMeme.name;
            
            const cardBody = document.createElement('div');
            cardBody.className = 'card-body text-center';
            
            const title = document.createElement('h5');
            title.className = 'card-title';
            title.textContent = selectedMeme.name;
            
            cardBody.appendChild(title);
            card.appendChild(img);
            card.appendChild(cardBody);
            
            resultsDiv.appendChild(card);

        } catch (error) {
            console.error('Error fetching memes:', error);
            resultsDiv.innerHTML = '<p class="alert alert-danger">Error fetching memes. Please try again later.</p>';
        }
    });
});
