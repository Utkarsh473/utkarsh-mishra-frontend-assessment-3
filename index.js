// Set timer of 60 seconds
let timeDisplay = document.querySelector('.time');

let inputTextArea = document.querySelector('.input-text');

let textToBeTyped = document.querySelector('.practice-text');

let initialText = document.querySelector('.initial-text');

let errorDisplay = document.querySelector('.error-disp');

let accuracyDisplay = document.querySelector('.accuracy-disp');

let button = document.querySelector('.restart-button')

let errorCount = 0;

let timer=60;

let charIndexToBeChecked = 0;

let stringEntered = '';

let st = textToBeTyped.innerText;

let highlightString = '';

const displayTimer = function(){
    setInterval(reduceTime, 1000);
    timeDisplay.innerText = `${timer}s`;
}

function reduceTime(){
    if(timer!=0)
    {
        timer--;
    }
    timeDisplay.innerText = `${timer}s`;
}



// begin typing 

/* On clicking the practice text area:

1. start 60 seconds timer

2. display dummy text

3. store text entered to check against dummy text.

4. display number of errors.

5. check accuracy.

*/

inputTextArea.addEventListener('click', () => {
    
    // 1. start 60 seconds timer
    displayTimer();

    // 2. display dummy text
    textToBeTyped.classList.remove('d-none');
    initialText.classList.add('d-none');

    //3. store text entered to check against dummy text.
    //4. display number of errors.
    //5. check accuracy
    takeInput();

    

})

const checkChar = function(ch)
{
    let str = textToBeTyped.innerText;
    if(ch!=str[charIndexToBeChecked])
    {
        charIndexToBeChecked++;
        return false;
    }

    else{
        charIndexToBeChecked++;
        return true;
    }
}

const showErrors = function(){
    errorDisplay.innerText = errorCount;

}

function calcAccuracy()
{
    let correctCharCount = stringEntered.length - errorCount;
    let totalChar = stringEntered.length;

    return (correctCharCount/totalChar*100);
}

const takeInput = function()
{
    inputTextArea.addEventListener('keypress', ()=>{
        // 3. store text entered to check against dummy text.
        if(this.event.key!=='Enter')
        {
            let ch = this.event.key;
            stringEntered+= ch;
            // console.log(this.event.key);

            var isEqual = checkChar(ch);


            if(isEqual===false)
            {
               /* inputTextArea.value = stringEntered;
               console.log(inputTextArea.value);*/
               errorCount++;

                let c = st.charAt(charIndexToBeChecked -1);

                highlightString+= `<span class="highlight-red">${c}</span>`;

                console.log(highlightString);

                textToBeTyped.innerHTML = `${highlightString}${st.substring(charIndexToBeChecked,st.length)}`;
            }

            else{

                let c = st.charAt(charIndexToBeChecked -1);

                highlightString+= `<span class="highlight-green">${c}</span>`;

                console.log(highlightString);

                textToBeTyped.innerHTML = `${highlightString}${st.substring(charIndexToBeChecked,st.length)}`;

            }

            showErrors();

            let accuracy = Math.round(calcAccuracy());
            accuracyDisplay.innerText = accuracy;
        }

        if(this.event.key==='Enter')
        {
            // console.log(stringEntered);
        }   
    });
}

button.onclick = function(){
    window.location.reload();
}




