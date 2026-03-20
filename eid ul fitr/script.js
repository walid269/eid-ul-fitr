/* ============================================================
   EID MUBARAK 2026 - Elegant Calligraphy JS Scripts
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
    
    // ── GOLDEN DUST PARTICLE SYSTEM ──────────────────────────────────────────────
    const canvas = document.getElementById('canvas-dust');
    const ctx = canvas.getContext('2d');
    
    let w, h, particles;

    function init() {
        w = canvas.width = window.innerWidth;
        h = canvas.height = window.innerHeight;
        particles = [];
        
        const count = window.innerWidth < 600 ? 50 : 100;
        
        for (let i = 0; i < count; i++) {
            particles.push({
                x: Math.random() * w,
                y: Math.random() * h,
                size: Math.random() * 2.5 + 0.5,
                speedX: (Math.random() - 0.5) * 0.5,
                speedY: (Math.random() * -1.5) - 0.2,
                opacity: Math.random() * 0.5 + 0.2,
                blinkFreq: Math.random() * 0.02 + 0.005,
                time: Math.random() * 100
            });
        }
    }

    function animate() {
        requestAnimationFrame(animate);
        ctx.clearRect(0, 0, w, h);
        
        particles.forEach(p => {
            p.x += p.speedX;
            p.y += p.speedY;
            p.time += p.blinkFreq;
            
            // Re-spawn at bottom if they float up out of bounds
            if (p.y < -10) {
                p.y = h + 10;
                p.x = Math.random() * w;
            }
            if (p.x > w + 10) p.x = -10;
            if (p.x < -10) p.x = w + 10;
            
            // Pulsing glow effect
            const currentOpacity = p.opacity + Math.sin(p.time) * 0.2;
            
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(212, 175, 55, ${currentOpacity})`;
            ctx.shadowBlur = p.size * 3;
            ctx.shadowColor = "rgba(212, 175, 55, 0.8)";
            ctx.fill();
            ctx.shadowBlur = 0; // Reset text shadow
        });
    }
    
    // Handle Window Resize
    window.addEventListener('resize', init);
    init();
    animate();

    // ── FLOATING EMOJIS ──────────────────────────────────────────────────────────
    const emojis = ['🌙', '⭐', '✨', '🌟', '💫', '🕌', '🪔', '🌸'];
    const emojiContainer = document.getElementById('floatEmojis');
    if (emojiContainer) {
        const count = 10;
        for (let i = 0; i < count; i++) {
            const el = document.createElement('span');
            el.className = 'fe';
            el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
            const sz = (Math.random() * 1.2 + 0.9).toFixed(2);
            el.style.cssText = `
                left: ${Math.random() * 92}%;
                top: ${Math.random() * 85}%;
                --sz: ${sz}rem;
                --dur: ${(Math.random() * 5 + 6).toFixed(1)}s;
                --del: ${(Math.random() * 4).toFixed(1)}s;
            `;
            emojiContainer.appendChild(el);
        }
    }

    // ── END OF DOMContentLoaded ──────────────────────────────────────────────────
});

// ── YOUTUBE MUSIC CONTROLLER ───────────────────────────────────────────────────
let ytPlayer = null;
let isPlaying = false;
let playerReady = false;

// Called automatically by YouTube IFrame API when script loads
function onYouTubeIframeAPIReady() {
    ytPlayer = new YT.Player('yt-player', {
        width: '1',
        height: '1',
        videoId: 'WVvt64cXLx0',
        playerVars: {
            autoplay: 0,
            controls: 0,
            loop: 1,
            playlist: 'WVvt64cXLx0',
            rel: 0,
            modestbranding: 1,
            playsinline: 1  // Required for iOS inline playback
        },
        events: {
            onReady: (e) => {
                e.target.setVolume(50);
                playerReady = true;
            },
            onStateChange: (e) => {
                const btn  = document.getElementById('musicBtn');
                const icon = btn && btn.querySelector('.music-icon');
                if (e.data === YT.PlayerState.PLAYING) {
                    isPlaying = true;
                    btn && btn.classList.add('playing');
                    if (icon) icon.textContent = '🔊';
                } else {
                    isPlaying = false;
                    btn && btn.classList.remove('playing');
                    if (icon) icon.textContent = '🎵';
                }
            }
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const musicBtn = document.getElementById('musicBtn');
    if (!musicBtn) return;

    musicBtn.addEventListener('click', () => {
        if (!playerReady || !ytPlayer) return;
        if (!isPlaying) {
            ytPlayer.playVideo();
        } else {
            ytPlayer.pauseVideo();
        }
    });
});
