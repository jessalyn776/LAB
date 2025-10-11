document.addEventListener("DOMContentLoaded", loadQuestions);

const quizForm = document.getElementById("quizForm");
const quizList = document.getElementById("quizList");
const saveBtn = document.getElementById("saveBtn");
let editingId = null;

// CRUD: READ
function loadQuestions() {
  const questions = JSON.parse(localStorage.getItem("quizQuestions")) || [];
  quizList.innerHTML = "";
  questions.forEach((q, index) => {
    quizList.innerHTML += `
      <tr>
        <td>${index + 1}</td>
        <td>${q.question}</td>
        <td>${q.correct}</td>
        <td>
          <button class="edit" onclick="editQuestion(${q.id})">Edit</button>
          <button class="delete" onclick="deleteQuestion(${q.id})">Delete</button>
        </td>
      </tr>
    `;
  });
}

// CRUD: CREATE / UPDATE
quizForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const questionData = {
    id: editingId || Date.now(),
    question: document.getElementById("question").value.trim(),
    optionA: document.getElementById("optionA").value.trim(),
    optionB: document.getElementById("optionB").value.trim(),
    optionC: document.getElementById("optionC").value.trim(),
    optionD: document.getElementById("optionD").value.trim(),
    correct: document.getElementById("correct").value.toUpperCase(),
  };

  let questions = JSON.parse(localStorage.getItem("quizQuestions")) || [];

  if (editingId) {
    // Update existing question
    questions = questions.map((q) => (q.id === editingId ? questionData : q));
    editingId = null;
    saveBtn.textContent = "Add Question";
  } else {
    // Create new question
    questions.push(questionData);
  }

  localStorage.setItem("quizQuestions", JSON.stringify(questions));
  quizForm.reset();
  loadQuestions();
});

// CRUD: UPDATE (Edit)
window.editQuestion = function (id) {
  const questions = JSON.parse(localStorage.getItem("quizQuestions")) || [];
  const question = questions.find((q) => q.id === id);

  if (question) {
    document.getElementById("question").value = question.question;
    document.getElementById("optionA").value = question.optionA;
    document.getElementById("optionB").value = question.optionB;
    document.getElementById("optionC").value = question.optionC;
    document.getElementById("optionD").value = question.optionD;
    document.getElementById("correct").value = question.correct;
    editingId = id;
    saveBtn.textContent = "Update Question";
  }
};

// CRUD: DELETE
window.deleteQuestion = function (id) {
  let questions = JSON.parse(localStorage.getItem("quizQuestions")) || [];
  questions = questions.filter((q) => q.id !== id);
  localStorage.setItem("quizQuestions", JSON.stringify(questions));
  loadQuestions();
};
