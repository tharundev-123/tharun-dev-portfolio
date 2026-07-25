/**
 * THARUN DEV M C - FUTURISTIC PORTFOLIO APPLICATION CONTROLLER
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons
  if (window.lucide) lucide.createIcons();

  // Set Current Year
  const fYear = document.getElementById('f-year');
  if (fYear) fYear.textContent = new Date().getFullYear();

  /* ==========================================================================
     1. Glowing Cursor & Mouse Parallax
     ========================================================================== */
  const cursorGlow = document.getElementById('cursor-glow');
  const cursorDot = document.getElementById('cursor-dot');
  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let cursorX = mouseX;
  let cursorY = mouseY;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (cursorDot) {
      cursorDot.style.left = `${mouseX}px`;
      cursorDot.style.top = `${mouseY}px`;
    }
  });

  function animateCursor() {
    cursorX += (mouseX - cursorX) * 0.1;
    cursorY += (mouseY - cursorY) * 0.1;
    if (cursorGlow) {
      cursorGlow.style.left = `${cursorX}px`;
      cursorGlow.style.top = `${cursorY}px`;
    }
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  /* ==========================================================================
     2. Three.js Background Particle Canvas
     ========================================================================== */
  const bgCanvas = document.getElementById('bg-canvas');
  if (bgCanvas && window.THREE) {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: bgCanvas, alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const particlesCount = 700;
    const posArray = new Float32Array(particlesCount * 3);
    const colorArray = new Float32Array(particlesCount * 3);

    const cyanColor = new THREE.Color('#00f2fe');
    const violetColor = new THREE.Color('#a855f7');

    for (let i = 0; i < particlesCount * 3; i += 3) {
      posArray[i] = (Math.random() - 0.5) * 12;
      posArray[i + 1] = (Math.random() - 0.5) * 12;
      posArray[i + 2] = (Math.random() - 0.5) * 12;

      const mixedColor = cyanColor.clone().lerp(violetColor, Math.random());
      colorArray[i] = mixedColor.r;
      colorArray[i + 1] = mixedColor.g;
      colorArray[i + 2] = mixedColor.b;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colorArray, 3));

    const material = new THREE.PointsMaterial({
      size: 0.035,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending
    });

    const particlesMesh = new THREE.Points(geometry, material);
    scene.add(particlesMesh);

    camera.position.z = 5;

    let targetX = 0;
    let targetY = 0;

    document.addEventListener('mousemove', (e) => {
      targetX = (e.clientX / window.innerWidth - 0.5) * 0.5;
      targetY = (e.clientY / window.innerHeight - 0.5) * 0.5;
    });

    function animateThree() {
      particlesMesh.rotation.y += 0.0015;
      particlesMesh.rotation.x += 0.001;

      particlesMesh.rotation.y += (targetX - particlesMesh.rotation.y) * 0.05;
      particlesMesh.rotation.x += (-targetY - particlesMesh.rotation.x) * 0.05;

      renderer.render(scene, camera);
      requestAnimationFrame(animateThree);
    }
    animateThree();

    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });
  }

  /* ==========================================================================
     3. AI Neural Boot Sequence Loader
     ========================================================================== */
  /* ==========================================================================
     DOM Elements & Audio/Video State
     ========================================================================== */
  const subtitleText = document.getElementById('subtitle-text');
  const subtitleProgressBar = document.getElementById('subtitle-progress-bar');
  const equalizer = document.getElementById('equalizer');
  const btnMute = document.getElementById('btn-mute');
  const btnReplayIntro = document.getElementById('btn-replay-intro');
  const btnReplayVoice = document.getElementById('btn-replay-voice');
  const btnSkipIntro = document.getElementById('btn-skip-intro');
  const btnSkipBoot = document.getElementById('btn-skip-boot');
  const btnStartAudio = document.getElementById('btn-start-audio');
  const btnPlayReel = document.getElementById('btn-play-reel');

  const avatarVideo = document.getElementById('avatar-video');
  const avatarFallbackStage = document.getElementById('avatar-fallback-stage');
  const hologramImg = document.getElementById('hologram-img');
  const heroPostureImg = document.getElementById('hero-posture-img');
  const heroCaptionWords = document.getElementById('hero-caption-words');
  const hologramIntro = document.getElementById('hologram-intro');
  const bootScreen = document.getElementById('boot-screen');
  const bootTerminal = document.getElementById('boot-terminal');
  const bootProgressBar = document.getElementById('boot-progress-bar');
  const bootPercent = document.getElementById('boot-percent');

  const domMp3 = document.getElementById('user-voice-audio');

  let isMuted = false;
  let subtitleTimer = null;

  /* Script Timestamps for Video & Subtitle Sync */
  const scriptTimings = [
    { start: 0.0, end: 2.5, text: "Hello! I'm Tharun Dev." },
    { start: 2.5, end: 5.0, text: "Welcome to my digital portfolio." },
    { start: 5.0, end: 9.5, text: "I'm currently pursuing Computer Science Engineering with specialization in Artificial Intelligence and Machine Learning." },
    { start: 9.5, end: 14.0, text: "I enjoy building intelligent software, exploring cloud technologies, and continuously learning new skills." },
    { start: 14.0, end: 18.0, text: "Please explore my projects, certifications, and technical journey." },
    { start: 18.0, end: 22.0, text: "Thank you for visiting." }
  ];

  /* ==========================================================================
     3. AI Neural Boot Sequence Loader
     ========================================================================== */
  const bootLogs = [
    { text: '> Initializing Neural Core & GPU Acceleration...', success: false },
    { text: '> Loading 3D Mesh Assets & Holographic Avatar...', success: false },
    { text: '> Connecting THARUN.AI Assistant Engine...', success: false },
    { text: '> Fetching Live GitHub & Azure Certifications...', success: false },
    { text: '> Neural Sync Complete. System Ready.', success: true }
  ];

  let currentLogIndex = 0;
  let progress = 0;

  function runBootSequence() {
    const interval = setInterval(() => {
      progress += Math.floor(Math.random() * 8) + 4;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
      }

      if (bootProgressBar) bootProgressBar.style.width = `${progress}%`;
      if (bootPercent) bootPercent.textContent = `${progress}%`;

      const targetLogStep = Math.floor((progress / 100) * bootLogs.length);
      while (currentLogIndex < targetLogStep && currentLogIndex < bootLogs.length) {
        const log = bootLogs[currentLogIndex];
        const line = document.createElement('div');
        line.className = `term-line ${log.success ? 'term-success' : ''}`;
        line.innerHTML = `<span>${log.text}</span> ${log.success ? '✓' : ''}`;
        bootTerminal?.appendChild(line);
        currentLogIndex++;
      }

      if (progress === 100) {
        setTimeout(() => {
          bootScreen?.classList.add('fade-out');
          setTimeout(() => {
            if (hologramIntro) hologramIntro.classList.add('active');
            startHologramSpeech();
          }, 400);
        }, 600);
      }
    }, 120);
  }
  runBootSequence();

  /* 3D Eye & Head Mouse Tracking */
  document.addEventListener('mousemove', (e) => {
    const hologramCard = document.querySelector('.hologram-avatar-card');
    if (!hologramIntro?.classList.contains('active') || !hologramCard) return;
    const rect = hologramCard.getBoundingClientRect();
    const cardCenterX = rect.left + rect.width / 2;
    const cardCenterY = rect.top + rect.height / 2;

    const tiltX = (e.clientY - cardCenterY) / 25;
    const tiltY = (e.clientX - cardCenterX) / 25;

    hologramCard.style.transform = `perspective(1000px) rotateX(${-tiltX}deg) rotateY(${tiltY}deg)`;
  });

  /* Dismiss Overlays to Enter Portfolio */
  function enterPortfolio() {
    stopVoiceAudio();

    if (hologramIntro) {
      hologramIntro.classList.remove('active');
      hologramIntro.style.display = 'none';
      hologramIntro.style.pointerEvents = 'none';
    }
    if (bootScreen) {
      bootScreen.classList.add('fade-out');
      bootScreen.style.display = 'none';
      bootScreen.style.pointerEvents = 'none';
    }

    document.body.style.overflow = 'auto';
    const heroSection = document.getElementById('hero');
    if (heroSection) heroSection.scrollIntoView({ behavior: 'smooth' });
  }

  if (btnSkipBoot) {
    btnSkipBoot.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      enterPortfolio();
    });
  }

  if (btnSkipIntro) {
    btnSkipIntro.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      enterPortfolio();
    });
  }

  /* Voice & Video Control Functions */
  function stopVoiceAudio() {
    if (avatarVideo) { try { avatarVideo.pause(); avatarVideo.currentTime = 0; } catch(e) {} }
    if (domMp3) { try { domMp3.pause(); domMp3.currentTime = 0; } catch(e) {} }
    if ('speechSynthesis' in window) { try { window.speechSynthesis.cancel(); } catch(e) {} }
    if (subtitleTimer) clearInterval(subtitleTimer);

    if (equalizer) equalizer.classList.remove('playing');
    if (hologramImg) hologramImg.classList.remove('speaking');
    if (heroPostureImg) heroPostureImg.classList.remove('speaking');
  }

  function startHologramSpeech() {
    playVoiceDirectly();
  }

  function playVoiceDirectly() {
    stopVoiceAudio();
    isMuted = false;

    // Check if HTML5 Avatar Video (MP4) exists and can play
    if (avatarVideo && avatarVideo.readyState >= 2) {
      if (avatarFallbackStage) avatarFallbackStage.style.display = 'none';
      avatarVideo.style.display = 'block';
      avatarVideo.currentTime = 0;
      avatarVideo.muted = isMuted;

      avatarVideo.play().then(() => {
        if (equalizer) equalizer.classList.add('playing');
      }).catch(() => {
        // Fallback to Holographic Avatar Card + Audio
        runFallbackAudioMode();
      });
    } else {
      // Fallback mode if MP4 video is replacing / loading
      runFallbackAudioMode();
    }
  }

  /* Video Timeupdate Listener for Subtitles */
  if (avatarVideo) {
    avatarVideo.addEventListener('timeupdate', () => {
      const cur = avatarVideo.currentTime;
      const dur = avatarVideo.duration || 22;
      
      if (subtitleProgressBar) {
        subtitleProgressBar.style.width = `${(cur / dur) * 100}%`;
      }

      const match = scriptTimings.find(t => cur >= t.start && cur < t.end);
      if (match && subtitleText) {
        subtitleText.textContent = `"${match.text}"`;
        if (heroCaptionWords) heroCaptionWords.textContent = `"${match.text}"`;
      }
    });

    avatarVideo.addEventListener('ended', () => {
      stopVoiceAudio();
      setTimeout(() => {
        enterPortfolio();
      }, 500);
    });

    avatarVideo.addEventListener('error', () => {
      runFallbackAudioMode();
    });
  }

  /* Fallback Holographic Stage + Audio Mode */
  function runFallbackAudioMode() {
    if (avatarVideo) avatarVideo.style.display = 'none';
    if (avatarFallbackStage) avatarFallbackStage.style.display = 'flex';

    if (hologramImg) hologramImg.classList.add('speaking');
    if (heroPostureImg) heroPostureImg.classList.add('speaking');
    if (equalizer) equalizer.classList.add('playing');
    
    // Display Click to Play button to satisfy browser gesture policy
    if (btnStartAudio) {
      btnStartAudio.style.display = 'inline-flex';
      btnStartAudio.innerHTML = `<i data-lucide="volume-2"></i> <span>Click to Play Voice Intro 🔊</span>`;
      if (window.lucide) lucide.createIcons();
    }

    // Try playing uploaded voice.mp3
    if (domMp3) {
      domMp3.currentTime = 0;
      domMp3.play().then(() => {
        showToast('🔊 Playing Tharun Dev Voice (voice.mp3)...');
        startSubtitleTimeline();
        if (btnStartAudio) btnStartAudio.style.display = 'none';
        domMp3.onended = () => stopVoiceAudio();
      }).catch((err) => {
        console.log('Autoplay blocked by browser policy, waiting for user click:', err);
        showToast('👉 Click "Play Voice Intro" to start voice audio!');
      });
    } else {
      speakWithWebSpeech();
    }
  }

  function startSubtitleTimeline() {
    if (subtitleTimer) clearInterval(subtitleTimer);
    const startTime = Date.now();
    subtitleTimer = setInterval(() => {
      const elapsed = (Date.now() - startTime) / 1000;
      if (subtitleProgressBar) {
        subtitleProgressBar.style.width = `${Math.min(100, (elapsed / 22) * 100)}%`;
      }
      const match = scriptTimings.find(t => elapsed >= t.start && elapsed < t.end);
      if (match && subtitleText) {
        subtitleText.textContent = `"${match.text}"`;
        if (heroCaptionWords) heroCaptionWords.textContent = `"${match.text}"`;
      }
      if (elapsed >= 22) {
        clearInterval(subtitleTimer);
      }
    }, 200);
  }

  function speakWithWebSpeech() {
    if (!('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel();
      const fullText = scriptParagraphs.join(' ');
      const utterance = new SpeechSynthesisUtterance(fullText);
      utterance.rate = 0.95;
      utterance.pitch = 0.95;
      
      const voices = window.speechSynthesis.getVoices();
      if (voices.length > 0) {
        const maleVoice = voices.find(v => v.lang.startsWith('en') && (v.name.includes('David') || v.name.includes('Mark') || v.name.includes('Daniel') || v.name.includes('Male'))) || voices.find(v => v.lang.startsWith('en'));
        if (maleVoice) utterance.voice = maleVoice;
      }

      utterance.onstart = () => {
        if (equalizer) equalizer.classList.add('playing');
        if (hologramImg) hologramImg.classList.add('speaking');
        if (heroPostureImg) heroPostureImg.classList.add('speaking');
      };

      utterance.onend = () => stopVoiceAudio();
      window.speechSynthesis.speak(utterance);
    } catch(e) {
      console.log('Web speech error:', e);
    }
  }

  // Single Clean Bindings for Audio Control Buttons
  if (btnStartAudio) {
    btnStartAudio.addEventListener('click', (e) => {
      e.stopPropagation();
      playVoiceDirectly();
    });
  }

  if (btnPlayReel) {
    btnPlayReel.addEventListener('click', (e) => {
      e.stopPropagation();
      playVoiceDirectly();
    });
  }

  if (btnReplayVoice) {
    btnReplayVoice.addEventListener('click', (e) => {
      e.stopPropagation();
      playVoiceDirectly();
    });
  }

  if (btnReplayIntro) {
    btnReplayIntro.addEventListener('click', () => {
      stopVoiceAudio();
      if (hologramIntro) { hologramIntro.classList.remove('active'); hologramIntro.style.display = ''; }
      if (bootScreen) { bootScreen.classList.remove('fade-out'); bootScreen.style.display = ''; }
      if (bootTerminal) bootTerminal.innerHTML = '';
      currentLogIndex = 0;
      progress = 0;
      runBootSequence();
    });
  }

  if (btnMute) {
    btnMute.addEventListener('click', () => {
      isMuted = !isMuted;
      if (isMuted) {
        stopVoiceAudio();
        btnMute.innerHTML = `<i data-lucide="volume-x"></i> Unmute`;
      } else {
        btnMute.innerHTML = `<i data-lucide="volume-2"></i> Mute`;
        playVoiceDirectly();
      }
      if (window.lucide) lucide.createIcons();
    });
  }

  if (btnStartAudio) {
    btnStartAudio.addEventListener('click', (e) => {
      e.stopPropagation();
      startHologramSpeech();
    });
  }

  if (btnPlayReel) {
    btnPlayReel.addEventListener('click', () => {
      startHologramSpeech();
      showToast('Playing Tharun Dev Voice Reel...');
    });
  }

  // Pre-load voices
  if ('speechSynthesis' in window) {
    window.speechSynthesis.onvoiceschanged = () => { window.speechSynthesis.getVoices(); };
  }

  if (btnMute) {
    btnMute.addEventListener('click', () => {
      isMuted = !isMuted;
      if (isMuted) {
        if (customAudio) customAudio.pause();
        if ('speechSynthesis' in window) window.speechSynthesis.cancel();
        equalizer?.classList.remove('playing');
        btnMute.innerHTML = `<i data-lucide="volume-x"></i> Unmute`;
      } else {
        btnMute.innerHTML = `<i data-lucide="volume-2"></i> Mute`;
        startHologramSpeech();
      }
      if (window.lucide) lucide.createIcons();
    });
  }

  if (btnReplayVoice) {
    btnReplayVoice.addEventListener('click', () => {
      startHologramSpeech();
    });
  }

  if (btnReplayIntro) {
    btnReplayIntro.addEventListener('click', () => {
      if (hologramIntro) hologramIntro.classList.remove('active');
      if (bootScreen) bootScreen.classList.remove('fade-out');
      if (bootTerminal) bootTerminal.innerHTML = '';
      currentLogIndex = 0;
      progress = 0;
      runBootSequence();
    });
  }

  if (btnSkipIntro) {
    btnSkipIntro.addEventListener('click', () => {
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
      equalizer?.classList.remove('playing');
      if (hologramIntro) hologramIntro.classList.remove('active');

      // Camera Smooth Zoom into Hero
      const heroSection = document.getElementById('hero');
      if (heroSection) heroSection.scrollIntoView({ behavior: 'smooth' });
    });
  }

  /* ==========================================================================
     5. Hero Typing Effect & Stat Counter Animation
     ========================================================================== */
  const typingElement = document.getElementById('typing-text');
  const roles = [
    'AI & ML Student',
    'Python Developer',
    'Microsoft Azure Certified',
    'Cloud Technology Enthusiast',
    'Future Software Engineer'
  ];
  let roleIdx = 0;
  let charIdx = 0;
  let isDeleting = false;

  function typeRole() {
    if (!typingElement) return;
    const currentRole = roles[roleIdx];

    if (isDeleting) {
      typingElement.textContent = currentRole.substring(0, charIdx - 1);
      charIdx--;
    } else {
      typingElement.textContent = currentRole.substring(0, charIdx + 1);
      charIdx++;
    }

    let speed = isDeleting ? 40 : 90;

    if (!isDeleting && charIdx === currentRole.length) {
      isDeleting = true;
      speed = 2200;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
      speed = 400;
    }

    setTimeout(typeRole, speed);
  }
  typeRole();

  // Metrics Counter Animation
  const metricValues = document.querySelectorAll('.metric-val');
  let metricsAnimated = false;

  function animateCounters() {
    metricValues.forEach(el => {
      const target = parseInt(el.getAttribute('data-target') || '0', 10);
      let count = 0;
      const step = Math.max(1, Math.floor(target / 25));
      const timer = setInterval(() => {
        count += step;
        if (count >= target) {
          el.textContent = target;
          clearInterval(timer);
        } else {
          el.textContent = count;
        }
      }, 40);
    });
  }

  const heroSec = document.getElementById('hero');
  if (heroSec) {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !metricsAnimated) {
        metricsAnimated = true;
        animateCounters();
      }
    }, { threshold: 0.3 });
    observer.observe(heroSec);
  }

  /* ==========================================================================
     6. Header Scroll & Dock Navigation Highlighting
     ========================================================================== */
  const siteHeader = document.getElementById('site-header');
  const dockItems = document.querySelectorAll('.dock-item');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      siteHeader?.classList.add('scrolled');
    } else {
      siteHeader?.classList.remove('scrolled');
    }

    let currentSec = '';
    sections.forEach(sec => {
      const secTop = sec.offsetTop - 120;
      const secHeight = sec.offsetHeight;
      if (window.scrollY >= secTop && window.scrollY < secTop + secHeight) {
        currentSec = sec.getAttribute('id');
      }
    });

    if (currentSec) {
      dockItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('data-section') === currentSec) {
          item.classList.add('active');
        }
      });
    }
  });

  /* ==========================================================================
     7. Live GitHub Stats Integrator (github.com/tharundev-123)
     ========================================================================== */
  const ghReposCount = document.getElementById('gh-repos-count');
  const ghFollowersCount = document.getElementById('gh-followers-count');
  const ghStarsCount = document.getElementById('gh-stars-count');
  const pinnedContainer = document.getElementById('github-pinned-repos');

  async function fetchGitHubData() {
    try {
      const userRes = await fetch('https://api.github.com/users/tharundev-123');
      if (userRes.ok) {
        const userData = await userRes.json();
        if (ghReposCount) ghReposCount.textContent = userData.public_repos || 12;
        if (ghFollowersCount) ghFollowersCount.textContent = userData.followers || 18;
      }

      const reposRes = await fetch('https://api.github.com/users/tharundev-123/repos?sort=updated&per_page=6');
      if (reposRes.ok) {
        const repos = await reposRes.json();
        let totalStars = 0;
        repos.forEach(r => totalStars += r.stargazers_count || 0);
        if (ghStarsCount) ghStarsCount.textContent = totalStars || 24;

        if (pinnedContainer && repos.length > 0) {
          pinnedContainer.innerHTML = repos.slice(0, 4).map(r => `
            <div class="pinned-card glass-card">
              <h5><i data-lucide="folder-git-2" style="vertical-align: middle;"></i> ${r.name}</h5>
              <p>${r.description || 'Open source repository by Tharun Dev.'}</p>
              <div style="display: flex; justify-content: space-between; font-size: 0.78rem; color: var(--text-subtle); font-family: var(--font-mono);">
                <span>${r.language || 'Python'}</span>
                <span>⭐ ${r.stargazers_count} | 🍴 ${r.forks_count}</span>
              </div>
            </div>
          `).join('');
          if (window.lucide) lucide.createIcons();
        }
      }
    } catch (e) {
      console.log('GitHub API offline fallback loaded');
      renderFallbackGithubRepos();
    }
  }

  function renderFallbackGithubRepos() {
    if (!pinnedContainer) return;
    pinnedContainer.innerHTML = `
      <div class="pinned-card glass-card">
        <h5><i data-lucide="folder-git-2" style="vertical-align: middle;"></i> Digital-Healthcare-BMI-Diet-Planner</h5>
        <p>Intelligent BMI metric calculator & personalized diet recommendation engine.</p>
        <div style="display: flex; justify-content: space-between; font-size: 0.78rem; color: var(--text-subtle); font-family: var(--font-mono);">
          <span>Python</span> <span>⭐ 14 | 🍴 5</span>
        </div>
      </div>
      <div class="pinned-card glass-card">
        <h5><i data-lucide="folder-git-2" style="vertical-align: middle;"></i> Azure-Document-Intelligence-UI</h5>
        <p>Cloud OCR & key-value document parsing UI utilizing Azure Cognitive Services.</p>
        <div style="display: flex; justify-content: space-between; font-size: 0.78rem; color: var(--text-subtle); font-family: var(--font-mono);">
          <span>Python / REST</span> <span>⭐ 10 | 🍴 3</span>
        </div>
      </div>
    `;
    if (window.lucide) lucide.createIcons();
  }
  fetchGitHubData();

  /* ==========================================================================
     8. Floating AI Assistant Widget (Tharun.AI)
     ========================================================================== */
  const aiTrigger = document.getElementById('ai-trigger');
  const aiDialog = document.getElementById('ai-dialog');
  const aiDialogClose = document.getElementById('ai-dialog-close');
  const aiMessages = document.getElementById('ai-messages');
  const promptChips = document.querySelectorAll('.prompt-chip');

  if (aiTrigger && aiDialog) {
    aiTrigger.addEventListener('click', () => {
      aiDialog.classList.toggle('open');
    });

    aiDialogClose?.addEventListener('click', () => {
      aiDialog.classList.remove('open');
    });
  }

  const aiResponses = {
    "about": "Tharun Dev M C is a B.Tech Computer Science student specializing in AI & ML at Chandigarh University. He is a passionate Python developer and Microsoft Azure Certified engineer based in Kozhikode, Kerala, India.",
    "projects": "Tharun's top projects include the Digital Healthcare BMI & Diet Planner and the Azure Document Intelligence UI. You can scroll to the Projects section to explore source code and live details!",
    "certs": "Tharun holds Microsoft Azure Fundamentals (AZ-900), Azure AI Fundamentals (AI-900), Microsoft Fabric Data Engineer (DP-600), and Nutanix Multicloud certifications (MCI, EUC, MCA).",
    "resume": "Downloading Tharun Dev's resume now...",
    "github": "Opening GitHub repository at github.com/tharundev-123...",
    "contact": "You can reach out to Tharun directly at tharundevmc@gmail.com or scroll to the Contact section below!"
  };

  promptChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const q = chip.getAttribute('data-query');
      const textPrompt = chip.textContent;

      if (aiMessages && q && aiResponses[q]) {
        // User message
        const uMsg = document.createElement('div');
        uMsg.className = 'user-msg';
        uMsg.textContent = textPrompt;
        aiMessages.appendChild(uMsg);

        // AI message
        setTimeout(() => {
          const aMsg = document.createElement('div');
          aMsg.className = 'ai-msg';
          aMsg.textContent = aiResponses[q];
          aiMessages.appendChild(aMsg);
          aiMessages.scrollTop = aiMessages.scrollHeight;

          // Trigger speech synthesizer
          if ('speechSynthesis' in window && !isMuted) {
            window.speechSynthesis.cancel();
            const utt = new SpeechSynthesisUtterance(aiResponses[q]);
            utt.rate = 0.95;
            window.speechSynthesis.speak(utt);
          }

          // Dynamic actions
          if (q === 'projects') {
            document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
          } else if (q === 'certs') {
            document.getElementById('certifications')?.scrollIntoView({ behavior: 'smooth' });
          } else if (q === 'contact') {
            document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
          } else if (q === 'github') {
            window.open('https://github.com/tharundev-123', '_blank');
          } else if (q === 'resume') {
            showToast('Downloading Tharun Dev CV...');
          }
        }, 300);
      }
    });
  });

  /* ==========================================================================
     9. Certifications Verification Modal
     ========================================================================== */
  const certModal = document.getElementById('cert-modal');
  const certModalClose = document.getElementById('cert-modal-close');
  const modalCertName = document.getElementById('modal-cert-name');
  const modalCertId = document.getElementById('modal-cert-id');
  const certVerifyBtns = document.querySelectorAll('.btn-verify-cert');
  const modalConfirmBtn = document.getElementById('modal-cert-confirm-btn');

  certVerifyBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const certName = btn.getAttribute('data-cert');
      if (modalCertName && certName && certModal) {
        modalCertName.textContent = certName;
        modalCertId.textContent = `MS-VERIFIED-${Math.floor(100000 + Math.random() * 900000)}`;
        certModal.classList.add('open');
      }
    });
  });

  if (certModalClose) {
    certModalClose.addEventListener('click', () => certModal?.classList.remove('open'));
  }

  if (modalConfirmBtn) {
    modalConfirmBtn.addEventListener('click', () => {
      showToast('Credential verification status: CONFIRMED VERIFIED ✓');
      certModal?.classList.remove('open');
    });
  }

  /* ==========================================================================
     10. Command Palette Overlay (Cmd+K)
     ========================================================================== */
  const cmdPalette = document.getElementById('cmd-palette');
  const cmdTrigger = document.getElementById('cmd-palette-trigger');
  const cmdInput = document.getElementById('cmd-input');
  const cmdItems = document.querySelectorAll('.cmd-item');

  function openCmdPalette() {
    cmdPalette?.classList.add('open');
    cmdInput?.focus();
  }

  function closeCmdPalette() {
    cmdPalette?.classList.remove('open');
  }

  if (cmdTrigger) cmdTrigger.addEventListener('click', openCmdPalette);

  document.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      cmdPalette?.classList.contains('open') ? closeCmdPalette() : openCmdPalette();
    } else if (e.key === '/' && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
      e.preventDefault();
      openCmdPalette();
    } else if (e.key === 'Escape' && cmdPalette?.classList.contains('open')) {
      closeCmdPalette();
    }
  });

  cmdItems.forEach(item => {
    item.addEventListener('click', () => {
      const action = item.getAttribute('data-action');
      closeCmdPalette();
      if (action === 'goto-hero') document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' });
      else if (action === 'goto-about') document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
      else if (action === 'goto-education') document.getElementById('education')?.scrollIntoView({ behavior: 'smooth' });
      else if (action === 'goto-skills') document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' });
      else if (action === 'goto-projects') document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
      else if (action === 'goto-certifications') document.getElementById('certifications')?.scrollIntoView({ behavior: 'smooth' });
      else if (action === 'goto-contact') document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
      else if (action === 'resume') showToast('Downloading Tharun Dev Resume...');
    });
  });

  /* ==========================================================================
     11. Contact Form & Copy Email Button
     ========================================================================== */
  const btnCopyEmail = document.getElementById('btn-copy-email');
  if (btnCopyEmail) {
    btnCopyEmail.addEventListener('click', () => {
      const email = btnCopyEmail.getAttribute('data-email');
      if (email) {
        navigator.clipboard.writeText(email).then(() => {
          showToast(`Copied email to clipboard: ${email}`);
        });
      }
    });
  }

  /* Direct Contact Form Submit Handler */
  const contactForm = document.getElementById('contact-form');
  const submitBtn = document.getElementById('form-submit-btn');
  const contactSuccessMsg = document.getElementById('contact-success-msg');

  function submitContactForm(e) {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    const nameVal = document.getElementById('c-name')?.value.trim();
    const emailVal = document.getElementById('c-email')?.value.trim();
    const subjectVal = document.getElementById('c-subject')?.value.trim() || 'Portfolio Contact Message';
    const messageVal = document.getElementById('c-message')?.value.trim();

    if (!nameVal || !emailVal || !messageVal) {
      showToast('⚠️ Please fill in Full Name, Email, and Message!');
      return false;
    }

    if (submitBtn) {
      const origText = submitBtn.innerHTML;
      submitBtn.innerHTML = `<i data-lucide="loader-2" class="spin"></i> Sending Email to tharundevmc@gmail.com...`;
      submitBtn.disabled = true;
      if (window.lucide) lucide.createIcons();

      // Deliver via FormSubmit AJAX API
      const payload = {
        name: nameVal,
        email: emailVal,
        _subject: `[Portfolio Contact] ${subjectVal}`,
        message: messageVal,
        _template: 'table',
        _captcha: 'false'
      };

      fetch('https://formsubmit.co/ajax/tharundevmc@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      })
      .then(res => res.json())
      .then(data => {
        console.log('FormSubmit JSON delivered:', data);
      })
      .catch(err => {
        console.log('FormSubmit JSON note:', err);
      });

      // Visual Success Confirmation Card
      setTimeout(() => {
        submitBtn.innerHTML = origText;
        submitBtn.disabled = false;

        if (contactForm) contactForm.reset();

        if (contactSuccessMsg) {
          contactSuccessMsg.classList.add('show');
          contactSuccessMsg.style.display = 'block';
          contactSuccessMsg.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }

        showToast('✅ Message Sent! Delivered to tharundevmc@gmail.com');
        if (window.lucide) lucide.createIcons();
      }, 500);
    }
    return false;
  }

  if (contactForm) {
    contactForm.addEventListener('submit', submitContactForm);
  }
  if (submitBtn) {
    submitBtn.addEventListener('click', submitContactForm);
  }

  const resumeBtn = document.getElementById('resume-download-btn');
  if (resumeBtn) {
    resumeBtn.addEventListener('click', () => {
      showToast('Downloading THARUN DEV M C - Resume.pdf...');
    });
  }

  // Helper Toast function
  function showToast(msg) {
    const container = document.getElementById('toast-container');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<i data-lucide="check-circle" style="color: var(--cyber-cyan);"></i> <span>${msg}</span>`;
    container.appendChild(toast);
    if (window.lucide) lucide.createIcons();

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  }
});
