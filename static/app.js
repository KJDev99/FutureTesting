window.addEventListener("load", function () {
  var agent = false;
  function showTime() {
    var date = new Date();
    var h = 23 - date.getHours(); // 0 - 23
    var m = 59 - date.getMinutes(); // 0 - 59
    var s = 59 - date.getSeconds(); // 0 - 59

    !agent ? (agent = true) : (agent = false);

    h = h < 10 ? "0" + h : h;
    m = m < 10 ? "0" + m : m;
    s = s < 10 ? "0" + s : s;

    // var time = '-' + h + ":" + m + ":" + s;
    var time = `-${h}${agent ? " " : ":"}${m}${agent ? " " : ":"}${s}`;
    document.getElementById("MyClockDisplay").innerText = time;
    document.getElementById("MyClockDisplay").textContent = time;

    setTimeout(showTime, 500);
  }

  showTime();
  const input = document.querySelector(".form-control");
  console.log(input);

  input.addEventListener("keyup", async (e) => {
    console.log(input.value)
    let a = document.querySelectorAll('.subject');

    let b = [];
    a.forEach((element) => {
      var filter = lotinga(input.value.toLowerCase());
      console.log(element.textContent)
      let content = element.textContent;

      if (content.toLocaleLowerCase().indexOf(filter.toLocaleLowerCase()) == -1) {
        element.style.display = "none";
      } else {
        b.push(element.dataset.i);
        element.style.display = "";
      }


    });

  });

});
