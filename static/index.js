const contactBtms = document.querySelectorAll(".contact-btm");
const contactForm = document.querySelector(".popUp");
const submitBtmForm = document.querySelector(".form-btn");
const formFirstName = document.querySelector("#f_name");
const formLastName = document.querySelector("#l_name");
const formEmail = document.querySelector("#email");
const mobile = document.querySelector("#phone");
const submitbtm = document.querySelector("#submit");
const inputText = document.querySelector("#input_text");

function cleaner(formFirstName, formLastName, formEmail, mobile, inputText) {
  formFirstName.value = "";
  formLastName.value = "";
  formEmail.value = "";
  mobile.value = "";
  inputText.value = "";
  formFirstName.textContent = "First name";
  formLastName.textContent = "Last name";
  formEmail.textContent = "Email";
  mobile.textContent = "Phone";
  inputText.textContent = "Text";
  // formFirstName.style.color = "#6a6c6b";
  // formLastName.style.color = "#6a6c6b";
  // formEmail.style.color = "#6a6c6b";
  // mobile.style.color = "#6a6c6b";
  // inputText.style.color = "#6a6c6b";
}

const checkName = (event) => {
  event.target.value = event.target.value.replace(/[^a-z ]/gi, "");
};

mobile.addEventListener("input", (event) => {
  event.target.value = event.target.value.replace(/[^0-9()\-]/gi, "");
});
formFirstName.addEventListener("input", checkName);

formLastName.addEventListener("input", checkName);

const validState = {
  mobile: false,
  email: false,
  fName: false,
  lName: false,
  // text: false,
};

const openForm = () => {
  contactForm.style.display = "block";
};

for (i = 0; i < contactBtms.length; i++) {
  contactBtms[i].addEventListener("click", openForm);
}

contactForm.addEventListener("click", (event) => {
  let target = event.target;

  if (target.classList.contains("popup-close")) {
    contactForm.style.display = "none";
    cleaner(formFirstName, formLastName, formEmail, mobile, inputText);
  } else {
    target = target.closest(".popUp-content");

    if (!target) {
      contactForm.style.display = "none";
      cleaner(formFirstName, formLastName, formEmail, mobile, inputText);
    }
  }
});

// lables of form
let output = "";
const inpuPhoneError = document.querySelector(".phone-error");
const errorInputError = document.querySelector(".name-error");
const firstNameError = document.querySelector(".fist-name-error");
const lastNameError = document.querySelector(".last-name-error");
const textError = document.querySelector(".input_text-error");

function formLabels(input, text, color) {
  input.textContent = text;
  input.style.color = color;
}

function validMail() {
  const re = /^[\w-\.]+@[\w-]+\.[a-z]{2,4}$/i;
  const myMail = formEmail.value;
  const valid = re.test(myMail);

  if (valid) {
    formLabels(errorInputError, "Email", "green");
    validState.email = true;
  } else {
    formLabels(
      errorInputError,
      "The email address was entered incorrectly!",
      "red"
    );
    validState.email = false;
  }
  return valid;
}

function validPhone() {
  const re = /^\d[\d\(\)\ -]{8}\d$/;
  const myPhone = mobile.value;
  const valid = re.test(myPhone);
  console.log(valid);

  if (valid) {
    formLabels(inpuPhoneError, "Phone", "green");
    validState.mobile = true;
  } else {
    formLabels(
      inpuPhoneError,
      "The phone number was entered incorrectly! Ex.:1234567890",
      "red"
    );
    validState.mobile = false;
  }
  return valid;
}

function validText() {
  let valid = inputText.value;
  if (valid) {
    formLabels(textError, "Text", "green");
    validState.text = true;
  } else {
    formLabels(textError, "Enter text", "red");
    validState.text = false;
  }
  return valid;
}

function validFname() {
  let valid = formFirstName.value;
  if (valid) {
    formLabels(firstNameError, "First name", "green");
    validState.fName = true;
  } else {
    formLabels(firstNameError, "Enter text", "red");
    validState.fName = false;
  }
  return valid;
}

function validLname() {
  let valid = formLastName.value;
  if (valid) {
    formLabels(lastNameError, "Last name", "green");
    validState.lName = true;
  } else {
    formLabels(lastNameError, "Enter text", "red");
    validState.lName = false;
  }
  return valid;
}

formEmail.addEventListener("blur", validMail);
mobile.addEventListener("blur", validPhone);
formFirstName.addEventListener("blur", validFname);
formLastName.addEventListener("blur", validLname);
inputText.addEventListener("blur", validText);

function submit(event) {
  event.preventDefault();

  validPhone();
  validMail();
  // validText();
  validFname();
  validLname();

  let valids = Object.values(validState);

  const isValid = !valids.some((val) => val === false);

  const client = {
    firstName: formFirstName.value,
    fastName: formLastName.value,
    email: formEmail.value,
    mobile: mobile.value,
    inputText: inputText.value,
  };


  const apiUrl = location.protocol  + '//' + location.hostname + ':3000/api/send-mail';

  console.log(apiUrl)

  if (isValid === true) {
    fetch(apiUrl, {
      method: "POST",
      body: JSON.stringify(client),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.status >= 400 && response.status < 600) {
          throw new Error("Bad response from server");
        }
        return response.json();
      })
      .then((returnedResponse) => {
        contactForm.style.display = "none";
        cleaner(formFirstName, formLastName, formEmail, mobile, inputText);
        alert("Email was send!");
      })
      .catch((error) => {
        alert("Error" + " " + error);
        console.log(error);
      });
  }
}

submitbtm.addEventListener("click", submit);

///

let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides((slideIndex += n));
}

function currentSlide(n) {
  showSlides((slideIndex = n));
}

function showSlides(n) {
  let i;
  const slides = document.getElementsByClassName("mySlides");
  const dots = document.getElementsByClassName("dot");
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
}

///

const overviewBtm = document.querySelector("#overview"),
  factBtm = document.querySelector("#facts"),
  nearbyHouseBtm = document.querySelector("#nearby-house"),
  overviewSlide = document.querySelector("#overview_slide"),
  factsSlide = document.querySelector("#facts_slide"),
  nearbyHouseSlide = document.querySelector("#nearby-house_slide");

const confic = {
  overview: overviewSlide,
  facts: factsSlide,
  "nearby-house": nearbyHouseSlide,
};

function showInfoAboutHouse(event) {
  let slideId = event.target.getAttribute("id");
  const slideToShow = confic[slideId];
  overviewSlide.style.display = "none";
  factsSlide.style.display = "none";
  nearbyHouseSlide.style.display = "none";

  slideToShow.style.display = "block";
}

overviewBtm.addEventListener("click", showInfoAboutHouse);
factBtm.addEventListener("click", showInfoAboutHouse);
nearbyHouseBtm.addEventListener("click", showInfoAboutHouse);

const menu = () => {
  const menuBtm = document.querySelector(".menuAtMobal");
  const menuPopUp = document.querySelector(".active-menu");
  const menuClosedBtm = document.querySelector(".close-btn_menu");
  const menuBtms = document.querySelectorAll(".menu");

  function openMenu() {
    menuPopUp.style.display = "block";
  }

  function closedMenu() {
    menuPopUp.style.display = "none";
  }

  menuBtm.addEventListener("click", openMenu);
  menuClosedBtm.addEventListener("click", closedMenu);

  for (i = 0; i < menuBtms.length; i++) {
    menuBtms[i].addEventListener("click", closedMenu);
  }
};

menu();
