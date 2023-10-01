const textAreaValue = document.querySelector("#textInp");
const sendBtn = document.querySelector(".send");
const chatBox = document.querySelector(".chatbox");
const btns = document.querySelector(".btns");
const CloseChatbot = document.querySelector(".close_chatbot");

let userMessage;
let heightTextArea = textAreaValue.scrollHeight;

const OPENAI_API_KEY = "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";

const generateResponse = (resultChatLi) => {
  const chatElement = resultChatLi.querySelector("p");
  const URL_Link = "https://api.openai.com/v1/chat/completions ";
  const resData = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: `${userMessage}` }],
    }),
  };

  fetch(URL_Link, resData)
    .then((res) => res.json())
    .then((data) => {
      chatElement.textContent = data.choices[0].message.content;
    })
    .catch((err) => {
      chatElement.classList.add("error");
      chatElement.textContent = "Something Is Wrong Please Try A gain!";
    })
    .finally(() => {
      chatBox.scrollTo(0, chatBox.scrollHeight);
    });
};

const createChatLi = (message, className) => {
  const chatLi = document.createElement("li");
  chatLi.classList.add(className);
  let chatContent =
    className === "outcoming"
      ? `<p></p>`
      : `<i class="fa-solid fa-robot"></i>
         <p></p>`;

  chatLi.innerHTML = chatContent;
  chatLi.querySelector("p").textContent = message;
  return chatLi;
};

const handleChat = () => {
  userMessage = textAreaValue.value.trim();
  if (!userMessage) return;
  textAreaValue.value = "";
  chatBox.appendChild(createChatLi(userMessage, "outcoming"));
  chatBox.scrollTo(0, chatBox.scrollHeight);
  setTimeout(() => {
    let resultChatLi = createChatLi("Thinking...", "incoming");
    chatBox.appendChild(resultChatLi);
    chatBox.scrollTo(0, chatBox.scrollHeight);
    generateResponse(resultChatLi);
  }, 600);
};

sendBtn.addEventListener("click", handleChat);

btns.addEventListener("click", () =>
  document.body.classList.toggle("show_chatbot")
);
CloseChatbot.addEventListener("click", () =>
  document.body.classList.remove("show_chatbot")
);

textAreaValue.addEventListener("keyup", () => {
  textAreaValue.style.height = heightTextArea + "px";
  textAreaValue.style.height = textAreaValue.scrollHeight + "px";
});

textAreaValue.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    console.log("Key Code Is:" + e.key);
    handleChat();
  }
});
