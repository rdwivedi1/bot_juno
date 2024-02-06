const API = {
  GetChatbotResponse: async (userInput) => {
    const apiKey = 'VF.DM.65c08beadf941b23162ce45f.4dtobjTFKLMWtaVQ'; // Your Voiceflow API key
    const userID = 'user_123'; // Unique ID used to track conversation state

    const body = {
      action: {
        type: 'text',
        payload: userInput,
      },
    };

    try {
      const response = await fetch(`https://general-runtime.voiceflow.com/state/user/${userID}/interact`, {
        method: 'POST',
        headers: {
          'Authorization': apiKey,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();
      
      // Filter response to get objects of type 'text' and extract their messages
      const textResponses = data.filter(item => item.type === 'text').map(item => item.payload.message);

      // Join all text responses into a single string
      return textResponses.join('\n');
    } catch (error) {
      console.error('Error interacting with Voiceflow:', error);
      return "Sorry, I couldn't understand that.";
    }
  }
};

export default API;
