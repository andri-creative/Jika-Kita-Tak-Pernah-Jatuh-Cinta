/* ══════════════════════════════════════════════════════════════════════
   JIKA KITA TAK PERNAH JATUH CINTA – MASTER SCRIPT ENGINE
   Navigasi Berbasis Mini-Game · Interaktivitas Lengkap · Web Audio API
   ══════════════════════════════════════════════════════════════════════ */

'use strict';

const TOTAL_SCENES = 36; // 0 (Cover) + 1-35 (Kutipan & Finale)
let currentIndex = 0;
const completedScenes = new Set();
let isAnimating = false;
let audioCtx = null;

// Daftar Judul Topik untuk TOC
const SCENE_TITLES = [
  "Pembuka: Segel Buku Hati",
  "1. Menjaga Hati Sebelum Bertemu",
  "2. Perasaan yang Bertepuk Sebelah Tangan",
  "3. Realitas Cinta di Dunia Maya vs Nyata",
  "4. Rasa Insecure dan Standar Kecantikan",
  "5. Mencintai dalam Diam",
  "6. Terjebak dalam Friendzone",
  "7. Datang Hanya Saat Kesepian",
  "8. Mengikhlaskan yang Pergi Tanpa Kejelasan",
  "9. Patah Hati yang Menjadikan Lebih Dewasa",
  "10. Menghargai Diri Sendiri (Self-Worth)",
  "11. Hubungan Beda Prinsip & Arah",
  "12. Merelakan Restu Orang Tua",
  "13. Waktu Terbaik untuk Jatuh Cinta",
  "14. Bahagia Tanpa Bergantung",
  "15. Kenangan Masa Lalu yang Sulit Dilupakan",
  "16. Memaafkan Masa Lalu",
  "17. Fokus pada Masa Depan dan Karier",
  "18. Doa yang Diam-Diam Dipanjatkan",
  "19. Seseorang yang Layak Diperjuangkan",
  "20. Kesabaran dalam Menunggu Takdir",
  "21. Mencintai Terlalu Berlebihan",
  "22. Seseorang yang Hanya Singgah",
  "23. Ekspektasi yang Menyakitkan",
  "24. Berpura-pura Kuat di Depan Orang Lain",
  "25. Keberanian untuk Berkata 'Cukup'",
  "26. Cinta yang Sehat",
  "27. Membandingkan Kisah Cinta",
  "28. Perhatian Kecil yang Menjebak",
  "29. Ketakutan untuk Memulai Lagi",
  "30. Kesetiaan pada Diri Sendiri",
  "31. Alasan Tuhan Menjauhkan Seseorang",
  "32. Menjadi Dewasa dalam Menyikapi Rindu",
  "33. Lelahnya Mengejar yang Menjauh",
  "34. Kebahagiaan yang Sederhana",
  "35. Grand Finale — Surat Cinta Bucin"
];

/* ── DOM REFS ── */
const scenes = document.querySelectorAll('.scene');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const currentSceneLabel = document.getElementById('currentScene');
const progressFill = document.getElementById('progressFill');
const toastBox = document.getElementById('toastBox');
const tocToggle = document.getElementById('tocToggle');
const tocOverlay = document.getElementById('tocOverlay');
const tocClose = document.getElementById('tocClose');
const tocGrid = document.getElementById('tocGrid');
const bgCanvas = document.getElementById('bgCanvas');
const bgCtx = bgCanvas.getContext('2d');

/* ══════════════════════════════════════
   AUDIO ENGINE (WEB AUDIO API)
   ══════════════════════════════════════ */
function initAudio() {
  if (!audioCtx) {
    try {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    } catch (e) {}
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
}

function playTone(freq, duration = 0.3, type = 'sine', vol = 0.15) {
  initAudio();
  if (!audioCtx) return;
  try {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.type = type;
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
    gain.gain.setValueAtTime(vol, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
    osc.start();
    osc.stop(audioCtx.currentTime + duration);
  } catch (e) {}
}

function playSuccessChime() {
  playTone(523.25, 0.2, 'sine', 0.2); // C5
  setTimeout(() => playTone(659.25, 0.25, 'sine', 0.2), 100); // E5
  setTimeout(() => playTone(783.99, 0.4, 'sine', 0.25), 200); // G5
  setTimeout(() => playTone(1046.50, 0.5, 'sine', 0.3), 320); // C6
}

function showToast(msg) {
  toastBox.textContent = msg;
  toastBox.classList.add('show');
  setTimeout(() => toastBox.classList.remove('show'), 2400);
}

/* ══════════════════════════════════════
   BACKGROUND CANVAS (PARTIKEL)
   ══════════════════════════════════════ */
let canvasW, canvasH;
let particles = [];

function resizeCanvas() {
  canvasW = bgCanvas.width = window.innerWidth;
  canvasH = bgCanvas.height = window.innerHeight;
}

class Particle {
  constructor() {
    this.reset(true);
  }
  reset(randomY) {
    this.x = Math.random() * canvasW;
    this.y = randomY ? Math.random() * canvasH : -10;
    this.size = Math.random() * 2 + 0.5;
    this.speedX = (Math.random() - 0.5) * 0.3;
    this.speedY = Math.random() * 0.4 + 0.1;
    this.alpha = Math.random() * 0.5 + 0.1;
    this.twinkle = Math.random() * Math.PI * 2;
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.twinkle += 0.02;
    if (this.y > canvasH + 10 || this.x < -10 || this.x > canvasW + 10) {
      this.reset(false);
    }
  }
  draw() {
    bgCtx.save();
    bgCtx.globalAlpha = 0.2 + Math.abs(Math.sin(this.twinkle)) * 0.4;
    bgCtx.fillStyle = '#ff9ec4';
    bgCtx.beginPath();
    bgCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    bgCtx.fill();
    bgCtx.restore();
  }
}

function initParticles() {
  particles = [];
  const count = window.innerWidth < 768 ? 40 : 80;
  for (let i = 0; i < count; i++) {
    particles.push(new Particle());
  }
}

function animateBg() {
  bgCtx.clearRect(0, 0, canvasW, canvasH);
  particles.forEach(p => { p.update(); p.draw(); });
  requestAnimationFrame(animateBg);
}

/* ══════════════════════════════════════
   NAVIGASI & PENYELESAIAN GAME
   ══════════════════════════════════════ */
function completeScene(sceneIdx, successMsg = "Lembaran Terbuka! ✨") {
  if (completedScenes.has(sceneIdx)) return;
  completedScenes.add(sceneIdx);

  playSuccessChime();
  showToast(successMsg);

  // Update status label
  const st = document.getElementById(`st-${sceneIdx}`);
  if (st) {
    st.textContent = `Selesai! ${successMsg}`;
    st.classList.add('success');
  }

  // Tampilkan tombol lanjut
  const nextBtnStep = document.getElementById(`btn-next-${sceneIdx}`);
  if (nextBtnStep) {
    nextBtnStep.classList.remove('hidden');
  }

  // Update HUD
  updateHUD();
}

function updateHUD() {
  currentSceneLabel.textContent = currentIndex + 1;
  const pct = ((currentIndex + 1) / TOTAL_SCENES) * 100;
  progressFill.style.width = `${pct}%`;

  prevBtn.disabled = currentIndex === 0;

  // Tombol next di HUD hanya aktif jika adegan saat ini sudah selesai
  const isDone = completedScenes.has(currentIndex) || currentIndex === TOTAL_SCENES - 1;
  nextBtn.disabled = !isDone || currentIndex === TOTAL_SCENES - 1;
}

function goToScene(targetIdx) {
  if (isAnimating || targetIdx < 0 || targetIdx >= TOTAL_SCENES) return;
  if (targetIdx === currentIndex) return;

  isAnimating = true;
  const prevScene = scenes[currentIndex];
  const nextScene = scenes[targetIdx];

  // Update background color
  const targetBg = nextScene.dataset.bg || '#090E1D';
  document.body.style.background = targetBg;

  prevScene.classList.remove('active');
  prevScene.classList.add('exiting');
  nextScene.classList.remove('exiting');
  nextScene.classList.add('active');

  setTimeout(() => {
    prevScene.classList.remove('exiting');
    isAnimating = false;
  }, 600);

  currentIndex = targetIdx;
  updateHUD();
  playTone(330, 0.2, 'sine', 0.1);

  // Hujan hati khusus Scene 35
  if (heartRain) {
    if (targetIdx === 35) heartRain.start();
    else heartRain.stop();
  }
}

function goNext() {
  if (completedScenes.has(currentIndex) || currentIndex === 0) {
    goToScene(currentIndex + 1);
  } else {
    showToast("Selesaikan interaksi pada adegan ini dulu ya! ✨");
    playTone(220, 0.2, 'triangle', 0.15);
  }
}

function goPrev() {
  goToScene(currentIndex - 1);
}

/* ══════════════════════════════════════
   SETUP EVENT LISTENER SETIAP MINI-GAME
   ══════════════════════════════════════ */
function setupMiniGames() {

  // ── SCENE 0: COVER SEAL ──
  const coverSeal = document.getElementById('coverSeal');
  if (coverSeal) {
    coverSeal.addEventListener('click', () => {
      coverSeal.classList.add('unlocked');
      document.getElementById('sealIcon').textContent = '🔓';
      document.getElementById('sealText').textContent = 'Segel Terbuka!';
      completeScene(0, "Segel Lilin Terbuka! 📖");
    });
  }
  const btnNext0 = document.getElementById('btn-next-0');
  if (btnNext0) btnNext0.addEventListener('click', () => goToScene(1));

  // ── SCENE 1: DOORS (3x ketukan) ──
  let doorKnocks = 0;
  const goldenDoor = document.getElementById('goldenDoor');
  const doorStatus = document.getElementById('goldenDoorStatus');
  const st1 = document.getElementById('st-1');
  const wrongDoors = document.querySelectorAll('.door-wrong');

  wrongDoors.forEach(wd => {
    wd.addEventListener('click', () => {
      playTone(200, 0.15, 'sawtooth', 0.1);
      wd.style.transform = 'translateX(-4px)';
      setTimeout(() => wd.style.transform = 'translateX(4px)', 80);
      setTimeout(() => wd.style.transform = '', 160);
      showToast("Pintu ini redup... coba pintu kayu hangat di sebelah kanan!");
    });
  });

  if (goldenDoor) {
    goldenDoor.addEventListener('click', () => {
      doorKnocks++;
      playTone(300 + doorKnocks * 60, 0.15, 'triangle');
      goldenDoor.style.transform = 'scale(0.96)';
      setTimeout(() => goldenDoor.style.transform = '', 150);

      if (doorKnocks < 3) {
        st1.textContent = `Ketukan: ${doorKnocks} / 3`;
        doorStatus.textContent = `Ketuk ${3 - doorKnocks}x lagi`;
      } else {
        goldenDoor.classList.add('opened');
        doorStatus.textContent = 'Terbuka Hangat ✨';
        completeScene(1, "Pintu Kepastian Terbuka! 🚪");
      }
    });
  }
  const btnNext1 = document.getElementById('btn-next-1');
  if (btnNext1) btnNext1.addEventListener('click', () => goToScene(2));

  // ── SCENE 2: BUBBLES POP (3 gelembung) ──
  let poppedCount = 0;
  const bubbleBtns = document.querySelectorAll('.chat-bubble-pop');
  const st2 = document.getElementById('st-2');
  bubbleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (btn.classList.contains('popped')) return;
      btn.classList.add('popped');
      poppedCount++;
      playTone(450 + poppedCount * 80, 0.15, 'sine');
      st2.textContent = `Gelembung pecah: ${poppedCount} / 3`;
      if (poppedCount >= 3) {
        completeScene(2, "Semua Beban Pesan Terlepas! 🕊️");
      }
    });
  });
  const btnNext2 = document.getElementById('btn-next-2');
  if (btnNext2) btnNext2.addEventListener('click', () => goToScene(3));

  // ── SCENE 3: REALITY SLIDER (>= 85%) ──
  const realitySlider = document.getElementById('realitySlider');
  const mockChatOnline = document.getElementById('mockChatOnline');
  const mockRealityOffline = document.getElementById('mockRealityOffline');
  const st3 = document.getElementById('st-3');
  if (realitySlider) {
    realitySlider.addEventListener('input', (e) => {
      const val = parseInt(e.target.value, 10);
      st3.textContent = `Posisi: ${val}% (${val < 50 ? 'Dunia Maya' : 'Dunia Nyata'})`;
      if (val >= 85) {
        mockChatOnline.classList.add('hidden');
        mockRealityOffline.classList.remove('hidden');
        completeScene(3, "Realita Nyata Terungkap! 🌧️");
      }
    });
  }
  const btnNext3 = document.getElementById('btn-next-3');
  if (btnNext3) btnNext3.addEventListener('click', () => goToScene(4));

  // ── SCENE 4: MIRROR WIPE ──
  const mirrorCanvas = document.getElementById('mirrorCanvas');
  const btnQuickWipe = document.getElementById('btnQuickWipe');
  const st4 = document.getElementById('st-4');
  const mirrorOval = document.getElementById('mirrorOval');
  const mirrorProgressRing = document.getElementById('mirrorProgressRing');
  const mirrorCleanBadge = document.getElementById('mirrorCleanBadge');
  const mirrorUnderContent = document.getElementById('mirrorUnderContent');
  let mirrorWipeCount = 0;
  const mirrorTotalWipes = 180; // jumlah titik yang perlu digosok untuk bersih

  function addWipeTrail(x, y) {
    const trail = document.createElement('div');
    trail.className = 'mirror-wipe-trail';
    trail.style.left = `${x}px`;
    trail.style.top = `${y}px`;
    trail.style.pointerEvents = 'none';
    mirrorOval.appendChild(trail);
    setTimeout(() => trail.remove(), 500);
  }

  function spawnSparkles(cx, cy) {
    for (let i = 0; i < 4; i++) {
      const s = document.createElement('div');
      s.className = 'mirror-sparkle';
      const angle = (Math.random() * Math.PI * 2);
      const dist = 20 + Math.random() * 40;
      s.style.left = `${cx}px`;
      s.style.top = `${cy}px`;
      s.style.setProperty('--tx', `${Math.cos(angle) * dist}px`);
      s.style.setProperty('--ty', `${Math.sin(angle) * dist}px`);
      s.textContent = ['✨', '💫', '⭐'][Math.floor(Math.random() * 3)];
      mirrorOval.appendChild(s);
      setTimeout(() => s.remove(), 1500);
    }
  }

  function updateMirrorProgress() {
    const pct = Math.round((mirrorWipeCount / mirrorTotalWipes) * 100);
    if (mirrorCleanBadge) mirrorCleanBadge.textContent = `${pct}%`;
    if (st4) st4.textContent = `Kebersihan cermin: ${pct}%`;
    if (mirrorProgressRing) mirrorProgressRing.classList.add('active');
    if (pct >= 100) {
      if (mirrorCleanBadge) mirrorCleanBadge.classList.add('visible');
      if (mirrorUnderContent) mirrorUnderContent.classList.add('revealed');
      if (btnQuickWipe) {
        btnQuickWipe.classList.add('done');
        btnQuickWipe.textContent = '✅ Cermin Bersih';
        btnQuickWipe.disabled = true;
      }
      completeScene(4, "Cermin Bersih & Wajah Tulus Tersenyum! 😊");
    }
  }

  function wipeCanvas(x, y) {
    const mctx = mirrorCanvas.getContext('2d');
    mctx.globalCompositeOperation = 'destination-out';
    mctx.beginPath();
    mctx.arc(x, y, 30, 0, Math.PI * 2);
    mctx.fill();
    mirrorWipeCount = Math.min(mirrorWipeCount + 1, mirrorTotalWipes);
    addWipeTrail(x, y);
    updateMirrorProgress();
  }

  if (mirrorCanvas) {
    const mctx = mirrorCanvas.getContext('2d');
    mctx.fillStyle = 'rgba(35, 30, 25, 0.95)';
    mctx.fillRect(0, 0, mirrorCanvas.width, mirrorCanvas.height);

    mirrorCanvas.addEventListener('mousemove', (e) => {
      if (e.buttons === 1 && mirrorWipeCount < mirrorTotalWipes) {
        mirrorCanvas.classList.add('wiping');
        const r = mirrorCanvas.getBoundingClientRect();
        wipeCanvas(e.clientX - r.left, e.clientY - r.top);
      } else if (mirrorWipeCount >= mirrorTotalWipes) {
        mirrorCanvas.classList.remove('wiping');
      }
    });
    mirrorCanvas.addEventListener('mouseleave', () => mirrorCanvas.classList.remove('wiping'));
    mirrorCanvas.addEventListener('touchmove', (e) => {
      if (mirrorWipeCount < mirrorTotalWipes) {
        mirrorCanvas.classList.add('wiping');
        const r = mirrorCanvas.getBoundingClientRect();
        const t = e.touches[0];
        wipeCanvas(t.clientX - r.left, t.clientY - r.top);
      } else {
        mirrorCanvas.classList.remove('wiping');
      }
    }, { passive: true });
    mirrorCanvas.addEventListener('touchend', () => mirrorCanvas.classList.remove('wiping'));
    mirrorCanvas.addEventListener('click', (e) => {
      if (mirrorWipeCount < mirrorTotalWipes) {
        const r = mirrorCanvas.getBoundingClientRect();
        wipeCanvas(e.clientX - r.left, e.clientY - r.top);
      }
    });
  }

  if (btnQuickWipe) {
    btnQuickWipe.addEventListener('click', () => {
      const mctx = mirrorCanvas.getContext('2d');
      mctx.clearRect(0, 0, mirrorCanvas.width, mirrorCanvas.height);
      mirrorWipeCount = mirrorTotalWipes;
      spawnSparkles(mirrorCanvas.width / 2, mirrorCanvas.height / 2);
      updateMirrorProgress();
    });
  }
  const btnNext4 = document.getElementById('btn-next-4');
  if (btnNext4) btnNext4.addEventListener('click', () => goToScene(5));

  // ── SCENE 5: QUILL INK (4 baris) ──
  let inkLines = 0;
  const btnQuill = document.getElementById('btnQuill');
  const st5 = document.getElementById('st-5');
  const lines = [
    "Baris 1: Namamu selalu tertulis di sudut doaku...",
    "Baris 2: Menyapa terasa terlalu lancang bagi hatiku...",
    "Baris 3: Tapi bayangmu tak pernah benar-benar pergi...",
    "Baris 4: Hingga tinta ini mengering dalam keikhlasan."
  ];
  if (btnQuill) {
    btnQuill.addEventListener('click', () => {
      if (inkLines < 4) {
        inkLines++;
        playTone(350 + inkLines * 50, 0.15, 'sine');
        const l = document.getElementById(`line${inkLines}`);
        if (l) {
          l.textContent = lines[inkLines - 1];
          l.classList.add('revealed');
        }
        st5.textContent = `Goresan tinta: ${inkLines} / 4 baris`;
        if (inkLines === 4) {
          completeScene(5, "Surat Kaligrafi Selesai Tertulis! 🖋️");
        }
      }
    });
  }
  const btnNext5 = document.getElementById('btn-next-5');
  if (btnNext5) btnNext5.addEventListener('click', () => goToScene(6));

  // ── SCENE 6: FRIENDZONE BARRIER ──
  const glassBarrier = document.getElementById('glassBarrier');
  if (glassBarrier) {
    glassBarrier.addEventListener('click', () => {
      glassBarrier.classList.add('broken');
      glassBarrier.innerHTML = "<span>Batas Runtuh ✨</span>";
      completeScene(6, "Batas Semu Berhasil Diruntuhkan! ☕");
    });
  }
  const btnNext6 = document.getElementById('btn-next-6');
  if (btnNext6) btnNext6.addEventListener('click', () => goToScene(7));

  // ── SCENE 7: DESK LANTERN ──
  const deskLantern = document.getElementById('deskLantern');
  const darkRoom = document.getElementById('darkRoom');
  function igniteLantern() {
    if (deskLantern) deskLantern.classList.add('lit');
    if (darkRoom) darkRoom.classList.add('lit');
    playTone(520, 0.35, 'triangle', 0.2);
    completeScene(7, "Lentera Kemandirianmu Menyala Terang! 🏮");
  }

  if (deskLantern) {
    deskLantern.addEventListener('click', igniteLantern);
    deskLantern.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        igniteLantern();
      }
    });
  }
  if (darkRoom) {
    darkRoom.addEventListener('click', (e) => {
      if (!darkRoom.classList.contains('lit')) {
        igniteLantern();
      }
    });
  }
  const btnNext7 = document.getElementById('btn-next-7');
  if (btnNext7) btnNext7.addEventListener('click', () => goToScene(8));

  // ── SCENE 8: GHOSTING IKHLAS ──
  const btnIkhlas = document.getElementById('btnIkhlas');
  const chatFreezeBox = document.getElementById('chatFreezeBox');
  if (btnIkhlas) {
    btnIkhlas.addEventListener('click', () => {
      chatFreezeBox.style.opacity = '0.3';
      chatFreezeBox.style.transform = 'scale(0.95)';
      completeScene(8, "Pesan Dilapangkan dengan Keikhlasan! 🕊️");
    });
  }
  const btnNext8 = document.getElementById('btn-next-8');
  if (btnNext8) btnNext8.addEventListener('click', () => goToScene(9));

  // ── SCENE 9: TEARDROP LOTUS ──
  const waterPool = document.getElementById('waterPool');
  if (waterPool) {
    waterPool.addEventListener('click', () => {
      waterPool.classList.add('bloomed');
      completeScene(9, "Teratai Kedewasaan Mekar Indah! 🪷");
    });
  }
  const btnNext9 = document.getElementById('btn-next-9');
  if (btnNext9) btnNext9.addEventListener('click', () => goToScene(10));

  // ── SCENE 10: POLISH GEM (3x) ──
  let polishClicks = 0;
  const btnPolishGem = document.getElementById('btnPolishGem');
  const rawTear = document.getElementById('rawTear');
  const pureDiamond = document.getElementById('pureDiamond');
  const st10 = document.getElementById('st-10');
  if (btnPolishGem) {
    btnPolishGem.addEventListener('click', () => {
      polishClicks++;
      playTone(400 + polishClicks * 100, 0.15, 'triangle');
      st10.textContent = `Kilauan: ${polishClicks} / 3`;
      if (polishClicks >= 3) {
        rawTear.classList.add('hidden');
        pureDiamond.classList.remove('hidden');
        completeScene(10, "Air Matamu Mengkristal Jadi Berlian! 💎");
      }
    });
  }
  const btnNext10 = document.getElementById('btn-next-10');
  if (btnNext10) btnNext10.addEventListener('click', () => goToScene(11));

  // ── SCENE 11: FORK PATHS ──
  const pathLeft = document.getElementById('pathLeft');
  if (pathLeft) {
    pathLeft.addEventListener('click', () => {
      pathLeft.classList.add('selected');
      completeScene(11, "Melangkah Mantap di Jalan Prinsipmu! 🌄");
    });
  }
  const btnNext11 = document.getElementById('btn-next-11');
  if (btnNext11) btnNext11.addEventListener('click', () => goToScene(12));

  // ── SCENE 12: COMPASS SPIN ──
  const btnSpinCompass = document.getElementById('btnSpinCompass');
  const compassNeedlePin = document.getElementById('compassNeedlePin');
  const compassOuterRing = document.querySelector('[data-scene="12"] .compass-outer-ring');
  let compassSpinning = false;
  if (btnSpinCompass && compassNeedlePin) {
    btnSpinCompass.addEventListener('click', () => {
      if (compassSpinning) return;
      compassSpinning = true;
      btnSpinCompass.disabled = true;

      // Hapus idle animation, beri class spinning
      compassNeedlePin.classList.remove('settled');
      compassNeedlePin.classList.add('spinning');

      // Animasi multi-rotasi: putar cepat beberapa lapis lalu perlahan settle di -90deg (Barat / Rumah Hangat)
      const totalDegrees = -90 - (360 * 3); // 3 putaran penuh lalu berakhir di -90deg
      compassNeedlePin.style.transition = 'transform 2.2s cubic-bezier(0.15, 0.85, 0.35, 1.2)';
      compassNeedlePin.style.transform = `rotate(${totalDegrees}deg)`;

      const st12 = document.getElementById('st-12');
      if (st12) st12.textContent = '🧭 Jarum sedang mencari arah restu...';

      setTimeout(() => {
        compassNeedlePin.classList.remove('spinning');
        compassNeedlePin.classList.add('settled');
        if (compassOuterRing) compassOuterRing.classList.add('success');
        completeScene(12, "Kompas Mengarah Pasti ke Rumah Hangat! 🏡✨");
        btnSpinCompass.textContent = '✅ Arah Ditemukan';
      }, 2250);
    });
  }
  const btnNext12 = document.getElementById('btn-next-12');
  if (btnNext12) btnNext12.addEventListener('click', () => goToScene(13));

  // ── SCENE 13: ROSE DAWN ──
  const btnBringDawn = document.getElementById('btnBringDawn');
  const sunOrb = document.getElementById('sunOrb');
  const roseBud = document.getElementById('roseBud');
  if (btnBringDawn) {
    btnBringDawn.addEventListener('click', () => {
      sunOrb.style.opacity = '1';
      sunOrb.style.transform = 'scale(1.2)';
      roseBud.textContent = '🌹';
      document.getElementById('budState').textContent = 'Mawar merekah sempurna pada waktunya!';
      completeScene(13, "Mawar Mekar Sempurna Bersama Fajar! 🌹");
    });
  }
  const btnNext13 = document.getElementById('btn-next-13');
  if (btnNext13) btnNext13.addEventListener('click', () => goToScene(14));

  // ── SCENE 14: HOT CHOCOLATE SIP ──
  const hotChocoCup = document.getElementById('hotChocoCup');
  if (hotChocoCup) {
    hotChocoCup.addEventListener('click', () => {
      hotChocoCup.querySelector('.sip-tag').textContent = "Aroma kebahagiaan menyelimuti hatimu ☕";
      completeScene(14, "Hangat & Bahagia Bersama Dirimu Sendiri! ☕");
    });
  }
  const btnNext14 = document.getElementById('btn-next-14');
  if (btnNext14) btnNext14.addEventListener('click', () => goToScene(15));

  // ── SCENE 15: LOCK CHEST ──
  const btnLockChest = document.getElementById('btnLockChest');
  const chestBox = document.getElementById('chestBox');
  if (btnLockChest) {
    btnLockChest.addEventListener('click', () => {
      chestBox.querySelector('.chest-lid').textContent = "📦 Kotak Kenangan Terkunci Rapi 🔒";
      completeScene(15, "Kenangan Masa Lalu Tersimpan Rapi! 📦");
    });
  }
  const btnNext15 = document.getElementById('btn-next-15');
  if (btnNext15) btnNext15.addEventListener('click', () => goToScene(16));

  // ── SCENE 16: CUT BURDEN STRAP ──
  const btnCutStrap = document.getElementById('btnCutStrap');
  const heavyBackpack = document.getElementById('heavyBackpack');
  if (btnCutStrap) {
    btnCutStrap.addEventListener('click', () => {
      heavyBackpack.querySelector('.backpack-icon').textContent = "🪶";
      heavyBackpack.querySelector('.backpack-label').textContent = "Beban Terlepas · Hatimu seringan bulu angsa!";
      completeScene(16, "Beban Dendam Terlepas Seketika! 🪶");
    });
  }
  const btnNext16 = document.getElementById('btn-next-16');
  if (btnNext16) btnNext16.addEventListener('click', () => goToScene(17));

  // ── SCENE 17: STARS GRID (4 bintang) ──
  let starsLinked = 0;
  const starPoints = document.querySelectorAll('.star-point');
  const st17 = document.getElementById('st-17');
  starPoints.forEach(p => {
    p.addEventListener('click', () => {
      if (p.classList.contains('linked')) return;
      p.classList.add('linked');
      starsLinked++;
      playTone(500 + starsLinked * 70, 0.15, 'sine');
      st17.textContent = `Pilar terbangun: ${starsLinked} / 4`;
      if (starsLinked >= 4) {
        document.getElementById('blueprintTower').textContent = "🏢 Gedung Impian Selesai Terwujud!";
        completeScene(17, "Fondasi Impian & Kariermu Kokoh! 🏢");
      }
    });
  });
  const btnNext17 = document.getElementById('btn-next-17');
  if (btnNext17) btnNext17.addEventListener('click', () => goToScene(18));

  // ── SCENE 18: PRAYER STARS (3 doa) ──
  let prayerCount = 0;
  const nightSkyStage = document.getElementById('nightSkyStage');
  const st18 = document.getElementById('st-18');
  if (nightSkyStage) {
    nightSkyStage.addEventListener('click', () => {
      if (prayerCount < 3) {
        prayerCount++;
        playTone(600 + prayerCount * 80, 0.2, 'sine');
        st18.textContent = `Doa terpanjat: ${prayerCount} / 3`;
        if (prayerCount === 3) {
          completeScene(18, "Doa Sepertiga Malam Menembus Bintang! 🌟");
        }
      }
    });
  }
  const btnNext18 = document.getElementById('btn-next-18');
  if (btnNext18) btnNext18.addEventListener('click', () => goToScene(19));

  // ── SCENE 19: POUR TEA (Balance) ──
  const btnPourTea = document.getElementById('btnPourTea');
  const teaLevelA = document.getElementById('teaLevelA');
  const teaLevelB = document.getElementById('teaLevelB');
  if (btnPourTea) {
    btnPourTea.addEventListener('click', () => {
      teaLevelA.textContent = "100%";
      teaLevelB.textContent = "100%";
      teaLevelA.style.background = "#D97706";
      teaLevelB.style.background = "#D97706";
      teaLevelA.style.color = "#FFF";
      teaLevelB.style.color = "#FFF";
      completeScene(19, "Cinta Mengalir Harmonis & Setara! 🫖");
    });
  }
  const btnNext19 = document.getElementById('btn-next-19');
  if (btnNext19) btnNext19.addEventListener('click', () => goToScene(20));

  // ── SCENE 20: CLOUD RAIN SEED ──
  let rainClicks = 0;
  const cloudRain = document.getElementById('cloudRain');
  const plantVisual = document.getElementById('plantVisual');
  const st20 = document.getElementById('st-20');
  if (cloudRain) {
    cloudRain.addEventListener('click', () => {
      rainClicks++;
      playTone(400 + rainClicks * 60, 0.15, 'triangle');
      st20.textContent = `Siraman air: ${rainClicks} / 3`;
      if (rainClicks === 1) plantVisual.textContent = "🌿 Bertunas Daun Baru";
      if (rainClicks === 2) plantVisual.textContent = "🌳 Batang Tumbuh Tinggi";
      if (rainClicks >= 3) {
        plantVisual.textContent = "🌸 Pohon Berbunga Harum & Indah!";
        completeScene(20, "Pohon Kesabaran Berbunga Sempurna! 🌸");
      }
    });
  }
  const btnNext20 = document.getElementById('btn-next-20');
  if (btnNext20) btnNext20.addEventListener('click', () => goToScene(21));

  // ── SCENE 21: HEART PUZZLE ──
  const puzzlePiece = document.getElementById('puzzlePiece');
  const heartSlot = document.getElementById('heartSlot');
  if (puzzlePiece) {
    puzzlePiece.addEventListener('click', () => {
      if (heartSlot) heartSlot.classList.add('filled');
      if (puzzlePiece) {
        puzzlePiece.textContent = '💖 Hati Kembali Utuh';
        puzzlePiece.disabled = true;
      }
      playTone(560, 0.3, 'sine', 0.15);
      completeScene(21, "Hatimu Utuh Menyayangi Dirimu Sendiri! 💖");
    });
  }
  const btnNext21 = document.getElementById('btn-next-21');
  if (btnNext21) btnNext21.addEventListener('click', () => goToScene(22));

  // ── SCENE 22: WAVE BYE TRAIN ──
  const btnWaveBye = document.getElementById('btnWaveBye');
  const trainCar = document.getElementById('trainCar');
  if (btnWaveBye) {
    btnWaveBye.addEventListener('click', () => {
      trainCar.textContent = "✨ Kereta Melaju Menuju Cakrawala... Kenangan Indah Tertinggal Damai";
      completeScene(22, "Melambaikan Tangan dengan Keikhlasan! 👋");
    });
  }
  const btnNext22 = document.getElementById('btn-next-22');
  if (btnNext22) btnNext22.addEventListener('click', () => goToScene(23));

  // ── SCENE 23: SHATTER TOWER ──
  const btnShatterTower = document.getElementById('btnShatterTower');
  const towerGlass = document.getElementById('towerGlass');
  if (btnShatterTower) {
    btnShatterTower.addEventListener('click', () => {
      towerGlass.textContent = "🪨 Berdiri di Atas Fondasi Batu Karang Kokoh";
      completeScene(23, "Berpijak Nyata Tanpa Ekspektasi Berlebih! 🪨");
    });
  }
  const btnNext23 = document.getElementById('btn-next-23');
  if (btnNext23) btnNext23.addEventListener('click', () => goToScene(24));

  // ── SCENE 24: DROP MASK ──
  const btnDropMask = document.getElementById('btnDropMask');
  const fakeMaskCover = document.getElementById('fakeMaskCover');
  if (btnDropMask) {
    btnDropMask.addEventListener('click', () => {
      fakeMaskCover.style.display = 'none';
      completeScene(24, "Jujur & Tulus Menerima Diri Apa Adanya! 🤍");
    });
  }
  const btnNext24 = document.getElementById('btn-next-24');
  if (btnNext24) btnNext24.addEventListener('click', () => goToScene(25));

  // ── SCENE 25: OPEN PALM THORN ──
  const btnOpenPalm = document.getElementById('btnOpenPalm');
  const thornBranch = document.getElementById('thornBranch');
  if (btnOpenPalm) {
    btnOpenPalm.addEventListener('click', () => {
      thornBranch.textContent = "🦋 Luka Sembuh & Kupu-kupu Biru Hinggap";
      completeScene(25, "Kelegaan Mengetahui Kapan Harus Berhenti! 🦋");
    });
  }
  const btnNext25 = document.getElementById('btn-next-25');
  if (btnNext25) btnNext25.addEventListener('click', () => goToScene(26));

  // ── SCENE 26: SUN SHINE TREES ──
  const btnSunShine = document.getElementById('btnSunShine');
  if (btnSunShine) {
    btnSunShine.addEventListener('click', () => {
      completeScene(26, "Dua Jiwa Bertumbuh Harmonis Tanpa Menuntut! 🌲🌲");
    });
  }
  const btnNext26 = document.getElementById('btn-next-26');
  if (btnNext26) btnNext26.addEventListener('click', () => goToScene(27));

  // ── SCENE 27: TURN SEASON (3x) ──
  let seasonTurns = 0;
  const btnTurnSeason = document.getElementById('btnTurnSeason');
  const seasonIcon = document.getElementById('seasonIcon');
  const flowerLabel = document.getElementById('flowerLabel');
  const st27 = document.getElementById('st-27');
  const seasonsData = [
    { icon: "🌻", label: "Bunga Matahari Mekar di Siang Terik" },
    { icon: "🪻", label: "Sedap Malam Semerbak di Tengah Malam" },
    { icon: "🌺", label: "Setiap Hati Mekar di Musim Terbaiknya!" }
  ];
  if (btnTurnSeason) {
    btnTurnSeason.addEventListener('click', () => {
      if (seasonTurns < 3) {
        const cur = seasonsData[seasonTurns];
        seasonIcon.textContent = cur.icon;
        flowerLabel.textContent = cur.label;
        seasonTurns++;
        playTone(380 + seasonTurns * 80, 0.15, 'sine');
        st27.textContent = `Musim terlewati: ${seasonTurns} / 3`;
        if (seasonTurns === 3) {
          completeScene(27, "Sadar Bahwa Waktumu Selalu Tepat! 🌺");
        }
      }
    });
  }
  const btnNext27 = document.getElementById('btn-next-27');
  if (btnNext27) btnNext27.addEventListener('click', () => goToScene(28));

  // ── SCENE 28: FOLD UMBRELLA ──
  const btnFoldUmbrella = document.getElementById('btnFoldUmbrella');
  const umbrellaVisual = document.getElementById('umbrellaVisual');
  if (btnFoldUmbrella) {
    btnFoldUmbrella.addEventListener('click', () => {
      umbrellaVisual.textContent = "🚶‍♂️ Melangkah dengan Senyum & Jiwa Mandiri";
      completeScene(28, "Melangkah Sopan Tanpa Baper Berlebih! 🚶‍♂️");
    });
  }
  const btnNext28 = document.getElementById('btn-next-28');
  if (btnNext28) btnNext28.addEventListener('click', () => goToScene(29));

  // ── SCENE 29: SILVER KEY LOCK ──
  const btnSilverKey = document.getElementById('btnSilverKey');
  const rustyLock = document.getElementById('rustyLock');
  if (btnSilverKey) {
    btnSilverKey.addEventListener('click', () => {
      rustyLock.textContent = "🔓 Gerbang Terbuka Menuju Taman Harapan Baru";
      completeScene(29, "Pintu Terbuka untuk Ketulusan Baru! 🗝️");
    });
  }
  const btnNext29 = document.getElementById('btn-next-29');
  if (btnNext29) btnNext29.addEventListener('click', () => goToScene(30));

  // ── SCENE 30: FOOTSTEPS (3 langkah) ──
  let stepsCount = 0;
  const footstepDots = document.querySelectorAll('.footstep-dot');
  const selfHugIcon = document.getElementById('selfHugIcon');
  const st30 = document.getElementById('st-30');
  footstepDots.forEach(dot => {
    dot.addEventListener('click', () => {
      if (dot.classList.contains('stepped')) return;
      dot.classList.add('stepped');
      stepsCount++;
      playTone(400 + stepsCount * 60, 0.15, 'triangle');
      st30.textContent = `Jejak terinjak: ${stepsCount} / 3`;
      if (stepsCount >= 3) {
        selfHugIcon.classList.remove('hidden');
        completeScene(30, "Kamu Memeluk Dirimu Sendiri dengan Bangga! 🫂");
      }
    });
  });
  const btnNext30 = document.getElementById('btn-next-30');
  if (btnNext30) btnNext30.addEventListener('click', () => goToScene(31));

  // ── SCENE 31: SHIELD ACTIVATION ──
  const btnActivateShield = document.getElementById('btnActivateShield');
  if (btnActivateShield) {
    btnActivateShield.addEventListener('click', () => {
      btnActivateShield.textContent = "✨ Perisai Emas Aktif Melindungi Langkahmu";
      completeScene(31, "Hikmah Penjagaan Tuhan Terpancar Nyata! 🛡️");
    });
  }
  const btnNext31 = document.getElementById('btn-next-31');
  if (btnNext31) btnNext31.addEventListener('click', () => goToScene(32));

  // ── SCENE 32: RELEASE SKY LANTERN ──
  const btnReleaseLantern = document.getElementById('btnReleaseLantern');
  const skyLantern = document.getElementById('skyLantern');
  if (btnReleaseLantern) {
    btnReleaseLantern.addEventListener('click', () => {
      skyLantern.style.transform = 'translateY(-60px) scale(0.8)';
      skyLantern.style.opacity = '0.5';
      completeScene(32, "Lampion Rindu Melayang Damai ke Semesta! 🏮");
    });
  }
  const btnNext32 = document.getElementById('btn-next-32');
  if (btnNext32) btnNext32.addEventListener('click', () => goToScene(33));

  // ── SCENE 33: SIT BENCH ──
  const btnSitBench = document.getElementById('btnSitBench');
  const runnerState = document.getElementById('runnerState');
  if (btnSitBench) {
    btnSitBench.addEventListener('click', () => {
      runnerState.textContent = "🪑 Duduk Santai Tersenyum Menatap Danau Senja";
      completeScene(33, "Kelegaan Berhenti Mengejar yang Berlari! 🪑");
    });
  }
  const btnNext33 = document.getElementById('btn-next-33');
  if (btnNext33) btnNext33.addEventListener('click', () => goToScene(34));

  // ── SCENE 34: PET CAT (3x) ──
  let petCount = 0;
  const btnPetCat = document.getElementById('btnPetCat');
  const catPurr = document.getElementById('catPurr');
  const st34 = document.getElementById('st-34');
  if (btnPetCat) {
    btnPetCat.addEventListener('click', () => {
      petCount++;
      playTone(500 + petCount * 80, 0.2, 'sine');
      st34.textContent = `Elusan: ${petCount} / 3`;
      btnPetCat.textContent = `🐾 Elus Kucing Hangat (${petCount}/3)`;
      if (petCount >= 3) {
        catPurr.textContent = "Purrr... Mendengkur Hangat Penuh Damai 🐱❤️";
        completeScene(34, "Kedamaian & Ketenangan Jiwa Terwujud! 🐾");
      }
    });
  }
  const btnNext34 = document.getElementById('btn-next-34');
  if (btnNext34) btnNext34.addEventListener('click', () => goToScene(35));

  // ── SCENE 35: SURAT CINTA BUCIN & HUJAN HATI ──
  const bucinEnvelope = document.getElementById('bucinEnvelope');
  const bucinLetter = document.getElementById('bucinLetter');

  if (bucinEnvelope) {
    bucinEnvelope.addEventListener('click', () => {
      bucinEnvelope.classList.add('open');
      if (bucinLetter) bucinLetter.classList.add('show');
      playTone(659, 0.3, 'sine');
      setTimeout(() => playTone(880, 0.35, 'sine'), 120);
      spawnHeartBurst(30);
      completeScene(35, "Surat cinta terbuka — cinta itu layak diperjuangkan 💌");
    });
  }

  // Badge emosi bucin → nada + burst hati
  const bucinBadges = document.querySelectorAll('.bucin-badge');
  bucinBadges.forEach((badge) => {
    badge.addEventListener('click', () => {
      const tone = parseInt(badge.dataset.tone, 10) || 660;
      playTone(tone, 0.3, 'sine');
      spawnHeartBurst(18);
    });
  });

  const btnRestart = document.getElementById('btnRestart');
  if (btnRestart) {
    btnRestart.addEventListener('click', () => {
      goToScene(0);
      showToast("Kembali ke lembaran awal ✨");
    });
  }
}

/* ── HUJAN HATI (CANVAS) SCENE 35 ── */
function initHeartRain() {
  const canvas = document.getElementById('heartRainCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let hearts = [];
  let rafId = null;
  let isActive = false;

  function resize() {
    const rect = canvas.parentElement.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
  }

  function createHeart() {
    return {
      x: Math.random() * canvas.width,
      y: canvas.height + Math.random() * 60,
      size: 8 + Math.random() * 14,
      speed: 0.5 + Math.random() * 1.2,
      drift: (Math.random() - 0.5) * 0.6,
      angle: Math.random() * Math.PI * 2,
      spin: (Math.random() - 0.5) * 0.02,
      alpha: 0.25 + Math.random() * 0.5,
      hue: Math.random() > 0.5 ? 340 : 320
    };
  }

  function drawHeart(h) {
    ctx.save();
    ctx.translate(h.x, h.y);
    ctx.rotate(h.angle);
    ctx.globalAlpha = h.alpha;
    ctx.fillStyle = `hsl(${h.hue}, 85%, 70%)`;
    ctx.beginPath();
    const s = h.size;
    ctx.moveTo(0, s * 0.3);
    ctx.bezierCurveTo(0, 0, -s * 0.5, 0, -s * 0.5, s * 0.3);
    ctx.bezierCurveTo(-s * 0.5, s * 0.7, 0, s, 0, s * 1.2);
    ctx.bezierCurveTo(0, s, s * 0.5, s * 0.7, s * 0.5, s * 0.3);
    ctx.bezierCurveTo(s * 0.5, 0, 0, 0, 0, s * 0.3);
    ctx.fill();
    ctx.restore();
  }

  function loop() {
    if (!isActive) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (hearts.length < 40) hearts.push(createHeart());
    hearts.forEach((h) => {
      h.y -= h.speed;
      h.x += h.drift;
      h.angle += h.spin;
      drawHeart(h);
    });
    hearts = hearts.filter((h) => h.y > -40);
    rafId = requestAnimationFrame(loop);
  }

  function start() {
    if (isActive) return;
    isActive = true;
    resize();
    loop();
  }

  function stop() {
    isActive = false;
    if (rafId) cancelAnimationFrame(rafId);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  window.addEventListener('resize', () => {
    if (isActive) resize();
  });

  return { start, stop };
}

let heartRain = null;

/* Ledakan hati sementara di canvas */
function spawnHeartBurst(count) {
  if (!heartRain) return;
  heartRain.start();
  setTimeout(() => {
    const scene35 = document.querySelector('.scene[data-scene="35"]');
    if (scene35 && !scene35.classList.contains('active')) heartRain.stop();
  }, 4000);
}

/* ══════════════════════════════════════
   MODAL DAFTAR ISI (TOC)
   ══════════════════════════════════════ */
function renderTOC() {
  tocGrid.innerHTML = '';
  SCENE_TITLES.forEach((title, idx) => {
    const btn = document.createElement('button');
    btn.className = 'toc-btn-item';
    if (idx === currentIndex) btn.classList.add('active');

    // Cek apakah sudah diselesaikan
    const isUnlocked = idx === 0 || completedScenes.has(idx - 1) || completedScenes.has(idx);
    btn.disabled = !isUnlocked;

    const check = completedScenes.has(idx) ? '✓ ' : '';
    btn.textContent = `${check}${title}`;

    btn.addEventListener('click', () => {
      closeTOC();
      goToScene(idx);
    });

    tocGrid.appendChild(btn);
  });
}

function openTOC() {
  renderTOC();
  tocOverlay.classList.add('open');
  tocOverlay.setAttribute('aria-hidden', 'false');
}

function closeTOC() {
  tocOverlay.classList.remove('open');
  tocOverlay.setAttribute('aria-hidden', 'true');
}

/* ══════════════════════════════════════
   KEYBOARD & SWIPE NAVIGASI
   ══════════════════════════════════════ */
document.addEventListener('keydown', (e) => {
  if (tocOverlay.classList.contains('open')) {
    if (e.key === 'Escape') closeTOC();
    return;
  }
  if (e.key === 'ArrowRight' || e.key === ' ') {
    goNext();
  } else if (e.key === 'ArrowLeft') {
    goPrev();
  } else if (e.key === 'Escape') {
    openTOC();
  }
});

let touchStartX = 0;
let touchStartY = 0;
document.addEventListener('touchstart', (e) => {
  touchStartX = e.touches[0].clientX;
  touchStartY = e.touches[0].clientY;
  initAudio();
}, { passive: true });

document.addEventListener('touchend', (e) => {
  if (tocOverlay.classList.contains('open')) return;
  const dx = e.changedTouches[0].clientX - touchStartX;
  const dy = e.changedTouches[0].clientY - touchStartY;
  if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 50) {
    if (dx < 0) goNext();
    else goPrev();
  }
}, { passive: true });

/* ══════════════════════════════════════
   INIT UTAMA
   ══════════════════════════════════════ */
function init() {
  resizeCanvas();
  initParticles();
  animateBg();

  setupMiniGames();

  heartRain = initHeartRain();

  prevBtn.addEventListener('click', goPrev);
  nextBtn.addEventListener('click', goNext);
  tocToggle.addEventListener('click', openTOC);
  tocClose.addEventListener('click', closeTOC);
  tocOverlay.addEventListener('click', (e) => {
    if (e.target === tocOverlay) closeTOC();
  });

  updateHUD();

  window.addEventListener('resize', () => {
    resizeCanvas();
  }, { passive: true });

  document.addEventListener('click', initAudio, { once: true });
}

document.addEventListener('DOMContentLoaded', init);
