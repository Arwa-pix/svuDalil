// index category filter

const buttons = document.querySelectorAll(".category-btn");

const events = document.querySelectorAll(".event-card-item");

buttons.forEach(function (button) {
  button.addEventListener("click", function () {
    buttons.forEach(function (item) {
      item.classList.remove("active");
    });

    button.classList.add("active");

    const category = button.getAttribute("data-category");

    events.forEach(function (event) {
      const eventCategory = event.getAttribute("data-category");

      if (category === "all" || category === eventCategory) {
        event.classList.remove("d-none");
      } else {
        event.classList.add("d-none");
      }
    });
  });
});

// events filtering

const searchInput = document.getElementById("searchInput");

const dateFilter = document.getElementById("dateFilter");

const governorateFilter = document.getElementById("governorateFilter");

const categoryFilter = document.getElementById("categoryFilter");

const resetFilters = document.getElementById("resetFilters");

const eventItems = document.querySelectorAll(".event-item");

const noEvents = document.getElementById("noEvents");

if (eventItems.length > 0) {
  function filterEvents() {
    const searchText = searchInput.value.trim().toLowerCase();

    const selectedDate = dateFilter.value;

    const selectedGovernorate = governorateFilter.value;

    const selectedCategory = categoryFilter.value;

    let visibleEvents = 0;

    eventItems.forEach(function (event) {
      const title = event.getAttribute("data-title").toLowerCase();

      const date = event.getAttribute("data-date");

      const governorate = event.getAttribute("data-governorate");

      const category = event.getAttribute("data-category");

      const matchesSearch = title.includes(searchText);

      const matchesDate = selectedDate === "" || date === selectedDate;

      const matchesGovernorate =
        selectedGovernorate === "all" || governorate === selectedGovernorate;

      const matchesCategory =
        selectedCategory === "all" || category === selectedCategory;

      if (
        matchesSearch &&
        matchesDate &&
        matchesGovernorate &&
        matchesCategory
      ) {
        event.classList.remove("d-none");

        visibleEvents++;
      } else {
        event.classList.add("d-none");
      }
    });

    if (visibleEvents === 0) {
      noEvents.classList.remove("d-none");
    } else {
      noEvents.classList.add("d-none");
    }
  }

  if (searchInput) {
    searchInput.addEventListener("input", filterEvents);
  }

  if (dateFilter) {
    dateFilter.addEventListener("change", filterEvents);
  }

  if (governorateFilter) {
    governorateFilter.addEventListener("change", filterEvents);
  }

  if (categoryFilter) {
    categoryFilter.addEventListener("change", filterEvents);
  }

  if (resetFilters) {
    resetFilters.addEventListener("click", function () {
      searchInput.value = "";

      dateFilter.value = "";

      governorateFilter.value = "all";

      categoryFilter.value = "all";

      filterEvents();
    });
  }
}

// event page
const eventBlocks = document.querySelectorAll(".event-details");

const eventNotFound = document.getElementById("event-not-found");

if (eventBlocks.length > 0) {
  const urlParams = new URLSearchParams(window.location.search);

  const eventId = urlParams.get("id");

  eventBlocks.forEach(function (event) {
    event.style.display = "none";
  });

  const selectedEvent = document.getElementById("event-" + eventId);

  if (selectedEvent) {
    selectedEvent.style.display = "block";
  } else if (eventNotFound) {
    eventNotFound.style.display = "block";
  }
}

// contact form
const contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const phone = document.getElementById("phone").value.trim();

    const phonePattern = /^[0-9]{10}$/;

    if (!phonePattern.test(phone)) {
      alert(
        "فشل الإرسال: يرجى إدخال رقم هاتف صحيح مكون من 10 أرقام",
      );

      return;
    }

    alert("تم إرسال طلبك بنجاح");

    contactForm.reset();
  });
}

// scroll to top

const scrollTop = document.getElementById("scrollTop");

if (scrollTop) {
  window.addEventListener("scroll", function () {
    if (window.scrollY > 300) {
      scrollTop.style.display = "flex";
    } else {
      scrollTop.style.display = "none";
    }
  });

  scrollTop.addEventListener("click", function () {
    window.scrollTo({
      top: 0,

      behavior: "smooth",
    });
  });
}
