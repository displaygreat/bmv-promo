const server = "https://jsonplaceholder.typicode.com/posts";

const sendData = (data, callback, falseCallback) => {
  const request = new XMLHttpRequest();
  request.open("POST", server);

  request.addEventListener("readystatechange", () => {
    if (request.readyState !== 4) return;
    if (request.status === 200 || request.status === 201) {
      const response = JSON.parse(request.responseText);
      callback(response.id);
    } else {
      falseCallback(request.status);
      throw new Error(request.status);
    }
  });

  request.send(data);
};

const formHandler = (form) => {
  const smallElem = document.createElement("small");
  form.append(smallElem);
  let flag = true;
  const buttonSubmit = form.querySelectorAll('.button[type="submit"]');
  console.log(buttonSubmit);

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = {};

    for (const elem of form.elements) {
      const { name, value } = elem;
      if (name) {
        if (value.trim()) {
          elem.style.border = "";
          data[name] = value;
        } else {
          elem.style.cssText = `border-bottom: 2px solid red; padding-bottom: 9px;`;
          flag = false;
          setTimeout(() => {
            elem.style.borderBottom = "";
            flag = true;
          }, 2000);
        }
      }
    }

    if (!flag) {
      smallElem.textContent = "Заполните все поля";
      buttonSubmit.forEach((button) => (button.disabled = true));
      setTimeout(() => {
        smallElem.textContent = "";
        buttonSubmit.forEach((button) => (button.disabled = false));
      }, 2000);
      return;
    }

    sendData(
      JSON.stringify(data),
      (id) => {
        smallElem.innerHTML =
          "Ваша заявка №" + id + "!<br>В ближайшее время мы с вами свяжемся";
        smallElem.style.color = "green";
        buttonSubmit.forEach((button) => (button.disabled = true));

        console.log(data);

        setTimeout(() => {
          smallElem.innerHTML = "";
          buttonSubmit.forEach((button) => (button.disabled = false));
        }, 5000);
      },
      (error) => {
        smallElem.innerHTML =
          "К сожалению произошли технические неполадки.<br>Попробуйте отправить заявку позже";
        smallElem.style.color = "red";
        form.append(smallElem);
        console.log("error: ", error);
      }
    );
    form.reset();
  });
};

export default function sendForm() {
  const formElems = document.querySelectorAll(".form");
  formElems.forEach(formHandler);
}
