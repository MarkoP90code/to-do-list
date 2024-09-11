//In this project, you will learn how localStorage works in JavaScript by building a Todo app. LocalStorage is a web storage feature of JavaScript that lets you persist data by storing the data as a key:value pair.
//OVDE SU BROJEVI KOJI SE ODNOSE NA REDOSLED BAS I NE POVEZANI JER JE BILO DA SE VRACAMO PA MENJAMO NESTO STO SMO VEC URADILI.
//Some buttons have onclick.
//this
//splice
//remove
//localStorage - ima objasnjenje na dnu koda i u wordu. Valjda od koraka 48 do koraka 53.

//1.
const taskForm = document.getElementById("task-form");
const confirmCloseDialog = document.getElementById("confirm-close-dialog");
const openTaskFormBtn = document.getElementById("open-task-form-btn");
const closeTaskFormBtn = document.getElementById("close-task-form-btn");
const addOrUpdateTaskBtn = document.getElementById("add-or-update-task-btn");
const cancelBtn = document.getElementById("cancel-btn");
const discardBtn = document.getElementById("discard-btn");
const tasksContainer = document.getElementById("tasks-container");
const titleInput = document.getElementById("title-input");
const dateInput = document.getElementById("date-input");
const descriptionInput = document.getElementById("description-input");

//2.
const taskData = JSON.parse(localStorage.getItem("data")) || [];        //This array will store all the tasks along with their associated data, including title, due date, and description. This storage will enable you to keep track of tasks, display them on the page, and save them to localStorage. Ovaj deo (JSON.parse(localStorage.getItem("data"))) sam dodao u 57. koraku.
let currentTask = {};       //This variable will be used to track the state when editing and discarding tasks.


//5. MOZDA. NAKNADNO ISPRAVLJAMO PA MENJAM NESTO STO SAM VEC IMAO PA NE MOGU DA PRATIM BROJEVIMA
const addOrUpdateTask = () => {
    const dataArrIndex = taskData.findIndex((item) => item.id === currentTask.id);      //Implicit return. You need to determine whether the task being added already exists or not. If it doesn't exist, you will add it, and if it already exists, you will set it up for editing. You can use the findIndex() method to accomplish this.     Ako pronadje isti index u array onda vrati taj broj, a ako ne pronadje vrati -1. 
    const taskObj = {
        id: `${titleInput.value.toLowerCase().split(' ').join('-')}-${Date.now()}`,    //za id sve je unutar `` jer id vrednost je string u ovom slucaju. Uzimam vrednosti inputa, pretvaram u lower case, ond uradim split pa join. Primer (ako ukucam operi auto, split ce ovde da napravi operi,auto a join ce da uradio operi-auto. I tako smo dobili id). I onda da bi bilo jos unikatnije dodamo crtu (-) i Date.now() (returns the number of milliseconds elapsed since January 1, 1970 00:00:00 UTC). 
        title: titleInput.value,
        date: dateInput.value,
        description: descriptionInput.value,
    };  
    if (dataArrIndex === -1) {          //Ako nadje id koji se poklapa izbaci index tog clana "findIndex()", a ako ne nadje izvaci -1. 
        taskData.unshift(taskObj);      //koliko vidim unshift radi isto sto i .push() samo sto gura elemente na pocetak array-a, a ne na kraj.
        } else {
          taskData[dataArrIndex] = taskObj;       //U ovom slucaju dataArrIndex nije jednak -1 nego indexu currentTask-a.
        }
    
    localStorage.setItem("data", JSON.stringify(taskData));         //Ovako ubacujem podatke u localStorage. Ima na dnu koda objasnjenje i u wordu. Ubacujem i ovde i na deleteTask. na edit ne zato sto addOrUpdateTask ubuhvata i to posto je isto dugme.

    updateTaskContainer();
    reset();
    };

    const editTask = (buttonEl) => {
        const dataArrIndex = taskData.findIndex((item) => item.id === buttonEl.parentElement.id);
        currentTask = taskData[dataArrIndex];   //Ovde prvi put dodeljujemo currentTasku nesto sto nije orazan objekat {}.
        titleInput.value = currentTask.title;   //Ovde sam namestam da kad stisnem edit otvori prozor sa podacima od tog na koji sam kliknuo.
        dateInput.value = currentTask.date;
        descriptionInput.value = currentTask.description;
    
        addOrUpdateTaskBtn.innerText = "Update Task";           //Promeni dugme da pise update task umesto add task.
        taskForm.classList.toggle("hidden");                    //Pozove modal da se pojavi. trenutno je hidden ali uradim toggle pa mu skinem hidden clasu.
    };  

const updateTaskContainer = () => {             //Ne kontam zasto ne radi isto ako izvacim ovo i umesto += u trecem redu stavim samo =.
    tasksContainer.innerHTML ="";
    taskData.forEach(({id, title, date, description}) => {          //Step 16. - forEach() imam u wordu, a ovde u zagradi radim destructuring.
        tasksContainer.innerHTML += `
        <div class="task" id="${id}">
        <p><strong>Title:</strong> ${title}</p>
        <p><strong>Date:</strong> ${date}</p>
        <p><strong>Description:</strong> ${description}</p>
        <button onclick="editTask(this)" type="button" class="btn">Edit</button>
        <button onclick="deleteTask(this)" type="button" class="btn">Delete</button> 
        </div>   
        `;                                                          //Obratiti paznju na += posto u nekom od ranijih zadataka sam imao samo =.
    });
    }

//6. Nije sesto nego je neki veci broj ali ne mogu da ispatim pa onda bar otprilike.
window.deleteTask = function(buttonEl) {       //Na button sam stavio onclick pa sad pravim funkciju.
     const dataArrIndex = taskData.findIndex((item) => item.id === buttonEl.parentElement.id);      //dataArrIndex imam i u addOrUpdateTask() funkciji ali ovo je druga funkcija i mogu da koristim isto ime. Sa var valjda ne bi mogao.       
     buttonEl.parentElement.remove();        //Ovde uklanjam buttonEl.parentElement sto mislim da je <div class="task" id="${id}">
     taskData.splice(dataArrIndex, 1);       //Step 38. splice() is an array method that modifies arrays by removing, replacing, or adding elements at a specified index, while also returning the removed elements. It can take up to three arguments: the first one is the mandatory index at which to start, the second is the number of items to remove, and the third is an optional replacement element. U ovom slucaju uklanjam elemenat koji pocinje na mestu sa indexom dataArrIndex i duzine je 1. Tako da taskData vise nema taj element. 
 
     localStorage.setItem("data", JSON.stringify(taskData));    //Kad obrisem nesto uradi update. Posto imam splice() ne treba mi localStorage.removiItem() ili localStorage.clear()
    };

//7.

console.log(editTask);
//4.
const reset = () => {           //If you attempt to add another task now, you'll notice that the input fields retain the values you entered for the previous task. To resolve this, you need to clear the input fields after adding a task. Instead of clearing the input fields one by one, it's a good practice to create a function that handles clearing those fields. You can then call this function whenever you need to clear the input fields again. Use arrow syntax to create a reset function and set it to a pair of curly braces.
    titleInput.value = "";
    dateInput.value = "";
    descriptionInput.value  = "";
    taskForm.classList.toggle("hidden");
    currentTask = {};
};

//Stp 58. - You've retrieved the task item(s) now, but they still don't reflect in the UI when the page loads. However, they appear when you add a new task. You can check if there's a task inside taskData using the length of the array. Because 0 is a falsy value all you need for the condition is the array length. Check if there's a task inside taskData, then call the updateTaskContainer() inside the if statement block. With that, you've completed this project.
if(taskData.length) {
    updateTaskContainer();      //Ovo je truthy/Falsy. Procitati Step 58. ako mi nije jasno sta radi. Samo koliko sam skontao radi isto i kad samo stavim updateTaskContainer(); bez if statementa.
  }

//3. - Opening and closing the form modal.
openTaskFormBtn.addEventListener("click", () =>                 //ovde je implicit return pa ne trebaju {}. Mada koliko vidim i kad ih stavim radi isto.
  taskForm.classList.toggle("hidden")                           //Pokaze taskForm.
);

closeTaskFormBtn.addEventListener("click", ()=> {           //Kad stisnem X ako ne jesto napisano izbacice modal sa "cancel" i "discard" (confirmCloseDialog.showModal()), ako nista nije onda pozove reset() funkciju.     
    const formInputsContainValues = titleInput.value || dateInput.value || descriptionInput.value;      //Step 28. You should display the Cancel and Discard buttons to the user only if there is some text present in the input fields.
    const formInputValuesUpdated = titleInput.value !== currentTask.title || dateInput.value !== currentTask.date || descriptionInput.value !== currentTask.description;    //Proverava da li je nesto promenjeno.
    
    if(formInputsContainValues && formInputValuesUpdated) {           //truthy falsy valjda.
        confirmCloseDialog.showModal();                 //Kad stisnem x da izadjem iz taska pita "cancel" ili "discard" (to sto se pojavi je modal). Imam to napravljeno u Html-u.
    } else {
        reset();
    }
});

cancelBtn.addEventListener("click", () =>           //Bez {}. Radi isto i sa {}. Samo je ovako elegantnije valjda.
    confirmCloseDialog.close()                      //Sad mogu da stisnem cancel. Samo iskljuci taj prozor(modal) sto se otvorio.
);

discardBtn.addEventListener("click", () => {        //Kad stisnem discardBtn zatvori prozor(modal) gde pise to dugme i zatvori taskForm.
    confirmCloseDialog.close();
    reset();                                    //Funkcija iz koraka 4. privremeno je pisali "taskForm.classList.toggle("hidden");" ali smo zamenuli sa reset().
});

taskForm.addEventListener("submit", (e) => {        //Now that you've worked on opening and closing the modal, it's time to get the values from the input fields, save them into the taskData array, and display them on the page.
    e.preventDefault();                              //Stops the browser from refreshing the page after submitting the form.

    addOrUpdateTask();                
});







//Ovo su oni ispisali.      U 54. koraku smo ukloni ovaj ceo kod ispod jer nam ne treba. Valjda smo samo gledali kako radi. Ispod imam Step 48, 49, 50, 51, 52, 53.
// const myTaskArr = [
//     { task: "Walk the Dog", date: "22-04-2022" },
//     { task: "Read some books", date: "02-11-2023" },
//     { task: "Watch football", date: "10-08-2021" },
//   ];

// localStorage.setItem("data", JSON.stringify(myTaskArr));    //Step 48, 49, 50, 51, 52, 53 - Ima u wordu. 
// localStorage.clear();
// const getTaskArr = localStorage.getItem("data");
// console.log(getTaskArr);
// const getTaskArrObj = JSON.parse(localStorage.getItem("data"));         //mogao sam i const getTaskArrObj = JSON.parse(getTaskArr);
// console.log(getTaskArrObj);






// TRECE - 
// 1. Za if CSSLayerStatementRule. Ako nesto napisem znaci da imam values da bi zadovoljio prvi uslov 
// i posto je currentTask = {} zadovoljavam i drugi uslov. znaci pokazuje modal.
// 2. Ako ne napisem nista prvi uslov je falsy jer nema values, a drugi je isto falsy jer su sad trenutne
// vrednosti === posto nije nista upisano i currentTask = {}. znaci ne pokazuje modal.
// 3. Ako stisnem edit i nista ne promenim onda je prvi uslov truthu(jer imam vrednosti), a drugi je falsy i
// posto imam && znaci radi else opciju.
// 4. Ako stisnem edit i promenim nesto prvi uslov je i dalje truthy i sad je i drugi uslov truthu sto znaci
// da pokazuje modal.
