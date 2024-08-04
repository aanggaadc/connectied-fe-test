const header = document.querySelector(".header");
const navbarLinks = document.querySelectorAll(".navbar-link");
const daysElement = document.getElementById("days");
const hoursElement = document.getElementById("hours");
const minutesElement = document.getElementById("minutes");
const secondsElement = document.getElementById("seconds");
const modal = document.getElementById("videoModal");
const btnPlay = document.querySelector(".btn-play");
const btnClose = document.getElementsByClassName("btn-close")[0];
const youtubeVideo = document.getElementById("youtubeVideo");
const rsvpForm = document.querySelector(".rsvp-form");
const messageForm = document.querySelector(".message-form");

function countdown(targetDate) {
  const target = new Date(targetDate).getTime();

  const interval = setInterval(() => {
    const now = new Date().getTime();
    const distance = target - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    daysElement.innerHTML = `<span>${days}</span> Days`;
    hoursElement.innerHTML = `<span>${hours}</span> Hours"`;
    minutesElement.innerHTML = `<span>${minutes}</span> Minutes`;
    secondsElement.innerHTML = `<span>${seconds}</span> Seconds`;

    if (distance < 0) {
      clearInterval(interval);
      daysElement.innerHTML = "EXPIRED";
      hoursElement.innerHTML = "EXPIRED";
      minutesElement.innerHTML = "EXPIRED";
      secondsElement.innerHTML = "EXPIRED";
    }
  }, 1000);
}

function copyAccountNumber(value) {
  navigator.clipboard
    .writeText(value)
    .then(function () {
      alert("Nomor rekening berhasil disalin!");
    })
    .catch(function (error) {
      alert("Gagal menyalin nomor rekening:", error);
    });
}

window.addEventListener("scroll", function () {
  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

navbarLinks.forEach((link) => {
  link.addEventListener("click", function (event) {
    event.preventDefault();

    const targetId = this.getAttribute("href").substring(1);
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      const targetPosition = targetElement.offsetTop;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  });
});

btnPlay.addEventListener("click", function () {
  const videoUrl = "https://www.youtube.com/embed/BkMY-fPaJs4";
  youtubeVideo.src = videoUrl;
  modal.style.display = "flex";
});

btnClose.onclick = function () {
  modal.style.display = "none";
  youtubeVideo.src = "";
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
    youtubeVideo.src = "";
  }
};

rsvpForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const attendance = document.querySelector(
    'input[name="attendance"]:checked'
  ).value;
  const locationAttending = document.querySelector(
    'input[name="location_attending"]:checked'
  ).value;
  const numberAttending = document.querySelector(
    'select[name="number_attending"]'
  ).value;

  const message = `
      Success RSVP! data:
      Attendance: ${attendance}
      Location Attending: ${locationAttending}
      Number Attending: ${numberAttending}
  `;

  alert(message);
});

messageForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const messageInput = document.querySelector(".message-input").value;
  const messageTextarea = document.querySelector(".message-textarea").value;
  const fileUpload = document.querySelector("#file-upload").files[0];

  let fileName = "No file uploaded";
  if (fileUpload) {
    fileName = fileUpload.name;
  }

  const message = `
          Success Send Message! data:
          Message Input: ${messageInput}
          Message Textarea: ${messageTextarea}
          File Uploaded: ${fileName}
      `;

  alert(message);
});

const targetDate = "Aug 10, 2024 00:00:00";
countdown(targetDate);
