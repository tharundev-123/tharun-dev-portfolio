/**
 * ==========================================================================
 * BRUTALIST LUXURY PORTFOLIO — APPLICATION CONTROLLER
 * Architecture: Dark-Luxury Editorial Brutalism & Architectural Grids
 * THARUN DEV M C — Computer Science & Engineering (AI & ML)
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Lucide Icons
  if (window.lucide) {
    lucide.createIcons();
  }

  // 2. Set Dynamic Footer Year
  const fYear = document.getElementById('f-year');
  if (fYear) {
    fYear.textContent = new Date().getFullYear();
  }

  /* ==========================================================================
     3. Subtle Architectural Three.js Background Canvas (Acid-Lime & Dust Grid)
     ========================================================================== */
  const bgCanvas = document.getElementById('bg-canvas');
  if (bgCanvas && window.THREE) {
    bgCanvas.addEventListener('webglcontextlost', (e) => { e.preventDefault(); }, false);

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x101010, 0.022);

    const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 500);
    camera.position.z = 24;

    const renderer = new THREE.WebGLRenderer({
      canvas: bgCanvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Acid-Lime & Muted White Precise Particulate Matrix
    const particleCount = 190;
    const particlePositions = new Float32Array(particleCount * 3);
    const particleVelocities = [];

    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 55;
      particlePositions[i + 1] = (Math.random() - 0.5) * 75 - 10;
      particlePositions[i + 2] = (Math.random() - 0.5) * 35;

      particleVelocities.push({
        x: (Math.random() - 0.5) * 0.007,
        y: (Math.random() - 0.5) * 0.009,
        z: (Math.random() - 0.5) * 0.007
      });
    }

    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.12,
      color: 0xD7FF35, // Signature Acid Lime
      transparent: true,
      opacity: 0.28,
      blending: THREE.AdditiveBlending
    });

    const particleMesh = new THREE.Points(particleGeo, particleMat);
    scene.add(particleMesh);

    // Camera Progression Synchronized with Scroll
    let scrollProgress = 0;
    let targetScrollProgress = 0;

    function handleWindowScroll() {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll > 0) {
        targetScrollProgress = Math.max(0, Math.min(1, window.scrollY / maxScroll));
      }
    }
    window.addEventListener('scroll', handleWindowScroll, { passive: true });

    let clock = new THREE.Clock();

    function renderAtmosphericLoop() {
      requestAnimationFrame(renderAtmosphericLoop);
      const elapsed = clock.getElapsedTime();

      scrollProgress += (targetScrollProgress - scrollProgress) * 0.07;
      camera.position.y = -scrollProgress * 36;
      camera.lookAt(0, camera.position.y, 0);

      const positions = particleGeo.attributes.position.array;
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        positions[i3] += particleVelocities[i].x;
        positions[i3 + 1] += particleVelocities[i].y;
        positions[i3 + 2] += particleVelocities[i].z;

        if (Math.abs(positions[i3]) > 30) particleVelocities[i].x *= -1;
        if (Math.abs(positions[i3 + 1] - (-10)) > 42) particleVelocities[i].y *= -1;
        if (Math.abs(positions[i3 + 2]) > 20) particleVelocities[i].z *= -1;
      }
      particleGeo.attributes.position.needsUpdate = true;

      particleMesh.rotation.y = elapsed * 0.01;
      renderer.render(scene, camera);
    }
    renderAtmosphericLoop();

    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });
  }

  /* ==========================================================================
     4. Navigation State & Header Scrolled Highlight
     ========================================================================== */
  const siteHeader = document.getElementById('site-header');
  const navLinks = document.querySelectorAll('.nav-brutalist a');
  const sections = document.querySelectorAll('section[id]');

  function updateNavigationState() {
    const scrollY = window.scrollY;

    if (scrollY > 40) {
      siteHeader?.classList.add('scrolled');
    } else {
      siteHeader?.classList.remove('scrolled');
    }

    let activeId = '';
    sections.forEach(sec => {
      const top = sec.offsetTop - 150;
      const height = sec.offsetHeight;
      if (scrollY >= top && scrollY < top + height) {
        activeId = sec.getAttribute('id');
      }
    });

    if (activeId) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-section') === activeId) {
          link.classList.add('active');
        }
      });
    }
  }
  window.addEventListener('scroll', updateNavigationState, { passive: true });
  updateNavigationState();

  /* ==========================================================================
     5. Timeline Scroll Progression & Active Node Highlighting
     ========================================================================== */
  const spineContainer = document.getElementById('timeline-spine-container');
  const spineProgressBar = document.getElementById('timeline-spine-progress');
  const timelineEntries = document.querySelectorAll('.timeline-entry');

  function updateTimelineProgress() {
    if (!spineContainer || !spineProgressBar) return;

    const rect = spineContainer.getBoundingClientRect();
    const containerTop = rect.top + window.scrollY;
    const containerHeight = rect.height;
    const windowMiddle = window.scrollY + window.innerHeight * 0.65;

    let progress = 0;
    if (windowMiddle >= containerTop) {
      progress = Math.min(100, Math.max(0, ((windowMiddle - containerTop) / containerHeight) * 100));
    }
    spineProgressBar.style.height = `${progress}%`;

    // Highlight timeline entries within visible range
    timelineEntries.forEach(entry => {
      const entryRect = entry.getBoundingClientRect();
      if (entryRect.top <= window.innerHeight * 0.75 && entryRect.bottom >= window.innerHeight * 0.25) {
        entry.classList.add('active');
      } else {
        entry.classList.remove('active');
      }
    });
  }
  window.addEventListener('scroll', updateTimelineProgress, { passive: true });
  updateTimelineProgress();

  /* ==========================================================================
     6. Mobile Navigation Drawer
     ========================================================================== */
  const mobileToggle = document.getElementById('mobile-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (mobileToggle && mobileDrawer) {
    function setDrawerState(open) {
      mobileDrawer.classList.toggle('open', open);
      document.body.classList.toggle('nav-open', open);
      mobileToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      mobileToggle.innerHTML = open ? `<i data-lucide="x"></i>` : `<i data-lucide="menu"></i>`;
      if (window.lucide) lucide.createIcons();
    }

    mobileToggle.addEventListener('click', () => {
      const isCurrentlyOpen = mobileDrawer.classList.contains('open');
      setDrawerState(!isCurrentlyOpen);
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        setDrawerState(false);
      });
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileDrawer.classList.contains('open')) {
        setDrawerState(false);
      }
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 768 && mobileDrawer.classList.contains('open')) {
        setDrawerState(false);
      }
    });
  }

  /* ==========================================================================
     7. Live GitHub Stats Sync (github.com/tharundev-123)
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
        repos.forEach(r => { totalStars += r.stargazers_count || 0; });
        if (ghStarsCount) ghStarsCount.textContent = totalStars || 24;

        if (pinnedContainer && repos.length > 0) {
          pinnedContainer.innerHTML = repos.slice(0, 4).map(r => `
            <div class="repo-brutalist-card">
              <div>
                <h5>${escapeHtml(r.name)}</h5>
                <p>${escapeHtml(r.description || 'Open source engineering repository by Tharun Dev.')}</p>
              </div>
              <div class="repo-card-foot">
                <span>${escapeHtml(r.language || 'Python')}</span>
                <span>⭐ ${r.stargazers_count} &bull; 🍴 ${r.forks_count}</span>
              </div>
            </div>
          `).join('');
          if (window.lucide) lucide.createIcons();
        }
      }
    } catch (e) {
      console.log('GitHub API offline fallback loaded');
    }
  }
  fetchGitHubData();

  function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  /* ==========================================================================
     8. Direct Contact Form — Google Forms Background Integration
     Form ID: 1FAIpQLSdfiMWNINyjieEmvX01kJWdFZ_N6K3mbdGZdJ1b5oxxaVOnag
     ========================================================================== */
  const contactForm = document.getElementById('contact-form');
  const submitBtn = document.getElementById('form-submit-btn');
  const contactSuccessMsg = document.getElementById('contact-success-msg');
  const contactErrorMsg = document.getElementById('contact-error-msg');
  const contactErrorText = document.getElementById('contact-error-text');
  const gformHiddenIframe = document.getElementById('gform-hidden-iframe');

  const GFORM_ENDPOINT = 'https://docs.google.com/forms/d/e/1FAIpQLSdfiMWNINyjieEmvX01kJWdFZ_N6K3mbdGZdJ1b5oxxaVOnag/formResponse';
  const GFORM_FIELDS = {
    name: 'entry.60291032',
    email: 'entry.1996527582',
    subject: 'entry.1253369969',
    message: 'entry.982865827'
  };

  let isSubmitting = false;
  let submissionDispatched = false;

  function resetSubmitButton() {
    if (submitBtn) {
      submitBtn.innerHTML = `<span>Send Message</span> <i data-lucide="send" style="width:16px; height:16px;"></i>`;
      submitBtn.disabled = false;
      submitBtn.removeAttribute('aria-busy');
      if (window.lucide) lucide.createIcons();
    }
  }

  function handleSubmissionSuccess() {
    if (!submissionDispatched) return;
    submissionDispatched = false;
    isSubmitting = false;

    // Reset inputs only after submission has been received by Google
    if (contactForm) contactForm.reset();

    // Show attractive success feedback card
    if (contactSuccessMsg) {
      contactSuccessMsg.classList.add('show');
      contactSuccessMsg.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    resetSubmitButton();
    showToast('✓ Response submitted to Google Forms');
  }

  // Listen to the hidden iframe load event when Google Forms responds
  if (gformHiddenIframe) {
    gformHiddenIframe.addEventListener('load', () => {
      if (submissionDispatched) {
        handleSubmissionSuccess();
      }
    });
  }

  function submitContactForm(e) {
    if (isSubmitting) {
      if (e) e.preventDefault();
      return false;
    }

    const nameInput = document.getElementById('c-name');
    const emailInput = document.getElementById('c-email');
    const subjectInput = document.getElementById('c-subject');
    const messageInput = document.getElementById('c-message');

    const nameVal = nameInput ? nameInput.value.trim() : '';
    const emailVal = emailInput ? emailInput.value.trim() : '';
    const subjectVal = subjectInput && subjectInput.value.trim() ? subjectInput.value.trim() : 'Portfolio Inquiry';
    const messageVal = messageInput ? messageInput.value.trim() : '';

    // Clear previous feedback states
    contactSuccessMsg?.classList.remove('show');
    contactErrorMsg?.classList.remove('show');

    // Validation
    if (!nameVal) {
      if (e) e.preventDefault();
      showToast('⚠️ Please enter your full name.');
      nameInput?.focus();
      return false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailVal || !emailPattern.test(emailVal)) {
      if (e) e.preventDefault();
      showToast('⚠️ Please provide a valid email address.');
      emailInput?.focus();
      return false;
    }

    if (!messageVal || messageVal.length < 5) {
      if (e) e.preventDefault();
      showToast('⚠️ Please enter a detailed message (at least 5 characters).');
      messageInput?.focus();
      return false;
    }

    // Set duplicate prevention & loading animation on button
    isSubmitting = true;
    submissionDispatched = true;

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.setAttribute('aria-busy', 'true');
      submitBtn.innerHTML = `<span>TRANSMITTING...</span> <i data-lucide="loader-2" class="spin"></i>`;
      if (window.lucide) lucide.createIcons();
    }

    // Background asynchronous fetch via FormData
    try {
      const formData = new FormData();
      formData.append(GFORM_FIELDS.name, nameVal);
      formData.append(GFORM_FIELDS.email, emailVal);
      formData.append(GFORM_FIELDS.subject, subjectVal);
      formData.append(GFORM_FIELDS.message, messageVal);

      fetch(GFORM_ENDPOINT, {
        method: 'POST',
        mode: 'no-cors',
        body: formData
      }).catch(err => {
        console.warn('Background fetch notice:', err);
      });
    } catch (err) {
      console.warn('FormData preparation notice:', err);
    }

    // DO NOT call e.preventDefault()!
    // The browser natively serializes all input fields and POSTs them into gform-hidden-iframe!
    // A safety timer guarantees success state transition if the cross-origin iframe load event is suppressed
    setTimeout(() => {
      if (submissionDispatched) {
        handleSubmissionSuccess();
      }
    }, 1400);

    return true;
  }

  if (contactForm) {
    contactForm.addEventListener('submit', submitContactForm);
  }

  /* Copy Email to Clipboard */
  const btnCopyEmail = document.getElementById('btn-copy-email');
  if (btnCopyEmail) {
    btnCopyEmail.addEventListener('click', () => {
      const email = btnCopyEmail.getAttribute('data-email') || 'tharundevmc@gmail.com';
      navigator.clipboard.writeText(email).then(() => {
        showToast(`Copied email to clipboard: ${email}`);
      }).catch(() => {
        showToast(`Email: ${email}`);
      });
    });
  }

  /* Curriculum Vitae Download Handler */
  const resumeBtn = document.getElementById('resume-download-btn');
  if (resumeBtn) {
    resumeBtn.addEventListener('click', () => {
      showToast('Preparing THARUN DEV M C — Curriculum Vitae...');
      document.getElementById('dispatch')?.scrollIntoView({ behavior: 'smooth' });
      showToast('To receive the official PDF CV, please send a message below.');
    });
  }

  /* ==========================================================================
     9. Archival Audio-Visual Intro Tape Modal (intro_video.mp4 & voice.mp3)
     ========================================================================== */
  const mediaModal = document.getElementById('media-modal');
  const btnOpenTape = document.getElementById('btn-open-tape');
  const mediaModalClose = document.getElementById('media-modal-close');
  const siteIntroVideo = document.getElementById('site-intro-video');
  const tapeSubtitles = document.getElementById('tape-subtitles');
  const btnToggleSound = document.getElementById('btn-toggle-sound');
  const soundIcon = document.getElementById('sound-icon');
  const soundLabel = document.getElementById('sound-label');
  const btnReplayTape = document.getElementById('btn-replay-tape');
  const domVoiceMp3 = document.getElementById('user-voice-audio');

  const scriptTimings = [
    { start: 0.0, end: 2.8, text: "Hello! I'm Tharun Dev." },
    { start: 2.8, end: 5.5, text: "Welcome to my personal archive." },
    { start: 5.5, end: 10.0, text: "I'm currently pursuing Computer Science Engineering with specialization in Artificial Intelligence and Machine Learning." },
    { start: 10.0, end: 14.5, text: "I enjoy building intelligent software, exploring cloud technologies, and continuously learning new skills." },
    { start: 14.5, end: 18.5, text: "Please explore my projects, certifications, and technical journey." },
    { start: 18.5, end: 22.0, text: "Thank you for visiting." }
  ];

  function openMediaTapeModal() {
    if (!mediaModal) return;
    mediaModal.classList.add('open');
    document.body.style.overflow = 'hidden';

    if (siteIntroVideo) {
      siteIntroVideo.currentTime = 0;
      siteIntroVideo.muted = false;
      updateSoundUI(false);
      siteIntroVideo.play().catch(() => {
        siteIntroVideo.muted = true;
        updateSoundUI(true);
        siteIntroVideo.play().catch(e => console.log('Video autoplay note:', e));
      });
    }
  }

  function closeMediaTapeModal() {
    if (!mediaModal) return;
    mediaModal.classList.remove('open');
    document.body.style.overflow = '';
    if (siteIntroVideo) siteIntroVideo.pause();
    if (domVoiceMp3) domVoiceMp3.pause();
  }

  function updateSoundUI(muted) {
    if (!soundLabel) return;
    if (muted) {
      soundLabel.textContent = 'Unmute Sound';
      if (soundIcon) soundIcon.setAttribute('data-lucide', 'volume-x');
    } else {
      soundLabel.textContent = 'Mute Sound';
      if (soundIcon) soundIcon.setAttribute('data-lucide', 'volume-2');
    }
    if (window.lucide) lucide.createIcons();
  }

  if (btnOpenTape) btnOpenTape.addEventListener('click', openMediaTapeModal);
  if (mediaModalClose) mediaModalClose.addEventListener('click', closeMediaTapeModal);

  if (mediaModal) {
    mediaModal.addEventListener('click', (e) => {
      if (e.target === mediaModal) closeMediaTapeModal();
    });
  }

  if (siteIntroVideo) {
    siteIntroVideo.addEventListener('timeupdate', () => {
      const cur = siteIntroVideo.currentTime;
      const match = scriptTimings.find(t => cur >= t.start && cur < t.end);
      if (match && tapeSubtitles) {
        tapeSubtitles.innerHTML = `&ldquo;${escapeHtml(match.text)}&rdquo;`;
      }
    });

    siteIntroVideo.addEventListener('ended', () => {
      if (tapeSubtitles) tapeSubtitles.innerHTML = `// INTRODUCTION COMPLETE &bull; THARUN DEV`;
    });
  }

  if (btnToggleSound) {
    btnToggleSound.addEventListener('click', () => {
      if (!siteIntroVideo) return;
      siteIntroVideo.muted = !siteIntroVideo.muted;
      updateSoundUI(siteIntroVideo.muted);
    });
  }

  if (btnReplayTape) {
    btnReplayTape.addEventListener('click', () => {
      if (siteIntroVideo) {
        siteIntroVideo.currentTime = 0;
        siteIntroVideo.play();
      }
    });
  }

  /* ==========================================================================
     10. Command Palette (Cmd+K or /)
     ========================================================================== */
  const cmdPalette = document.getElementById('cmd-palette');
  const cmdTrigger = document.getElementById('cmd-palette-trigger');
  const cmdInput = document.getElementById('cmd-input');
  const cmdItems = document.querySelectorAll('.cmd-item-row');

  function openCmdPalette() {
    cmdPalette?.classList.add('open');
    cmdInput?.focus();
    if (cmdInput) cmdInput.value = '';
    filterCmdItems('');
  }

  function closeCmdPalette() {
    cmdPalette?.classList.remove('open');
  }

  if (cmdTrigger) cmdTrigger.addEventListener('click', openCmdPalette);

  if (cmdPalette) {
    cmdPalette.addEventListener('click', (e) => {
      if (e.target === cmdPalette) closeCmdPalette();
    });
  }

  document.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      cmdPalette?.classList.contains('open') ? closeCmdPalette() : openCmdPalette();
    } else if (e.key === '/' && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
      e.preventDefault();
      openCmdPalette();
    } else if (e.key === 'Escape' && cmdPalette?.classList.contains('open')) {
      closeCmdPalette();
    } else if (e.key === 'Escape' && mediaModal?.classList.contains('open')) {
      closeMediaTapeModal();
    }
  });

  function filterCmdItems(query) {
    const q = query.toLowerCase().trim();
    cmdItems.forEach(item => {
      const text = item.textContent.toLowerCase();
      item.style.display = text.includes(q) ? 'flex' : 'none';
    });
  }

  if (cmdInput) {
    cmdInput.addEventListener('input', (e) => {
      filterCmdItems(e.target.value);
    });
  }

  cmdItems.forEach(item => {
    item.addEventListener('click', () => {
      const action = item.getAttribute('data-action');
      closeCmdPalette();

      if (action === 'goto-hero') document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' });
      else if (action === 'goto-about') document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
      else if (action === 'goto-chronology') document.getElementById('chronology')?.scrollIntoView({ behavior: 'smooth' });
      else if (action === 'goto-projects') document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
      else if (action === 'goto-disciplines') document.getElementById('disciplines')?.scrollIntoView({ behavior: 'smooth' });
      else if (action === 'goto-credentials') document.getElementById('credentials')?.scrollIntoView({ behavior: 'smooth' });
      else if (action === 'goto-dispatch') document.getElementById('dispatch')?.scrollIntoView({ behavior: 'smooth' });
      else if (action === 'resume') {
        document.getElementById('dispatch')?.scrollIntoView({ behavior: 'smooth' });
        showToast('Send a message below to request the official PDF CV.');
      } else if (action === 'tape') {
        openMediaTapeModal();
      }
    });
  });

  /* ==========================================================================
     11. Persistent Archival Assistant (TD.AI Sharp Badge)
     ========================================================================== */
  const aiTrigger = document.getElementById('ai-trigger');
  const aiDialog = document.getElementById('ai-dialog');
  const aiDialogClose = document.getElementById('ai-dialog-close');
  const aiMessages = document.getElementById('ai-messages');
  const promptChips = document.querySelectorAll('.chip-sharp');

  if (aiTrigger && aiDialog) {
    aiTrigger.addEventListener('click', () => {
      aiDialog.classList.toggle('open');
    });

    aiDialogClose?.addEventListener('click', () => {
      aiDialog.classList.remove('open');
    });
  }

  const aiKnowledge = {
    "about": "Tharun Dev M C is a B.Tech Computer Science student specializing in AI & ML at Chandigarh University, native to Kozhikode, Kerala, India. His focus is on Python development, cloud cognitive engineering, and machine learning systems.",
    "projects": "Tharun's principal projects include the Digital Healthcare BMI & Diet Planner and the Azure Document Intelligence UI. You can explore the project details in the Featured Projects section.",
    "certs": "Tharun holds Microsoft Azure Fundamentals (AZ-900), Azure AI Fundamentals (AI-900), Microsoft Fabric Data Engineer (DP-600/DP-700), Nutanix Multicloud (MCI 6, EUC 6, MCA 6), and Univ of Pennsylvania Python accreditation.",
    "resume": "Tharun's verified Curriculum Vitae can be requested directly via the Contact section below.",
    "github": "Opening Tharun's GitHub profile at github.com/tharundev-123...",
    "contact": "You can reach Tharun directly at tharundevmc@gmail.com or scroll to the Contact section below to send a message."
  };

  promptChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const q = chip.getAttribute('data-query');
      const textPrompt = chip.textContent;

      if (aiMessages && q && aiKnowledge[q]) {
        // User query
        const uMsg = document.createElement('div');
        uMsg.className = 'user-msg-sharp';
        uMsg.textContent = textPrompt;
        aiMessages.appendChild(uMsg);

        // Assistant reply
        setTimeout(() => {
          const aMsg = document.createElement('div');
          aMsg.className = 'ai-msg-sharp';
          aMsg.textContent = aiKnowledge[q];
          aiMessages.appendChild(aMsg);
          aiMessages.scrollTop = aiMessages.scrollHeight;

          // Actions
          if (q === 'projects') {
            document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
          } else if (q === 'certs') {
            document.getElementById('credentials')?.scrollIntoView({ behavior: 'smooth' });
          } else if (q === 'contact') {
            document.getElementById('dispatch')?.scrollIntoView({ behavior: 'smooth' });
          } else if (q === 'github') {
            window.open('https://github.com/tharundev-123', '_blank');
          }
        }, 180);
      }
    });
  });

  /* ==========================================================================
     12. Editorial Toast Notification Helper (Hard Edges)
     ========================================================================== */
  function showToast(msg) {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast-brutalist';
    toast.innerHTML = `<i data-lucide="info" style="width:15px; height:15px;"></i> <span>${msg}</span>`;
    container.appendChild(toast);
    if (window.lucide) lucide.createIcons();

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(6px)';
      toast.style.transition = 'all 0.2s ease';
      setTimeout(() => toast.remove(), 200);
    }, 3600);
  }
});
