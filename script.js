let monFormulaire = document.querySelector("#mon_formulaire");
let contennair = document.querySelector(".container");
let nextBtn = document.getElementById("btn_green");
let exitBtn = document.getElementById("btn_orange");
let accueilBtn = document.getElementById("accueil");
let monInput = document.querySelectorAll('input[type="radio"]');
nextBtn.disabled = true;
console.log(nextBtn.disabled);

let firstContenair;
let secondContenair;
let thirdContennair;
let accueilPage;

let ctr = 0;
let num = 1;
let score = 0;
let username = "";
let email = "";
let intervalID;

for (let i = 0; i < monInput.length; i++) {
  monInput[i].addEventListener("change", surbrillance);
}
function surbrillance(e) {
  nextBtn.disabled = false;
  document.querySelector(".borderGreen")?.classList.remove("borderGreen");
  e.target.parentElement.classList.add("borderGreen");
  nextBtn.style.background = "#028a3d";
}

monFormulaire.addEventListener("submit", commencer);
function commencer(e) {
  e.preventDefault();

  let monNom = e.target.elements["nom"].value;
  let monMail = e.target.elements["mail"].value;
  validNom(monNom) && validEmail(monMail);
  if (validNom(monNom) === false || validEmail(monMail) === false) {
    return;
  } else {
    firstContenair = e.target.offsetParent;
    username = monNom;
    email = monMail;

    firstContenair.style.display = "none";
    firstContenair.nextElementSibling.style.display = "flex";

    quizzes();
    moveBar();
    nextBtn.textContent = "Suivant";
    e.target.reset();
    score = 0;
  }

  nextBtn.addEventListener("click", buttonGreen);
  exitBtn.addEventListener("click", exitQuiz);
  accueilBtn.addEventListener("click", showAccueil);
}

function validNom(monNom) {
  let verify;
  let nom = document.querySelector("#info_nom");

  if (!monNom || monNom.length == 1) {
    if (!monNom) {
      nom.innerText = "Veuillez  renseigner un Nom valide.";
      document.querySelector(".box_quiz div input").style.border =
        "1px solid #ff3838";
    }
    if (monNom.length == 1) {
      nom.innerText = "veuillez renseigner un nom d???au moins deux caract??res.";
      document.querySelector(".box_quiz div input").style.border =
        "1px solid #ff3838";
    }

    verify = false;
  } else {
    document.querySelector(".box_quiz div input").style.border =
      "1px solid #555555";
    nom.innerText = "";
    verify = true;
  }

  return verify;
}

function validEmail(monMail) {
  let verify;
  let validMail = monMail.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,6}$/g);
  let mail = document.querySelector("#info_email");

  if (monMail === "") {
    mail.innerText = "veillez renseigner une adresse email";
    document.querySelector("#mail").style.border = "1px solid #ff3838";

    verify = false;
  } else if (validMail === null) {
    mail.innerText = "renseigner une adresse email valide.";
    document.querySelector("#mail").style.border = "1px solid #ff3838";

    verify = false;
  } else {
    mail.innerText = "";
    verify = true;
  }
  return verify;
}

function quizzes(contennair) {
  let assertionFirst = (document.getElementById("quest_text").innerText =
    questions[ctr]?.question);
  document.getElementById("quest_count").innerText = num;
  document.getElementById("ass_first").innerText =
    questions[ctr]?.assertions[0];
  document.getElementById("ass_second").innerText =
    questions[ctr]?.assertions[1];
  document.getElementById("ass_third").innerText =
    questions[ctr]?.assertions[2];
  document.getElementById("ass_fourth").innerText =
    questions[ctr]?.assertions[3];
  document
    .getElementById("assertion_first")
    .setAttribute("value", questions[ctr]?.assertions[0]);
  document
    .getElementById("assertion_second")
    .setAttribute("value", questions[ctr]?.assertions[1]);
  document
    .getElementById("assertion_third")
    .setAttribute("value", questions[ctr]?.assertions[2]);
  document
    .getElementById("assertion_fourth")
    .setAttribute("value", questions[ctr]?.assertions[3]);
  num++;
  moveBar();
}
function buttonGreen(d) {
  d.preventDefault();
  secondContenair = d.target.offsetParent;
  nextBtn.style.background = "rgba(2, 138, 61, 0.42)";
  for (let i = 0; i < monInput.length; i++) {
    console.log("surbrillance");
    monInput[i].addEventListener("change", surbrillance);
    if (monInput[i].checked == true) {
      console.log(monInput[i].value);
      console.log(questions[ctr]?.answers);
      if (monInput[i].value === questions[ctr]?.answers) {
        score++;
      }
      monInput[i].checked = false;
      monInput[i].parentElement.classList.remove("borderGreen");
    }
  }

  if (ctr <= 15) {
    ctr++;
    quizzes();
  }
  if (ctr >= 14) {
    nextBtn.textContent = "Terminer";
  }

  if (ctr >= 15) {
    validQuiz(secondContenair);
  }
}

function moveBar() {
  let myBar = document.getElementById("myBar");
  let countTime = document.getElementById("count_time");
  clearInterval(intervalID);
  let n = 60;

  if (n == 60) {
    n = 60;
    let width = 100;
    intervalID = setInterval(frame, 1000);

    function frame() {
      if (width <= 0) {
        clearInterval(intervalID);
        if (ctr <= 15) {
          ctr++;
          quizzes();
        }
        if (ctr >= 14) {
          nextBtn.textContent = "Terminer";
        }
        if (ctr >= 15) {
          let secContenair = myBar.offsetParent;
          validQuiz(secContenair);
        }
      } else {
        width -= 1.667;
        n--;
        myBar.style.width = width + "%";
        countTime.innerHTML = n;
      }
    }
  }
}

function exitQuiz(e) {
  e.preventDefault();
  secondContenair = e.target.offsetParent;

  for (let i = 0; i < monInput.length; i++) {
    if (monInput[i].checked == true) {
      console.log(monInput[i].value);
      console.log(questions[ctr]?.answers);
      if (monInput[i].value === questions[ctr]?.answers) {
        score++;
      }
      monInput[i].checked = false;
      monInput[i].parentElement.classList.remove("borderGreen");
    }
  }

  validQuiz(secondContenair);
  console.log(score);
}

let questions = [
  {
    question: "Comment cr??er une fonction en JavaScript?",
    assertions: [
      "function f()",
      "function = f()",
      "function:f()",
      "Aucune de ces r??ponses n???est vraie.",
    ],
    answers: "function f()",
  },
  {
    question: "Comment faire appelle ?? une fonction nomm??e ?? sum ???",
    assertions: [
      "sum()",
      "call function sum()",
      "call sum()",
      "Aucune de ces r??ponses n???est vraie.",
    ],

    answers: "sum()",
  },
  {
    question: "Dans quel balise HTML pla??ons-nous le code JavaScript?",
    assertions: [
      "La balise js",
      "La balise javascript",
      "La balise script",
      "La balise rel",
    ],

    answers: "La balise script",
  },

  {
    question: "Comment d??clarer une occurence en JavaScript?",
    assertions: ["let ", "Const", "Var", "Toutes ces r??ponses sont bonnes"],

    assertions: ["let ", "Const", "Var", "Toutes ces r??ponses sont bonnes"],
    answers: "Toutes les r??ponses sont bonnes",
  },
  {
    question:
      "Quel est l???objet qui se trouve dans TOP de la racine en JavaScript ?",
    assertions: ["url", " top", " window", "document"],

    answers: "window",
  },
  {
    question:
      "Quel m??thode JavaScrip qui permet d' obtenir un tableau de  correspondance d'une cha??ne?",
    assertions: ["replace()", "match()", " RegExp", "search()"],

    answers: "match()",
  },
  {
    question:
      "Comment trouvez-vous le nombre avec la plus grande valeur de ?? a ?? et ?? b ???",
    assertions: [
      "Math.ceil(a, b)",
      "Math.max(a, b)",
      "ceil(a, b)",
      "top(a, b)",
    ],

    answers: "Math.max(a, b)",
  },
  {
    question:
      "Pour v??rifier si trois variables sont ??gaux, nous utiliserons_____ ?",
    assertions: [
      "X = Y = Z",
      "(X == B) && (Y == Z)",
      "(X = B) && (Y = Z)",
      "(X == B) & (Y == Z)",
    ],

    answers: "(X == B) && (Y == Z)",
  },
  {
    question: "Combien de param??tres peuvent ??tre pass??s ?? une fonction?",
    assertions: [
      "Aucune",
      "Autant que vous voulez",
      "Un pour chaque argument",
      "Un",
    ],

    answers: "Un pour chaque argument",
  },
  {
    question: " Lequel de ces param??tres n???est pas valide?",
    assertions: [" texte", "une variable", "un op??rateur", " un nombre"],

    answers: "un op??rateur",
  },
  {
    question: "Comment pouvez-vous d??tecter le nom du navigateur du client?",
    assertions: [
      "navigator.appName",
      "browser.name",
      "client.navName",
      "window.appName",
    ],

    answers: "navigator.appName",
  },
  {
    question: " Lequel n???est pas un op??rateur de comparaison?",
    assertions: [" <", ">", "=", "!="],

    answers: "=",
  },
  {
    question: " Quel ??v??nement est sp??cifique au clavier?",
    assertions: ["onkeypress", "onkeydown", "onclick", "onfocus"],

    answers: "onkeypress",
  },
  {
    question:
      "Quel ??v??nement utilisez-vous pour ex??cuter quelque chose une fois le chargement du page est termin???",
    assertions: ["onfinished", "onload", "onunload", "oncomplete"],

    answers: "onload",
  },
  {
    question:
      "Quel mot cl?? intercepte toutes les valeurs sauf celles sp??cifi??es?",
    assertions: ["all", "any", "default", "otherwise"],

    answers: "default",
  },
];

function validQuiz(secondContenair) {
  document.querySelector("#user_name").innerText = username;
  document.querySelector("#e_mail").innerText = email;
  document.querySelector("#monScore").innerText = score;
  secondContenair.style.display = "none";
  secondContenair.nextElementSibling.style.display = "flex";
  clearInterval(intervalID);

  if (score >= 8) {
    document.querySelector("img").setAttribute("src", "valid.svg");
    document.getElementById("accueil").addEventListener("click", showAccueil);
  }

  if (score < 8) {
    document.querySelector("img").setAttribute("src", "Vector.svg");
    document.getElementById("accueil").addEventListener("click", showAccueil);
  }
}

function showAccueil(a) {
  a.preventDefault();
  clearInterval(intervalID);

  ctr = 0;
  num = 1;
  thirdContennair = a.target.offsetParent;
  thirdContennair.style.display = "none";
  firstContenair.style.display = "flex";
}
