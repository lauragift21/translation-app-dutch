document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('translateButton').addEventListener('click', async function (event) {
    event.preventDefault(); 
    const sourceText = document.getElementById('sourceText').value;
    document.getElementById('translatedText').textContent = 'Translation in Progress...';

    try {
      const response = await fetch('/api/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: sourceText
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not OK');
      }

      const result = await response.json();
      document.getElementById('translatedText').textContent = result.response.translated_text; 
    } catch (error) {
      console.error('Translation error:', error);
      document.getElementById('translatedText').textContent = 'Failed to translate. Please try again.';
    }
  });
});
