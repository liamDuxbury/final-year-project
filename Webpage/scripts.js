menuToggler.addEventListener('click', ev => {
    menu.classList.toggle('open');
  });

myCount = 0;

function greetMe() {
    document.getElementById("myTrigger").textContent = myCount;
    myCount++;
}

myTrigger.addEventListener("click", greetMe);
