const quizData = [
  {
    question: "Which language runs in a web browser?",
    options: ["Java", "C", "Python", "JavaScript"],
    correct: "JavaScript"
  },
  {
    question: "What does CSS stand for?",
    options: ["Central Style Sheets", "Cascading Style Sheets", "Simple Sheets", "Car Styling System"],
    correct: "Cascading Style Sheets"
  },
  {
    question: "What does HTML stand for?",
    options: ["Hyper Text Markup Language", "Home Tool Markup Language", "Hyperlinks and Text Markup Language", "Hyperloop Machine Language"],
    correct: "Hyper Text Markup Language"
  }
];

let currentQuestion = 0;
let score = 0;

function loadQuestion() {
  const q = quizData[currentQuestion];
  document.getElementById("question").textContent = q.question;
  const optionsList = document.getElementById("options");
  optionsList.innerHTML = "";

  q.options.forEach(option => {
    const li = document.createElement("li");
    li.innerHTML = `
      <label>
        <input type="radio" name="answer" value="${option}" />
        ${option}
      </label>
    `;
    optionsList.appendChild(li);
  });

  document.getElementById("result").textContent = "";
  document.getElementById("next").style.display = "none";
  document.getElementById("submit").style.display = "inline-block";
  document.getElementById("joke").textContent = "";
}

document.getElementById("submit").addEventListener("click", () => {
  const selected = document.querySelector('input[name="answer"]:checked');

  if (!selected) {
    alert("Please select an answer!");
    return;
  }

  const answer = selected.value;
  const correct = quizData[currentQuestion].correct;

  if (answer === correct) {
    score++;
    document.getElementById("result").textContent = "Correct ✅";
    document.getElementById("result").style.color = "lightgreen";
  } else {
    document.getElementById("result").textContent = `Wrong ❌ (Correct: ${correct})`;
    document.getElementById("result").style.color = "tomato";
  }

  document.getElementById("submit").style.display = "none";
  document.getElementById("next").style.display = "inline-block";
});

document.getElementById("next").addEventListener("click", () => {
  currentQuestion++;
  if (currentQuestion < quizData.length) {
    loadQuestion();
    showJoke(); // Show joke after next question loads
  } else {
    document.querySelector(".container").innerHTML = `
      <h2>Quiz Completed!</h2>
      <p>Your Score: ${score} / ${quizData.length}</p>
      <div id="joke"></div>
    `;
    showJoke();
  }
});

function showJoke() {
  fetch("https://v2.jokeapi.dev/joke/Any?type=single")
    .then(res => res.json())
    .then(data => {
      document.getElementById("joke").textContent = `😂 Joke: ${data.joke}`;
    })
    .catch(() => {
      document.getElementById("joke").textContent = "Couldn't load a joke.";
    });
}

loadQuestion();
