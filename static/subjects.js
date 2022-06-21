

const questions_table = document.getElementById("nav-home");



let home_interval;
let profile_interval;
let contact_interval;

async function home() {
    clearInterval(profile_interval);
    clearInterval(home_interval);
    clearInterval(contact_interval);
    var curent_time = 0;
    let y = true;

    home_interval = setInterval(() => {
        curent_time += .5;
        let m = Math.floor(curent_time / 60);
        let s = Math.floor(curent_time % 60);
        y = !y;
        document.querySelector('#timer').innerHTML = `${m < 10 ? `0${m}` : m}${y ? ":" : " "}${s < 10 ? `0${s}`:s}`
    }, 500);

    let true_answers = 0;
    let wrong_answers = 0;
    questions_table.innerHTML = "";

    document.getElementById("indicator_bar").innerHTML = "";

    const data = await fetch(location.href, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": csrftoken
        },
    });

    const json = await data.json();
    for (let i = 0; i < json.questions.length; i++) {

        const div = document.createElement("div");
        const indicator = create_radio_btn(i + 1, div);

        div.className = "scp-quizzes-main";

        const div_data = document.createElement("div");

        div_data.className = "scp-quizzes-data";

        const h3 = document.createElement("h3");

        h3.style.display = "flex";

        h3.style.flexDirection = "row";


        h3.innerHTML = `${i + 1}.&nbsp;${json.questions[i].question}`;

        div_data.appendChild(h3);

        let true_variant;
        let false_variants = [];

        for (let j = 0; j < json.questions[i].variants.length; j++) {

            const div_answer = document.createElement("div");

            div_answer.className = "answer col-lg-12";

            if (json.questions[i].variants[j].is_true) {
                true_variant = div_answer;
            }
            else {
                false_variants.push(div_answer);
            }

            const span = document.createElement("span");

            span.className = "num";

            span.innerText = String.fromCharCode(65 + j) + ")";

            const p = document.createElement("p");

            p.innerHTML = "&nbsp;" + json.questions[i].variants[j].text;

            div_answer.appendChild(span);

            div_answer.appendChild(p);

            div_data.appendChild(div_answer);


        }

        if (true_variant) {
            true_variant.onclick = () => {

                true_variant.style.backgroundColor = "#0c0";
                indicator.style.backgroundColor = "#0c0";
                true_answers++;
                false_variants.forEach(element => {
                    element.onclick = () => { };
                });
            }

        }

        false_variants.forEach(element => {
            element.onclick = () => {

                wrong_answers++;

                element.style.backgroundColor = "#f36";
                if (true_variant) {
                    
                    true_variant.style.backgroundColor = "#0c0";
                }
                indicator.style.backgroundColor = "#f36";

                false_variants.forEach(element => {
                    element.onclick = () => { };
                });


            }
        })







        div.appendChild(div_data);
        questions_table.appendChild(div);

        
        document.getElementById("indicator_bar").appendChild(indicator)

    }
}


document.body.onload = home;





const questions_table2 = document.getElementById("nav-profile");


async function profile() {
    document.querySelector("#modal").style.top = '-100vh';  
    let true_answers  = 0;
    let wrong_answers = 0;
    document.getElementById("indicator_bar").innerHTML = "";
    clearInterval(home_interval);
    clearInterval(profile_interval);
    clearInterval(contact_interval);
    document.querySelector('#timer').innerHTML = '-40:00';





    function showmodal() 
    {
        clearInterval(home_interval);
    clearInterval(profile_interval);
    clearInterval(contact_interval);
        document.querySelector("#true_answers").textContent = "To'g'ri: " + true_answers;
           document.querySelector("#wrong_answers").textContent = "Xato: " + wrong_answers;
           document.querySelector("#modal").style.top = '0';    
    }
    questions_table2.innerHTML = "";
    let profile_current_time = 2400;
    let y;
    profile_interval = setInterval(() => {
        profile_current_time -= 0.5;
        let m = Math.floor(profile_current_time / 60);
        let s = Math.floor(profile_current_time % 60);
        y = !y;
        document.querySelector('#timer').innerHTML = `-${m < 10 ? `0${m}` : m}${y ? ":" : " "}${s < 10 ? `0${s}`:s}`;
        if (profile_current_time <= 0){
            /*
                <div class="modal_window">
            <div class="modal__info">
                <h3>Natija:</h3>
                <span>To'gri : 45</span> <br>
                <span>Xato : 45</span> <br>
                <button class="btn btn-dark">New Test</button>
            </div>
        </div>
            */
        showmodal();
        }
    }, 500);





    


    const data = await fetch(location.href, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": csrftoken
        },
    });

    const json = await data.json();
    let questions = json.questions.slice(0, 20);
    for (let i = 0; i < questions.length; i++) {

        const div = document.createElement("div");

        const indicator = create_radio_btn(i + 1, div);

        div.className = "scp-quizzes-main question ";
        div.id = `question${i}`;

        const div_data = document.createElement("div");

        div_data.className = "scp-quizzes-data";

        const h3 = document.createElement("h3");

        h3.style.display = "flex";




        h3.style.flexDirection = "row";



        h3.innerHTML = `${i + 1}.&nbsp;${questions[i].question}`;

        div_data.appendChild(h3);

        let true_variant;
        let false_variants = [];
        for (let j = 0; j < questions[i].variants.length; j++) {

            const div_answer = document.createElement("div");

            div_answer.className = "answer col-lg-12";

            if (questions[i].variants[j].is_true) {
                true_variant = div_answer;
            }
            else {
                false_variants.push(div_answer);
            }

            const span = document.createElement("span");

            span.className = "num";

            span.innerText = String.fromCharCode(65 + j) + ")";

            const p = document.createElement("p");

            p.innerHTML = "&nbsp;" + questions[i].variants[j].text;

            div_answer.appendChild(span);

            div_answer.appendChild(p);



            div_data.appendChild(div_answer);


        }

        if (true_variant) {
            true_variant.onclick = () => {

                true_variant.style.backgroundColor = "#0c0";
                indicator.style.backgroundColor = "#0c0";
                true_answers++;
                if(document.querySelectorAll(".question").length <= true_answers + wrong_answers){
                    showmodal();
                }
                false_variants.forEach(element => {
                    element.onclick = () => { };
                });
            }

        }

        false_variants.forEach(element => {
            element.onclick = () => {

                wrong_answers++;

                element.style.backgroundColor = "#f36";
                indicator.style.backgroundColor = "#f36";
                if (true_variant) {

                    true_variant.style.backgroundColor = "#0c0";
                }
                if(document.querySelectorAll(".question").length <= true_answers + wrong_answers){
                    showmodal();
                }
                false_variants.forEach(element => {
                    element.onclick = () => { };
                });



            }

        })





        div.appendChild(div_data);
        questions_table2.appendChild(div);

        // clear document.getElementById("indicator_bar")
        document.getElementById("indicator_bar").appendChild(indicator,)



    }





}



// profile()






function create_radio_btn(index, question) {

    const div = document.createElement("div");

    div.className = "radiobtn";
    div.id = `radiobtn${index}`;
    div.classList.add('mx-1');
    div.classList.add('indicator2')

    const input = document.createElement("input");

    input.type = "radio";

    input.id = `radio${index}`;

    input.name = "radio";

    input.value = index;

    const label = document.createElement("label");

    label.for = `radio${index}`;

    label.innerText = index;

    div.appendChild(input);

    div.appendChild(label);

    div.onclick = () => {

        // document.scrollTo(
        //     question.offsetLeft,
        //     question.offsetTop - 100
        // )
        // console.log(document.scrollTop, question.offsetTop - 100)
        document.body.parentElement.scrollTo(0, question.offsetTop - 100);
    }

    return div;

}


const questions_table3 = document.getElementById("nav-contact");





async function contact() {
    clearInterval(profile_interval);
    clearInterval(home_interval);
    clearInterval(contact_interval);
    document.querySelector('#timer').innerHTML = "00:00";
    let true_answers = 0;
    let wrong_answers = 0;
    questions_table3.innerHTML = "";



    let contact_current_time = 0;
    let y;
    contact_interval = setInterval(() => {
        contact_current_time += 0.5;
        let m = Math.floor(contact_current_time / 60);
        let s = Math.floor(contact_current_time % 60);
        y = !y;
        document.querySelector('#timer').innerHTML = `${m < 10 ? `0${m}` : m}${y ? ":" : " "}${s < 10 ? `0${s}`:s}`;
        if (contact_current_time <= 0){

        }
    }, 500);

    document.getElementById("indicator_bar").innerHTML = "";

    const data = await fetch(location.href, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": csrftoken
        },
    });

    const json = await data.json();
    for (let i = 0; i < json.questions.length; i++) {

        const div = document.createElement("div");
        const indicator = create_radio_btn(i + 1, div);
        div.dataset['i'] = i;

        div.className = "scp-quizzes-main contact-question";
        console.log(div)
        // div.classList.add('');

        const div_data = document.createElement("div");

        div_data.className = "scp-quizzes-data";

        const h3 = document.createElement("h3");

        h3.style.display = "flex";

        h3.style.flexDirection = "row";


        h3.innerHTML = `${i + 1}.&nbsp;${json.questions[i].question}`;

        div_data.appendChild(h3);

        let true_variant;
        let false_variants = [];

        for (let j = 0; j < json.questions[i].variants.length; j++) {

            const div_answer = document.createElement("div");

            div_answer.className = "answer col-lg-12";

            // if (json.questions[i].variants[j].is_true) {
            //     true_variant = div_answer;
            // }
            // else {
            //     false_variants.push(div_answer);
            // }
            div_answer.style.backgroundColor = json.questions[i].variants[j].is_true ? "#0c0" : ""
            console.log(div_answer);
            const span = document.createElement("span");

            span.className = "num";

            span.innerText = String.fromCharCode(65 + j) + ")";

            const p = document.createElement("p");

            p.innerHTML = "&nbsp;" + json.questions[i].variants[j].text;

            div_answer.appendChild(span);

            div_answer.appendChild(p);

            div_data.appendChild(div_answer);


        }

        // if (true_variant) {
        //     true_variant.onclick = () => {

        //         true_variant.style.backgroundColor = "#0c0";
        //         indicator.style.backgroundColor = "#0c0";
        //         true_answers++;
        //         false_variants.forEach(element => {
        //             console.log(element);
        //             element.onclick = () => { };
        //         });
        //     }

        // }

        // false_variants.forEach(element => {
        //     element.onclick = () => {

        //         wrong_answers++;

        //         element.style.backgroundColor = "#f36";
        //         if (true_variant) {
                    
        //             true_variant.style.backgroundColor = "#0c0";
        //         }
        //         indicator.style.backgroundColor = "#f36";

        //         false_variants.forEach(element => {
        //             element.onclick = () => { };
        //         });


        //     }
        // })







        div.appendChild(div_data);
        questions_table3.appendChild(div);

         
        document.getElementById("indicator_bar").appendChild(indicator)

    }


}

const input = document.querySelector('.form-control')
console.log(input);
input.addEventListener('keyup', async (e)=>{
    // const data = await fetch("/questions", {
    //     method: "POST",
    //     headers: {
    //         "Content-Type": "application/json",
    //         "X-CSRFToken": csrftoken
    //     },
    // });
    // let questions = await data.json();

    let a =  questions_table3.querySelectorAll('.contact-question');
    let b = [];
    a.forEach(element => {
        var filter = lotinga(input.value.toLowerCase());
        let content = element.textContent;
        if (content.indexOf(filter) == -1) {
            element.style.display = 'none'; 
          } else {
            b.push(element.dataset.i);
            element.style.display = '';
        }
        console.log(a);
    });



    

})