const server = "https://jsonplaceholder.typicode.com/posts";
const submitButton = document.querySelector(".form__button");

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

const formElems = document.querySelectorAll(".form");
const formHandler = (form) => {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = {};

    const smallElem = document.createElement("small");

    for (const { name, value, classList } of form.elements) {
      console.log(value);
      if (name) {
        data[name] = value;
      }
      if (
        (classList.contains("input") && value === "") ||
        (classList.contains("input") && !/\S/.test(value))
      ) {
        console.log(/\S/.test(value));
        smallElem.innerHTML = "Все поля должны быть заполнены!";
        form.append(smallElem);
        smallElem.style.color = "red";
        return;
      }
    }

    sendData(
      JSON.stringify(data),
      (id) => {
        smallElem.innerHTML =
          "Ваша заявка №" + id + "!<br>В ближайшее время мы с вами свяжемся";
        smallElem.style.color = "green";
        form.append(smallElem);
        submitButton.disabled = true;

        console.log(data);
        setTimeout(() => {
          smallElem.innerHTML = "";
          submitButton.disabled = false;
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

formElems.forEach(formHandler);
