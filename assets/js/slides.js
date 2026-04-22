document.addEventListener("DOMContentLoaded", () => {
  const slides = Array.from(document.querySelectorAll(".slide"));
  const total = slides.length;
  let current = 0;
  let revIdx = {};

  const totEl = document.getElementById("tot");
  if (totEl) totEl.textContent = total;

  function getRevs(slide) {
    return Array.from(slide.querySelectorAll(".rev"));
  }

  function revealNext() {
    const slide = slides[current];
    const id = slide.id;
    const revs = getRevs(slide);

    if (!revs.length) return false;
    const idx = revIdx[id] || 0;
    if (idx >= revs.length) return false;

    const el = revs[idx];
    el.classList.add("rev-done");
    revIdx[id] = idx + 1;

    if (el.classList.contains("bar-row")) {
      const fill = el.querySelector(".bar-fill");
      const w = el.dataset.w;
      const label = el.dataset.label;
      if (fill) {
        setTimeout(() => {
          fill.style.width = w + "%";
          fill.classList.add("bar-active");
          fill.textContent = label;
        }, 60);
      }
    }

    if (revIdx[id] >= revs.length) {
      const hint = slide.querySelector(".reveal-hint");
      if (hint) hint.classList.add("done");
    }
    return true;
  }

  function goTo(n) {
    if (n < 0 || n >= total) return;
    slides[current].classList.remove("active");
    slides[current].classList.add("out");
    setTimeout(() => slides[current].classList.remove("out"), 460);
    current = n;
    slides[current].classList.add("active");
    const inner = slides[current].querySelector(".s-inner");
    if (inner) inner.scrollTop = 0;

    const curEl = document.getElementById("cur");
    if (curEl) curEl.textContent = current + 1;

    const progEl = document.getElementById("progress-bar");
    if (progEl) progEl.style.width = ((current + 1) / total) * 100 + "%";
  }

  const advance = () => {
    if (!revealNext()) goTo(current + 1);
  };
  const back = () => goTo(current - 1);

  const btnNext = document.getElementById("btn-next");
  const btnPrev = document.getElementById("btn-prev");
  if (btnNext) btnNext.addEventListener("click", advance);
  if (btnPrev) btnPrev.addEventListener("click", back);

  document.addEventListener("keydown", (e) => {
    if (["ArrowRight", "PageDown", " "].includes(e.key)) {
      e.preventDefault();
      advance();
    }
    if (["ArrowLeft", "PageUp"].includes(e.key)) {
      e.preventDefault();
      back();
    }
  });

  let touchX = null;
  document.addEventListener(
    "touchstart",
    (e) => {
      touchX = e.touches[0].clientX;
    },
    { passive: true },
  );
  document.addEventListener(
    "touchend",
    (e) => {
      if (touchX === null) return;
      const dx = e.changedTouches[0].clientX - touchX;
      if (Math.abs(dx) > 48) dx < 0 ? advance() : back();
      touchX = null;
    },
    { passive: true },
  );

  const progEl = document.getElementById("progress-bar");
  if (progEl) progEl.style.width = (1 / total) * 100 + "%";
});
