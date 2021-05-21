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

const formElems = document.querySelectorAll(".form");
const formHandler = (form) => {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = {};

    for (const { name, value } of form.elements) {
      if (name) {
        data[name] = value;
      }
    }
    sendData(
      JSON.stringify(data),
      (id) => {
        alert("Ваша заявка №" + id + "!\nВ ближайшее время мы с вами свяжемся");
        console.log(data);
      },
      (error) => {
        alert(
          "К сожалению произошли технические неполадки. Попробуйте отправить заявку позже"
        );
        console.log("error: ", error);
      }
    );
    form.reset();
  });
};

formElems.forEach(formHandler);
