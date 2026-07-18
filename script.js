// ---------- dummy work data ----------

const WORKS = [
  {
    id: 1,
    title: "korean totem",
    attr: "Illustration",
    image: "image/heroimages/pic1.png",
    colors: ["#3a3a3a", "#111"],
    concept: "이 시리즈는 지난 3년간 일상에서 마주친 문장들에서 영감을 받아 만든 그래픽 작업입니다. 거리, 책, SNS, 친구와의 대화 속 조각들이 형태가 됩니다. (더미 텍스트)",
    process: "작업은 매번 다르지만, 대개 표현하고자 하는 문장 하나와 그 형태에 대한 러프 스케치에서 시작합니다. (더미 텍스트)",
    details: 4,
  },
  {
    id: 2,
    title: "mog",
    attr: "Data visualization",
    image: "image/heroimages/pic2.png",
    colors: ["#e8794f", "#c14a20"],
    concept: "귤 한 상자 속 조각의 개수를 세어 데이터로 시각화한 프로젝트입니다. (더미 텍스트)",
    process: "데이터 수집 후 반복되는 패턴을 그리드 형태로 재구성했습니다. (더미 텍스트)",
    details: 4,
  },
  {
    id: 3,
    title: "yogi",
    attr: "Publication & Illustration",
    image: "image/heroimages/pic3.png",
    colors: ["#e3d9c6", "#a89c7f"],
    concept: "청년 세대를 위한 선언문을 엮은 출판물 작업입니다. (더미 텍스트)",
    process: "텍스트 편집과 삽화 제작을 병행하며 레이아웃을 구성했습니다. (더미 텍스트)",
    details: 4,
  },
];

// ---------- render: list view ----------

const workListEl = document.getElementById("workList");

function renderList() {
  workListEl.innerHTML = "";
  WORKS.forEach((work, i) => {
    const num = String(i + 1).padStart(2, "0");

    const titleBtn = document.createElement("button");
    titleBtn.className = "work-title";
    titleBtn.dataset.id = work.id;
    titleBtn.textContent = `${num}. ${work.title}`;
    titleBtn.addEventListener("click", () => selectWork(work.id));

    const attrSpan = document.createElement("span");
    attrSpan.className = "work-attr";
    attrSpan.textContent = work.attr;

    const row = document.createElement("div");
    row.className = "work-row";
    row.appendChild(titleBtn);
    row.appendChild(attrSpan);

    workListEl.appendChild(row);
  });
}

// ---------- render: grid view (left panel) ----------

const gridViewEl = document.getElementById("gridView");
const workHeroEl = document.getElementById("workHero");
const heroImageEl = document.getElementById("heroImage");
const heroPhotoEl = document.getElementById("heroPhoto");
const conceptTextEl = document.getElementById("conceptText");
const processTextEl = document.getElementById("processText");
const detailGridEl = document.getElementById("detailGrid");

function selectWork(id) {
  const work = WORKS.find((w) => w.id === id);
  if (!work) return;

  // 작품 제목 클릭 -> 좌측 [작품 정보] 패널 갱신 (펼침 애니메이션)
  gridViewEl.style.animation = "none";
  workHeroEl.style.animation = "none";
  // reflow to restart animations
  void gridViewEl.offsetWidth;
  gridViewEl.style.animation = "";
  workHeroEl.style.animation = "";

  heroImageEl.style.setProperty("--ph-a", work.colors[0]);
  heroImageEl.style.setProperty("--ph-b", work.colors[1]);

  if (work.image) {
    workHeroEl.classList.add("has-photo");
    heroPhotoEl.src = work.image;
    heroPhotoEl.alt = work.title;
  } else {
    workHeroEl.classList.remove("has-photo");
    heroImageEl.textContent = work.title;
  }

  conceptTextEl.textContent = work.concept;
  processTextEl.textContent = work.process;

  detailGridEl.innerHTML = "";
  for (let i = 0; i < work.details; i++) {
    const d = document.createElement("div");
    d.className = "placeholder-img";
    d.style.setProperty("--ph-a", work.colors[i % 2 === 0 ? 0 : 1]);
    d.style.setProperty("--ph-b", work.colors[i % 2 === 0 ? 1 : 0]);
    d.textContent = `Detail ${i + 1}`;
    detailGridEl.appendChild(d);
  }

  document.querySelectorAll(".work-title").forEach((el) => {
    el.classList.toggle("active", Number(el.dataset.id) === id);
  });
}

// ---------- tab switching ----------
// About/Shop 버튼은 leejed/About/Shop 뷰마다 리스트뷰 안에 복제되어 있으므로,
// data-tab 값 기준으로 모든 위치의 버튼을 함께 활성화한다.

const tabs = document.querySelectorAll("[data-tab]");
const views = document.querySelectorAll(".view");

function activateTab(target) {
  tabs.forEach((t) => t.classList.toggle("active", t.dataset.tab === target));
  views.forEach((v) => v.classList.toggle("active", v.id === `view-${target}`));
}

tabs.forEach((tab) => {
  tab.addEventListener("click", () => activateTab(tab.dataset.tab));
});

// ---------- cursor follower ----------

const cursorFollowerEl = document.getElementById("cursorFollower");

document.addEventListener("mousemove", (e) => {
  cursorFollowerEl.style.left = `${e.clientX}px`;
  cursorFollowerEl.style.top = `${e.clientY}px`;
});

// ---------- init ----------

renderList();
selectWork(WORKS[0].id);
