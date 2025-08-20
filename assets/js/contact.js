document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");

  const email = document.getElementById("Email");
  const phone = document.getElementById("phoneNumber");
  const prebuilt = document.getElementById("prebuilt");
  const delivery = document.getElementById("delivery");
  const storePickup = document.getElementById("storePickup");
  const addressContainer = document.getElementById("addressContainer");
  const address = document.getElementById("address");
  const paymentContainer = document.getElementById("paymentContainer");

  const emailError = document.getElementById("emailError");
  const phoneError = document.getElementById("phoneError");
  const pcError = document.getElementById("pcError");
  const acquireError = document.getElementById("acquireError");
  const addressError = document.getElementById("addressError");
  const paymentError = document.getElementById("paymentError");

  document.querySelectorAll("input[name='acquirementMethod']").forEach(radio => {
    radio.addEventListener("change", () => {
      if (delivery.checked) {
        addressContainer.classList.remove("d-none");
        paymentContainer.classList.remove("d-none");
      } else {
        addressContainer.classList.add("d-none");
        paymentContainer.classList.add("d-none");
      }

      if (delivery.checked || storePickup.checked) {
        acquireError.classList.add("d-none");
        acquireError.innerText = "";
      }
    });
  });

  const emailRegex = /^[a-zA-Z0-9._%+-]+@(gmail\.com|yahoo\.com|outlook\.com|hotmail\.com)$/;
  const phoneRegex = /^(06[0-9]\d{6,7}|\+3816[0-9]\d{6,7})$/;


  email.addEventListener("input", () => {
    if (emailRegex.test(email.value.trim())) {
      email.classList.remove("is-invalid");
      emailError.classList.add("d-none");
      emailError.innerText = "";
    }
  });

  phone.addEventListener("input", () => {
    if (phoneRegex.test(phone.value.trim())) {
      phone.classList.remove("is-invalid");
      phoneError.classList.add("d-none");
      phoneError.innerText = "";
    }
  });

  prebuilt.addEventListener("change", () => {
    if (prebuilt.value !== "0") {
      prebuilt.classList.remove("is-invalid");
      pcError.classList.add("d-none");
      pcError.innerText = "";
    }
  });

  address.addEventListener("input", () => {
    if (address.value.trim().length >= 20) {
      address.classList.remove("is-invalid");
      addressError.classList.add("d-none");
      addressError.innerText = "";
    }
  });

  document.querySelectorAll("input[name='paymentMethod']").forEach(radio => {
    radio.addEventListener("change", () => {
      paymentError.classList.add("d-none");
      paymentError.innerText = "";
    });
  });


  form.addEventListener("submit", e => {
    e.preventDefault();
    let valid = true;


    [emailError, phoneError, pcError, acquireError, addressError, paymentError].forEach(el => {
      el.classList.add("d-none");
      el.innerText = "";
    });

    [email, phone, prebuilt, address].forEach(el => el.classList.remove("is-invalid"));

    if (!emailRegex.test(email.value.trim())) {
      emailError.innerText = "Enter a valid email (gmail, yahoo, outlook, hotmail).";
      emailError.classList.remove("d-none");
      email.classList.add("is-invalid");
      valid = false;
    }

    if (!phoneRegex.test(phone.value.trim())) {
      phoneError.innerText = "Enter a valid phone number (06x... or +3816x...).";
      phoneError.classList.remove("d-none");
      phone.classList.add("is-invalid");
      valid = false;
    }

    if (prebuilt.value === "0") {
      pcError.innerText = "Please select a PC option.";
      pcError.classList.remove("d-none");
      prebuilt.classList.add("is-invalid");
      valid = false;
    }

    if (!delivery.checked && !storePickup.checked) {
      acquireError.innerText = "Please select a method of acquiring your PC.";
      acquireError.classList.remove("d-none");
      valid = false;
    }

    if (delivery.checked) {
      if (address.value.trim().length < 20) {
        addressError.innerText = "Please enter a valid address.";
        addressError.classList.remove("d-none");
        address.classList.add("is-invalid");
        valid = false;
      }

      const paymentChecked = document.querySelector("input[name='paymentMethod']:checked");
      if (!paymentChecked) {
        paymentError.innerText = "Please select a payment method.";
        paymentError.classList.remove("d-none");
        valid = false;
      }
    }

    if (valid) {
      form.reset();
      addressContainer.classList.add("d-none");
      paymentContainer.classList.add("d-none");
    }
  });
});
