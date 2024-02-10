const URL = "https://api.openai.com/v1/chat/completions";

type Message = {
  role: string;
  content: string;
};

type ChatGPTResponse = {
  choices: {
    message: {
      role: string;
      content: string;
    };
  }[];
};

export const fetchChatGPTResponse = (
  apiKey: string,
  messages: Message[],
): Promise<ChatGPTResponse> => {
  const body = {
    model: "gpt-3.5-turbo-0125",
    messages: messages,
    max_tokens: 50,
  };

  return fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify(body),
  }).then((response) => response.json());
};
