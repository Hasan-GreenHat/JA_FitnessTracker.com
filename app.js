/* ======================================
   JA FITNESS JOURNAL
   APP.JS PART 1
====================================== */

// ---------- DOM ----------

const weightInput = document.getElementById("weight");
const sleepInput = document.getElementById("sleep");
const waterInput = document.getElementById("water");
const moodInput = document.getElementById("mood");
const energyInput = document.getElementById("energy");

const breakfast = document.getElementById("breakfast");
const lunch = document.getElementById("lunch");
const snacks = document.getElementById("snacks");
const dinner = document.getElementById("dinner");

const notes = document.getElementById("notes");

const saveBtn = document.getElementById("saveBtn");
const resetBtn = document.getElementById("resetBtn");

const displayWeight = document.getElementById("displayWeight");
const currentWeight = document.getElementById("currentWeight");
const lostWeight = document.getElementById("lostWeight");
const weightLost = document.getElementById("weightLost");

const dietStreak = document.getElementById("dietStreak");
const workoutStreak = document.getElementById("workoutStreak");
const waterDisplay = document.getElementById("waterDisplay");

const challengeProgress =
document.getElementById("challengeProgress");

const challengeText =
document.getElementById("challengeText");

// ---------- DEFAULTS ----------

let START_WEIGHT =
parseFloat(localStorage.getItem("startWeight")) || 99;

let GOAL_WEIGHT =
parseFloat(localStorage.getItem("goalWeight")) || 85;
const TOTAL_DAYS = 120;

// ---------- STORAGE ----------

let journal =
JSON.parse(localStorage.getItem("jaFitnessJournal")) || {};

let weightHistory =
JSON.parse(localStorage.getItem("weightHistory")) || [];

let dietDays =
parseInt(localStorage.getItem("dietDays")) || 0;

let workoutDays =
parseInt(localStorage.getItem("workoutDays")) || 0;

let challengeDay =
parseInt(localStorage.getItem("challengeDay")) || 1;

// ---------- AUTO DATE ----------

const today = new Date();

const yyyy = today.getFullYear();

const mm = String(today.getMonth() + 1)
.padStart(2, "0");

const dd = String(today.getDate())
.padStart(2, "0");

const todayString =
`${yyyy}-${mm}-${dd}`;

document.getElementById("date").value =
todayString;

// ---------- LOAD DATA ----------

function loadJournal() {


document.getElementById("userName").value =
localStorage.getItem("userName") || "";

document.getElementById("startWeight").value =
START_WEIGHT;

document.getElementById("goalWeight").value =
GOAL_WEIGHT;
   
if (journal.weight)
weightInput.value = journal.weight;

if (journal.sleep)
sleepInput.value = journal.sleep;

if (journal.water)
waterInput.value = journal.water;

if (journal.mood)
moodInput.value = journal.mood;

if (journal.energy)
energyInput.value = journal.energy;

if (journal.breakfast)
breakfast.value = journal.breakfast;

if (journal.lunch)
lunch.value = journal.lunch;

if (journal.snacks)
snacks.value = journal.snacks;

if (journal.dinner)
dinner.value = journal.dinner;

if (journal.notes)
notes.value = journal.notes;

updateDashboard();

}

loadJournal();

// ---------- DASHBOARD ----------

function updateDashboard(){

const current =
parseFloat(weightInput.value) || START_WEIGHT;

const lost =
(START_WEIGHT - current).toFixed(1);

currentWeight.textContent =
current + " Kg";

displayWeight.textContent =
current + " Kg";

lostWeight.textContent =
lost + " Kg";

weightLost.textContent =
lost + " Kg";

dietStreak.textContent =
dietDays + " Days";

workoutStreak.textContent =
workoutDays + " Days";

const glasses =
parseInt(waterInput.value) || 0;

waterDisplay.textContent =
glasses + " / 16 Glasses";

const percent =
(challengeDay / TOTAL_DAYS) * 100;

challengeProgress.style.width =
percent + "%";

challengeText.textContent =
`Day ${challengeDay} / ${TOTAL_DAYS}`;

}

// ---------- LIVE UPDATE ----------

weightInput.addEventListener(
"input",
updateDashboard
);

waterInput.addEventListener(
"input",
updateDashboard
);


/* ======================================
   JA FITNESS JOURNAL
   APP.JS PART 2
====================================== */

// ---------- SAVE JOURNAL ----------

saveBtn.addEventListener("click", saveJournal);

function saveJournal() {

   START_WEIGHT =
parseFloat(document.getElementById("startWeight").value);

GOAL_WEIGHT =
parseFloat(document.getElementById("goalWeight").value);

localStorage.setItem(
"startWeight",
START_WEIGHT
);

localStorage.setItem(
"goalWeight",
GOAL_WEIGHT
);

localStorage.setItem(
"userName",
document.getElementById("userName").value
);
    // Save form data
    journal = {

        date: document.getElementById("date").value,

        weight: weightInput.value,

        sleep: sleepInput.value,

        water: waterInput.value,

        mood: moodInput.value,

        energy: energyInput.value,

        breakfast: breakfast.value,

        lunch: lunch.value,

        snacks: snacks.value,

        dinner: dinner.value,

        notes: notes.value,

        workoutDay:
        document.getElementById("workoutDay").value,

        workoutTime:
        document.getElementById("workoutTime").value,

        ex1:
        document.getElementById("ex1").value,

        ex2:
        document.getElementById("ex2").value,

        ex3:
        document.getElementById("ex3").value,

        ex4:
        document.getElementById("ex4").value,

        ex5:
        document.getElementById("ex5").value,

        ex6:
        document.getElementById("ex6").value

    };

    localStorage.setItem(
        "jaFitnessJournal",
        JSON.stringify(journal)
    );

    saveWeightHistory();

    updateStreaks();

    updateDashboard();

    alert("✅ Today's Fitness Journal Saved!");

}

// ---------- WEIGHT HISTORY ----------

function saveWeightHistory() {

    const weight =
    parseFloat(weightInput.value);

    if (isNaN(weight))
        return;

    const today =
    document.getElementById("date").value;

    const alreadyExists =
    weightHistory.find(
        item => item.date === today
    );

    if (alreadyExists) {

        alreadyExists.weight = weight;

    } else {

        weightHistory.push({

            date: today,

            weight: weight

        });

    }

    localStorage.setItem(

        "weightHistory",

        JSON.stringify(weightHistory)

    );

}

// ---------- STREAKS ----------

function updateStreaks() {

    const dietDone =
    document.getElementById("dietDone").checked;

    const workoutDone =
    document.getElementById("workoutDone").value
    === "Yes";

    if (dietDone) {

        dietDays++;

    }

    if (workoutDone) {

        workoutDays++;

    }

    localStorage.setItem(

        "dietDays",

        dietDays

    );

    localStorage.setItem(

        "workoutDays",

        workoutDays

    );

}

// ---------- AUTO SAVE ----------

const autoSaveInputs =

document.querySelectorAll(

"input, textarea, select"

);

autoSaveInputs.forEach(input => {

input.addEventListener(

"change",

() => {

saveJournal();

}

);

});





/* ======================================
   JA FITNESS JOURNAL
   APP.JS PART 3
====================================== */

// ---------- WEIGHT CHART ----------

let chart;

function drawChart() {

    const ctx = document
        .getElementById("weightChart")
        .getContext("2d");

    const labels = weightHistory.map(item => item.date);
    const weights = weightHistory.map(item => item.weight);

    if (chart) {
        chart.destroy();
    }

    chart = new Chart(ctx, {

        type: "line",

        data: {

            labels: labels,

            datasets: [{

                label: "Weight (Kg)",

                data: weights,

                borderColor: "gold",

                backgroundColor: "rgba(255,215,0,0.2)",

                borderWidth: 3,

                fill: true,

                tension: 0.35,

                pointRadius: 5,

                pointBackgroundColor: "gold"

            }]

        },

        options: {

            responsive: true,

            maintainAspectRatio: false,

            plugins: {

                legend: {

                    labels: {

                        color: "white"

                    }

                }

            },

            scales: {

                x: {

                    ticks: {

                        color: "white"

                    },

                    grid: {

                        color: "#333"

                    }

                },

                y: {

                    ticks: {

                        color: "white"

                    },

                    grid: {

                        color: "#333"

                    }

                }

            }

        }

    });

}

drawChart();

// ---------- PHOTO UPLOAD ----------

const photoUpload =
document.getElementById("photoUpload");

const photoPreview =
document.getElementById("photoPreview");

photoUpload.addEventListener("change", function () {

    const file = this.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = function (e) {

        photoPreview.innerHTML = `

        <img
        src="${e.target.result}"
        alt="Progress Photo">

        `;

        localStorage.setItem(
            "progressPhoto",
            e.target.result
        );

    };

    reader.readAsDataURL(file);

});

// ---------- LOAD PHOTO ----------

const savedPhoto =
localStorage.getItem("progressPhoto");

if (savedPhoto) {

    photoPreview.innerHTML = `

    <img
    src="${savedPhoto}"
    alt="Progress Photo">

    `;

}

// ---------- UPDATE CHART AFTER SAVE ----------

saveBtn.addEventListener("click", () => {

    drawChart();

});

// ---------- UPDATE DASHBOARD ----------

updateDashboard();






/* ======================================
   JA FITNESS JOURNAL
   APP.JS PART 4
====================================== */

// ---------- RESET JOURNAL ----------

resetBtn.addEventListener("click", resetJournal);

function resetJournal() {

const confirmReset =
confirm("Are you sure you want to reset today's journal?");

if(!confirmReset) return;

document.querySelectorAll(
"input, textarea"
).forEach(element=>{

if(
element.type==="checkbox"
){

element.checked=false;

}else if(
element.type!=="button" &&
element.type!=="file"
){

element.value="";

}

});

document.querySelectorAll(
"select"
).forEach(select=>{

select.selectedIndex=0;

});

localStorage.removeItem(
"jaFitnessJournal"
);

journal={};

updateDashboard();

alert("Journal Reset Successfully!");

}

// ---------- MOTIVATION QUOTES ----------

const quotes=[

"Discipline beats motivation.",

"Every workout makes you stronger.",

"Don't stop until you're proud.",

"Your future body is built today.",

"Small progress is still progress.",

"Excuses don't burn calories.",

"Train hard. Eat clean. Stay consistent.",

"1% better every day.",

"The pain of discipline is less than the pain of regret.",

"Success comes from consistency."

];

function loadQuote(){

const random=
Math.floor(
Math.random()*quotes.length
);

document.getElementById(
"quote"
).textContent=
quotes[random];

}

loadQuote();

// ---------- ACHIEVEMENTS ----------

function checkAchievements(){

const badges=
document.querySelectorAll(".badge");

if(dietDays>=7){

badges[0].style.background="gold";
badges[0].style.color="black";

}

if(dietDays>=30){

badges[1].style.background="gold";
badges[1].style.color="black";

}

if(dietDays>=60){

badges[2].style.background="gold";
badges[2].style.color="black";

}

if(workoutDays>=100){

badges[3].style.background="gold";
badges[3].style.color="black";

}

const currentWeightValue=
parseFloat(weightInput.value)||99;

if(
99-currentWeightValue>=5
){

badges[4].style.background="gold";
badges[4].style.color="black";

}

if(
currentWeightValue<=85
){

badges[5].style.background="gold";
badges[5].style.color="black";

}

}

checkAchievements();

// ---------- 120 DAY CHALLENGE ----------

function updateChallenge(){

challengeDay++;

if(
challengeDay>TOTAL_DAYS
){

challengeDay=TOTAL_DAYS;

}

localStorage.setItem(
"challengeDay",
challengeDay
);

const percentage=
(challengeDay/TOTAL_DAYS)*100;

challengeProgress.style.width=
percentage+"%";

challengeText.textContent=
`Day ${challengeDay} / ${TOTAL_DAYS}`;

}

saveBtn.addEventListener(
"click",
updateChallenge
);

// ---------- AUTO WALK PLAN ----------

const walkGym=
document.getElementById("walkGym");

const walkHome=
document.getElementById("walkHome");

const workoutDay=
document.getElementById("workoutDay");

workoutDay.addEventListener(
"change",
function(){

const day=
this.value;

if(
day.includes("Wednesday")||
day.includes("Saturday")
){

walkGym.value="No (Vehicle)";
walkHome.value="No (Vehicle)";

}else if(
!day.includes("Sunday")
){

walkGym.value="Yes";
walkHome.value="Yes";

}

}
);






/* ======================================
   JA FITNESS JOURNAL
   APP.JS PART 5 (FINAL)
====================================== */

// ---------- DAILY SCORE ----------

function calculateScore() {

let score = 0;

const habits = [

"habit1",
"habit2",
"habit3",
"habit4",
"habit5",
"habit6",
"habit7",
"habit8"

];

habits.forEach(id => {

if(document.getElementById(id).checked){

score++;

}

});

const total = habits.length;

const percent = Math.round((score / total) * 100);

console.log("Today's Score:", percent + "%");

return percent;

}

// ---------- SAVE EXTRA FIELDS ----------

function saveExtraFields(){

const extra={

walkGym:walkGym.value,

walkHome:walkHome.value,

steps:document.getElementById("steps").value,

workoutDone:document.getElementById("workoutDone").value,

protein:document.getElementById("protein").checked,

creatine:document.getElementById("creatine").checked,

cheat:document.getElementById("cheat").checked,

dietDone:document.getElementById("dietDone").checked,

habit1:document.getElementById("habit1").checked,

habit2:document.getElementById("habit2").checked,

habit3:document.getElementById("habit3").checked,

habit4:document.getElementById("habit4").checked,

habit5:document.getElementById("habit5").checked,

habit6:document.getElementById("habit6").checked,

habit7:document.getElementById("habit7").checked,

habit8:document.getElementById("habit8").checked

};

localStorage.setItem(

"jaFitnessExtra",

JSON.stringify(extra)

);

}

saveBtn.addEventListener(

"click",

saveExtraFields

);

// ---------- LOAD EXTRA FIELDS ----------

function loadExtraFields(){

const extra=

JSON.parse(

localStorage.getItem("jaFitnessExtra")

);

if(!extra) return;

walkGym.value=extra.walkGym || "Yes";

walkHome.value=extra.walkHome || "Yes";

document.getElementById("steps").value=extra.steps || "";

document.getElementById("workoutDone").value=extra.workoutDone || "Yes";

document.getElementById("protein").checked=extra.protein || false;

document.getElementById("creatine").checked=extra.creatine || false;

document.getElementById("cheat").checked=extra.cheat || false;

document.getElementById("dietDone").checked=extra.dietDone || false;

for(let i=1;i<=8;i++){

document.getElementById(

"habit"+i

).checked=

extra["habit"+i] || false;

}

}

loadExtraFields();

// ---------- FINAL SAVE ----------

saveBtn.addEventListener("click",()=>{

const score=calculateScore();

updateDashboard();

checkAchievements();

drawChart();

console.log(

"Journal Saved Successfully"

);

console.log(

"Daily Score:",score+"%"

);

});

// ---------- STARTUP ----------

window.onload=()=>{

loadJournal();

loadExtraFields();

updateDashboard();

drawChart();

checkAchievements();

loadQuote();

};

console.log("🏋️ JA FITNESS JOURNAL LOADED SUCCESSFULLY");

