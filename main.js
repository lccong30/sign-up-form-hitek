const listInput = document.querySelectorAll(".contact-input");
const contactForm = document.querySelector(".contact-form");

const urlParams = new URLSearchParams(window.location.search);
const webId = urlParams.get("web_id");

function showError(input, msg) {
  input.parentElement.querySelector("span").innerHTML = msg || "Không hợp lệ";
}

// Handle when input validate
function isValidateInput(input) {
  input.parentElement.querySelector("span").innerHTML = "";
}

//Check empty input
function checkInput() {
  let isError = false;
  listInput.forEach((input) => {
    input.value = input.value.trim();
    if (!input.value) {
      isError = true;
      showError(input, "Không được để trống!");
    } else {
      isValidateInput(input);
    }
  });
  return isError;
}

function validateEmail(input) {
  let isError = false;
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (input.value === "") {
    showError(input, "Không được để trống!");
  } else if (!re.test(input.value)) {
    isError = true;
    showError(input, "Email không hợp lệ!");
  } else {
    isValidateInput(input);
  }
  return isError;
}

// Reset input after submit
const handleReset = () => {
  listInput.forEach((inp) => {
    inp.value = "";
  });
  document.querySelector(".contact-input-note").value = "";
};

const handleNotify = (msg, warning) => {
  const a = document.querySelector(".notify__container");
  const tosify = document.querySelector("#notify");

  tosify.classList.remove("active");
  tosify.classList.remove("hidden");
  tosify.classList.remove("warning");

  a.innerHTML = `${msg}`;
  warning
    ? tosify.classList.add("active", "warning")
    : tosify.classList.add("active");

  setTimeout(() => {
    tosify.classList.add("hidden");
  }, 2000);
};
const handleSubmit = async (e) => {
  e.preventDefault();

  const input_name = document.querySelector(".contact-input-name");
  const input_phone = document.querySelector(".contact-input-phone");
  const input_email = document.querySelector(".contact-input-email");
  const input_note = document.querySelector(".contact-input-note");
  const tosify = document.querySelector("#notify");

  const btnSubmit = document.querySelector("#sumit-form");

  let isEmpty = checkInput();
  let isEmailInValid = validateEmail(input_email);
  if (!isEmpty && !isEmailInValid) {
    btnSubmit.value = "Đang gửi...";
    const payload = {
      siteId: webId || "lalaa",
      name: input_name.value,
      email: input_email.value,
      phone: input_phone.value,
      note: input_note.value,
    };

    await axios
      .post("https://localhost:7148/api/Subscribers", {
        siteId: "string 15",
        name: "string ",
        email: "user4@example.com",
        phone: "string4",
        note: "string4",
      })
      .then(async function (response) {
        // await console.log(response);
        handleReset();
        handleNotify(`! Đăng ký thành công`, false);
        btnSubmit.value = "Đã lưu";
        setTimeout(() => {
          btnSubmit.value = "Gửi";
        }, 2000);
      })
      .catch(async function (error) {
        // console.log(error.response.data.msg);
        await handleNotify(`! ${"Error something"}`, true);
        btnSubmit.value = "Gửi";
      });
  } else {
    console.log("Missing input");
  }
};

document.getElementById("sumit-form").addEventListener("click", handleSubmit);
