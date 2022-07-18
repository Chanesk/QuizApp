let monFormulaire = document.querySelector("#mon_formulaire");
let contennair = document.querySelector(".container");

let ctr = 0;
let num = 1;
let score = 0;
let username = "";
let email = "";
let intervalID;

monFormulaire.addEventListener("submit", commencer);
// document.getElementById("submit").disabled = true;
function commencer(e) {
  e.preventDefault();

  let monNom = e.target.elements["nom"].value;
  let monMail = e.target.elements["mail"].value;
  let validMail = monMail.match(/@/g);

  if (!validNom(monNom) || !validEmail(validMail)) return;

  quizzes(contennair);
  username = monNom;
  email = monMail;
  // moveBar();

  let monInput = document.querySelectorAll('input[type="radio"]');

  for (let i = 0; i < monInput.length; i++) {
    if (monInput[i].checked) {
      if (monInput[i].value === questions[ctr]?.answers) {
        score++;
      }
    }
  }

  // let formQuiz = document.getElementById("form_quiz");
  buttonGreen();
  exitBtn();
  // document.getElementById("btn_orange").addEventListener("click", showAccueil);
}

function validNom(monNom) {
  if (!monNom) {
    document.querySelector("#info_nom").innerText =
      "Veuillez  renseigner un Nom valide.";
    return false;
  }
  if (monNom.length === 1) {
    document.querySelector("#info_nom").innerText =
      "veuillez renseigner un nom d’au moins deux caractères.";
    return false;
  }
  return monNom;
}

function validEmail(validMail) {
  if (validMail === null) {
    document.querySelector("#info_email").innerText =
      "renseigner une adresse email valide.";
    return false;
  }
  return validMail;
}
function quizzes(contennair) {
  contennair.innerHTML = `
 <div class="box_questions" id="box_questions">
  
        <p id="quest_text">${questions[ctr]?.question}</p>
        <div id="progres_bar">
          <div id="question_count">
            <div>Question <span id="quest_count">${num}</span>/15</div>
            <div><span id="count_time"></span></div>
          </div>
          <div id="myProgress">
            <div id="myBar"></div>
          </div>
        </div>
        <form action="">
          <div class="form_div">
            <div>
              <input type="radio" value="${questions[ctr]?.assertions[0]}" id="assertion_first" name="assertion" />
              <label for="assertion_prem" id="ass_first">${questions[ctr]?.assertions[0]}</label>
            </div>
            <div>
              <input type="radio" value="${questions[ctr]?.assertions[1]}" id="assertion_second" name="assertion" />
              <label for="assertion_deux" id="ass_second">${questions[ctr]?.assertions[1]}</label>
            </div>
            <div>
              <input type="radio" value="${questions[ctr]?.assertions[2]}" id="assertion_third" name="assertion" />
              <label for="assertion_trois" id="ass_third">${questions[ctr]?.assertions[2]}</label>
            </div>
            <div>
              <input type="radio" value="${questions[ctr]?.assertions[3]}" id="assertion_fourth" name="assertion" />
              <label for="assertion_quatre" id="ass_fourth">${questions[ctr]?.assertions[3]}</label>
            </div>
          </div>
          <div class="submit_btn">
            <div>
              <button type="submit" id="btn_orange">Quitter</button>
            </div>
            <div>
              <button type="submit" id="btn_green">Suivant</button>
            </div>
          </div>
        </form>
      </div>`;
  num++;
  moveBar();
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
        n = 0;
        if (ctr <= 15) {
          let monInput = document.querySelectorAll('input[type="radio"]');
          ctr++;
          quizzes(contennair);
          buttonGreen();
        }
        if (ctr >= 15 && score >= 8) {
          validQuiz(username, email);
          n = 0;
        }
        if (ctr >= 15 && score < 8) {
          invalidQuiz(username, email);
          n = 0;
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

function exitBtn() {
  document.getElementById("btn_orange").addEventListener("click", function (e) {
    e.preventDefault();
    if (score >= 8 ) {
      validQuiz(username, email);
      document.getElementById("accueil").addEventListener("click", showAccueil);
    }

    if (score < 8) {
      invalidQuiz(username, email);
      document.getElementById("accueil").addEventListener("click", showAccueil);
    }
  });
}

function buttonGreen() {
  let nextBtn = document.getElementById("btn_green");
  let monInput = document.querySelectorAll('input[type="radio"]');

  nextBtn.addEventListener("click", function (d) {
    d.preventDefault();
    for (let i = 0; i < monInput.length; i++) {
      if (monInput[i].checked) {
        if (monInput[i].value === questions[ctr]?.answers) {
          score++;
          console.log(score);
        }
      }
    }

    if (ctr <= 15) {
      ctr++;
      quizzes(contennair);
      buttonGreen();
    }

    if (ctr >= 15 && score >= 8) {
      validQuiz(username, email);
      document.getElementById("accueil").addEventListener("click", showAccueil);
    }

    if (ctr >= 15 && score < 8) {
      invalidQuiz(username, email);
      document.getElementById("accueil").addEventListener("click", showAccueil);
    }
  });
}

let questions = [
  {
    question: "Comment créer une fonction en JavaScript?",
    assertions: [
      "function f()",
      "function = f()",
      "function:f()",
      "Aucune de ces réponses n’est vraie.",
    ],
    answers: "function f()",
  },
  {
    question: "Comment faire appelle à une fonction nommée « sum »?",
    assertions: [
      "sum()",
      "call function sum()",
      "call sum()",
      "Aucune de ces réponses n’est vraie.",
    ],

    answers: "sum()",
  },
  {
    question: "Dans quel balise HTML plaçons-nous le code JavaScript?",
    assertions: [
      "La balise js",
      "La balise javascript",
      "La balise script",
      "La balise rel",
    ],

    answers: "La balise script",
  },

  {
    question: "Comment déclarer une occurence en JavaScript?",
    assertions: ["let ", "Const", "Var", "Toutes ces réponses sont bonnes"],

    assertions: ["let ", "Const", "Var", "Toutes ces réponses sont bonnes"],
    answers: "Toutes les réponses sont bonnes",
  },
  {
    question:
      "Quel est l’objet qui se trouve dans TOP de la racine en JavaScript ?",
    assertions: ["url", " top", " window", "document"],

    answers: "window",
  },
  {
    question:
      "Quel est l’objet qui se trouve dans TOP de la racine en JavaScript ?",
    assertions: ["url", " top", " window", "document"],

    answers: "window",
  },
  {
    question:
      "Comment trouvez-vous le nombre avec la plus grande valeur de « a » et « b »?",
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
      "Pour vérifier si trois variables sont égaux, nous utiliserons_____ ?",
    assertions: [
      "X = Y = Z",
      "(X == B) && (Y == Z)",
      "(X = B) && (Y = Z)",
      "(X == B) & (Y == Z)",
    ],

    answers: "(X == B) && (Y == Z)",
  },
  {
    question: "Combien de paramètres peuvent être passés à une fonction?",
    assertions: [
      "Aucune",
      "Autant que vous voulez",
      "Un pour chaque argument",
      "Un",
    ],

    answers: "Un pour chaque argument",
  },
  {
    question: " Lequel de ces paramètres n’est pas valide?",
    assertions: [" texte", "une variable", "un opérateur", " un nombre"],

    answers: "un opérateur",
  },
  {
    question: "Comment pouvez-vous détecter le nom du navigateur du client?",
    assertions: [
      "navigator.appName",
      "browser.name",
      "client.navName",
      "window.appName",
    ],

    answers: "navigator.appName",
  },
  {
    question: " Lequel n’est pas un opérateur de comparaison?",
    assertions: [" <", ">", "=", "!="],

    answers: "=",
  },
  {
    question: " Quel événement est spécifique au clavier?",
    assertions: ["onkeypress", "onkeydown", "onclick", "onfocus"],

    answers: "onkeypress",
  },
  {
    question:
      "Quel événement utilisez-vous pour exécuter quelque chose une fois le chargement du page est terminé?",
    assertions: ["onfinished", "onload", "onunload", "oncomplete"],

    answers: "onload",
  },
  {
    question:
      "Quel mot clé intercepte toutes les valeurs sauf celles spécifiées?",
    assertions: ["all", "any", "default", "otherwise"],

    answers: "default",
  },
];

function validQuiz(monNom, validMail) {
  contennair.innerHTML = `
        <div class="validQuiz">
        <h1>${monNom}</h1>
        <p>${validMail}</p>
        <figure>
          <img src="valid.svg" alt="quiz valider">
        </figure>
        <p><span>${score}</span>/15</p>
        <div><button type="submit" id="accueil">Accueil</button></div>
      </div>
    </div>
`;
}

function invalidQuiz(monNom, validMail) {
  contennair.innerHTML = `
        <div class="validQuiz">
        <h1>${monNom}</h1>
        <p>${validMail}</p>
        <figure>
          <img src="Vector.svg" alt="quiz invalider">
        </figure>
        <p><span>${score}</span>/15</p>
        <div><button type="submit" id="accueil">Accueil</button></div>
      </div>
    </div>
`;
}

function showAccueil(a) {
  a.preventDefault();
  clearInterval(intervalID);
  contennair.innerHTML = `      <div class="box_quiz" id="box_quiz">
        <h1>JavaScript Quiz</h1>
        <p>
          Evaluer vos compétences en JavaScript en répondant aux questions nous
          avons spécialement selectionner pour vous. c'est fun et c'est gratuit
        </p>
        <form action="" id="mon_formulaire">
          <div>
            <label for="nom">Nom</label><br /><br />
            <input type="text" id="nom" />
            <span id="info_nom">salut</span>
          </div>
          <div>
            <label for="email">Email</label><br /><br />
            <input type="text" id="mail" />
            <span id="info_email">salut</span>
          </div>
          <div class="submit">
            <button type="submit" id="submit">Commencer</button>
          </div>
        </form>
      </div>`;
  commencer;
}
