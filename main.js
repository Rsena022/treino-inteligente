/* ════════════════════════════════════════════════════════
   PLATAFORMA STREAMING TREINO INTELIGENTE — ENGINE JS
════════════════════════════════════════════════════════ */

// CONFIGURAÇÃO DO SUPABASE
const SUPABASE_URL = "https://yizccvmpfuwccvxcbgwa.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlpemNjdm1wZnV3Y2N2eGNiZ3dhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU2MTQxMjUsImV4cCI6MjEwMTE5MDEyNX0.3NB4O7UYuEnTmCnCVRuuauADYRPN8Fc6aSFsS3p4efs";

let supabaseClient = null;
if (typeof supabase !== 'undefined' && SUPABASE_URL && SUPABASE_ANON_KEY) {
    supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
}

document.addEventListener("DOMContentLoaded", () => {

    // 1. LÓGICA DA TELA DE LOGIN E AUTENTICAÇÃO
    const loginOverlay = document.getElementById('login-overlay');
    const loginForm = document.getElementById('login-form');
    const loginEmailInput = document.getElementById('login-email');
    const loginErrorMsg = document.getElementById('login-error-msg');
    const loggedUserEmailSpan = document.getElementById('logged-user-email');
    const logoutBtn = document.getElementById('logout-btn');

    // Verificar se o aluno já está logado
    const savedUserEmail = localStorage.getItem('treino_aluno_email');
    if (savedUserEmail) {
        showPlatformForUser(savedUserEmail);
    } else {
        if (loginOverlay) loginOverlay.classList.remove('hidden');
    }

    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = loginEmailInput.value.trim().toLowerCase();
            if (!email) return;

            hideLoginError();

            // Se o Supabase estiver configurado com as chaves reais:
            if (supabaseClient) {
                try {
                    let accessGranted = false;

                    // 1ª Tentativa: Função de segurança RPC (se foi criada no banco)
                    const { data: rpcData, error: rpcError } = await supabaseClient
                        .rpc('verificar_acesso_aluno', { email_consulta: email });

                    if (!rpcError && rpcData && rpcData.length > 0) {
                        if (rpcData[0].autorizado) {
                            accessGranted = true;
                        } else {
                            showLoginError(rpcData[0].mensagem || "E-mail não encontrado ou acesso inativo.");
                            return;
                        }
                    } else {
                        // 2ª Tentativa (Fallback): Consulta direta na tabela 'treino_alunos'
                        const { data, error } = await supabaseClient
                            .from('treino_alunos')
                            .select('status')
                            .eq('email', email)
                            .single();

                        if (error || !data) {
                            showLoginError("E-mail não encontrado nos nossos registros de compra. Verifique o e-mail digitado.");
                            return;
                        }

                        if (data.status === 'reembolsado' || data.status === 'bloqueado') {
                            showLoginError("⛔ Seu acesso a esta conta está inativo ou foi reembolsado. Caso considere um engano, fale com nosso suporte.");
                            return;
                        }

                        accessGranted = true;
                    }

                    if (accessGranted) {
                        showPlatformForUser(email);
                    }

                } catch (err) {
                    console.error("Erro no login:", err);
                    showLoginError("Erro ao conectar com o servidor. Tente novamente.");
                }
            } else {
                // Modo de Teste Local
                console.log("Supabase ainda não configurado. Entrando em modo de demonstração.");
                showPlatformForUser(email);
            }
        });
    }

    function showLoginError(msg) {
        if (loginErrorMsg) {
            loginErrorMsg.textContent = msg;
            loginErrorMsg.style.display = 'block';
        }
    }

    function hideLoginError() {
        if (loginErrorMsg) {
            loginErrorMsg.style.display = 'none';
        }
    }

    function showPlatformForUser(email) {
        localStorage.setItem('treino_aluno_email', email);
        if (loggedUserEmailSpan) loggedUserEmailSpan.textContent = email;
        if (loginOverlay) loginOverlay.classList.add('hidden');
    }

    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            localStorage.removeItem('treino_aluno_email');
            if (loginOverlay) loginOverlay.classList.remove('hidden');
        });
    }

    // 2. BANCO DE DADOS DOS MÓDULOS DE TREINOS (PASTAS DO GOOGLE DRIVE)
    const courseData = {
        semana1: {
            title: "Módulo Semana 1: Fundamentos (5 Treinos Guiados)",
            badge: "SEMANA 1",
            folderId: "1IuJVFY6p-6d6YaJcdJcakvmcNgQ1H2oF",
            driveFolder: "https://drive.google.com/drive/folders/1IuJVFY6p-6d6YaJcdJcakvmcNgQ1H2oF?usp=sharing",
            desc: "Galeria de treinos da Semana 1. Clique duas vezes na imagem de qualquer vídeo para dar o PLAY."
        },
        semana2: {
            title: "Módulo Semana 2: Resistência (5 Treinos Guiados)",
            badge: "SEMANA 2",
            folderId: "1E73HbV5FCb8g-9HNPqeKQZ72PgjJEXEt",
            driveFolder: "https://drive.google.com/drive/folders/1E73HbV5FCb8g-9HNPqeKQZ72PgjJEXEt?usp=sharing",
            desc: "Galeria de treinos da Semana 2. Clique duas vezes na imagem de qualquer vídeo para dar o PLAY."
        },
        semana3: {
            title: "Módulo Semana 3: HIIT Explosão (5 Treinos Guiados)",
            badge: "SEMANA 3",
            folderId: "1WyNwwuMqX38kvG9UjGvtHkG8WSk63qj0",
            driveFolder: "https://drive.google.com/drive/folders/1WyNwwuMqX38kvG9UjGvtHkG8WSk63qj0?usp=sharing",
            desc: "Galeria de treinos da Semana 3. Clique duas vezes na imagem de qualquer vídeo para dar o PLAY."
        },
        semana4: {
            title: "Módulo Semana 4: Superação & Definição (5 Treinos Guiados)",
            badge: "SEMANA 4",
            folderId: "18DSYp4aEffnIdhrrNCkpqb5j6fMjD1tI",
            driveFolder: "https://drive.google.com/drive/folders/18DSYp4aEffnIdhrrNCkpqb5j6fMjD1tI?usp=sharing",
            desc: "Galeria de treinos da Semana 4. Clique duas vezes na imagem de qualquer vídeo para dar o PLAY."
        },
        biblioteca: {
            title: "Biblioteca de +500 Treinos Funcionais (Exercícios Individuais)",
            badge: "BIBLIOTECA",
            folderId: "1qFgRVdKxGDAeB9A3J3xh00e9acYgKetp",
            driveFolder: "https://drive.google.com/drive/folders/1qFgRVdKxGDAeB9A3J3xh00e9acYgKetp?usp=sharing",
            desc: "Biblioteca completa de exercícios individuais em vídeo."
        }
    };

    // 3. SISTEMA DE PROGRESSO DO ALUNO (LOCAL STORAGE POR MÓDULO)
    const STORAGE_KEY = 'treino_inteligente_completed_modules';
    let completedModules = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

    function updateOverallProgress() {
        const totalModules = Object.keys(courseData).length;
        const completedCount = completedModules.length;
        const percentage = Math.round((completedCount / totalModules) * 100) || 0;

        const percentEl = document.getElementById('progress-percent');
        const countEl = document.getElementById('progress-count');
        const fillEl = document.getElementById('progress-fill');

        if (percentEl) percentEl.textContent = `${percentage}%`;
        if (countEl) countEl.textContent = `${completedCount} de ${totalModules} Módulos Concluídos`;
        if (fillEl) fillEl.style.width = `${percentage}%`;
    }
    updateOverallProgress();

    // 4. LÓGICA DO PLAYER E MODAL DE STREAMING (2 COLUNAS & PLAYER NATIVO PREVIEW)
    const modal = document.getElementById('streaming-modal');
    const backdrop = document.getElementById('modal-backdrop');
    const closeBtn = document.getElementById('close-modal-btn');
    const mainIframe = document.getElementById('main-video-iframe');
    const mainVideoPlayer = document.getElementById('main-video-player');
    const videoLoader = document.getElementById('video-loader');
    const centralPlayBtn = document.getElementById('central-play-btn');

    const moduleBadgeEl = document.getElementById('player-module-badge');
    const moduleTitleEl = document.getElementById('player-module-title');
    const driveBackupLink = document.getElementById('drive-backup-link');
    const currentTitleEl = document.getElementById('current-lesson-title');
    const currentDescEl = document.getElementById('current-lesson-desc');
    const markCompleteBtn = document.getElementById('mark-complete-btn');
    const completeBtnText = document.getElementById('complete-btn-text');

    const videoGridContainer = document.getElementById('video-grid-container');
    const searchBoxContainer = document.getElementById('search-box-container');
    const searchVideoInput = document.getElementById('search-video-input');
    const fullscreenBtn = document.getElementById('btn-fullscreen');
    const videoScreenContainer = document.getElementById('video-container');

    if (fullscreenBtn) {
        fullscreenBtn.addEventListener('click', () => {
            const targetEl = videoScreenContainer || mainVideoPlayer || mainIframe;
            if (!targetEl) return;

            if (targetEl.requestFullscreen) {
                targetEl.requestFullscreen();
            } else if (targetEl.webkitRequestFullscreen) {
                targetEl.webkitRequestFullscreen();
            } else if (mainIframe && mainIframe.webkitRequestFullscreen) {
                mainIframe.webkitRequestFullscreen();
            }
        });
    }

    let currentActiveModuleKey = null;
    let currentActiveVideoId = null;

    if (centralPlayBtn && mainVideoPlayer) {
        centralPlayBtn.addEventListener('click', () => {
            mainVideoPlayer.play().catch(() => {});
            centralPlayBtn.classList.add('hidden');
        });

        mainVideoPlayer.addEventListener('play', () => {
            if (centralPlayBtn) centralPlayBtn.classList.add('hidden');
        });

        mainVideoPlayer.addEventListener('pause', () => {
            if (centralPlayBtn) centralPlayBtn.classList.remove('hidden');
        });
    }

    // Carregar Vídeo Específico no Player via iframe preview do Google Drive
    function playVideo(video, moduleTitle) {
        currentActiveVideoId = video.id;

        // Esconde o botão central (o iframe do Drive já tem seu próprio play centralizado)
        if (centralPlayBtn) centralPlayBtn.classList.add('hidden');

        if (currentTitleEl) currentTitleEl.textContent = video.title;
        if (currentDescEl) currentDescEl.textContent = `Treino do ${moduleTitle}. Use a barra do vídeo para avançar ou voltar a qualquer momento.`;

        if (videoLoader) {
            videoLoader.style.display = 'flex';
            videoLoader.style.opacity = '1';
        }

        // Esconde o tag video (não funciona com Google Drive por CORS)
        if (mainVideoPlayer) mainVideoPlayer.style.display = 'none';

        // Usa iframe /preview que já tem botão de PLAY centralizado + barra de progresso nativa
        const previewUrl = `https://drive.google.com/file/d/${video.id}/preview`;

        const hideLoader = () => {
            if (videoLoader) {
                videoLoader.style.opacity = '0';
                setTimeout(() => {
                    videoLoader.style.display = 'none';
                }, 200);
            }
        };

        if (mainIframe) {
            mainIframe.style.display = 'block';
            mainIframe.src = previewUrl;
            mainIframe.onload = hideLoader;
        }

        setTimeout(hideLoader, 2000);

        // Destacar card ativo no grid
        const allCards = document.querySelectorAll('.video-card-item');
        allCards.forEach(card => {
            if (card.getAttribute('data-id') === video.id) {
                card.classList.add('active');
            } else {
                card.classList.remove('active');
            }
        });

        // Rolar até o topo do player em telas menores
        if (window.innerWidth <= 768) {
            const playerArea = document.querySelector('.video-player-area');
            if (playerArea) playerArea.scrollTop = 0;
        }
    }

    // Renderizar a Lista de Vídeos em Grid de 2 Colunas
    function renderVideoGrid(videos, moduleTitle) {
        if (!videoGridContainer) return;
        videoGridContainer.innerHTML = '';

        if (!videos || videos.length === 0) {
            videoGridContainer.innerHTML = '<p style="color: var(--text-muted); grid-column: 1 / -1; padding: 20px; text-align: center;">Nenhum exercício encontrado com esse termo.</p>';
            return;
        }

        videos.forEach((video, index) => {
            const card = document.createElement('div');
            card.className = `video-card-item ${video.id === currentActiveVideoId ? 'active' : ''}`;
            card.setAttribute('data-id', video.id);

            // Imagem de Thumbnail ou fallback
            const thumbUrl = video.thumb || 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=400&q=80';

            card.innerHTML = `
                <div class="video-thumb-wrapper">
                    <img src="${thumbUrl}" alt="${video.title}" loading="lazy" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=400&q=80';">
                    <div class="play-badge-icon">▶</div>
                </div>
                <div class="video-card-info">
                    <div class="video-card-title">${video.title}</div>
                    <div class="video-card-status">
                        ${video.id === currentActiveVideoId ? '▶ TOCANDO AGORA' : 'VER TREINO'}
                    </div>
                </div>
            `;

            card.addEventListener('click', () => {
                playVideo(video, moduleTitle);
                renderVideoGrid(videos, moduleTitle); // Atualiza os status dos cards
            });

            videoGridContainer.appendChild(card);
        });
    }

    // Abrir Modal do Módulo Selecionado
    function openModulePlayer(moduleKey) {
        const module = courseData[moduleKey];
        if (!module) return;

        currentActiveModuleKey = moduleKey;

        moduleBadgeEl.textContent = module.badge;
        moduleTitleEl.textContent = module.title;
        driveBackupLink.href = module.driveFolder;

        // Verificar se temos os vídeos extraídos no banco de dados
        const moduleVideos = (typeof VIDEOS_DATABASE !== 'undefined' && VIDEOS_DATABASE[moduleKey]) ? VIDEOS_DATABASE[moduleKey] : [];

        // Exibir caixa de busca apenas no módulo da biblioteca
        if (moduleKey === 'biblioteca') {
            if (searchBoxContainer) searchBoxContainer.classList.remove('hidden');
            if (searchVideoInput) searchVideoInput.value = '';
        } else {
            if (searchBoxContainer) searchBoxContainer.classList.add('hidden');
        }

        if (moduleVideos.length > 0) {
            // Tocar o primeiro vídeo automaticamente
            playVideo(moduleVideos[0], module.title);
            renderVideoGrid(moduleVideos, module.title);
        } else {
            // Fallback para galeria do Google Drive caso o banco não tenha vídeos
            const embeddedFolderUrl = `https://drive.google.com/embeddedfolderview?id=${module.folderId}#grid`;
            mainIframe.src = embeddedFolderUrl;
        }

        updateCompletionButtonState(moduleKey);

        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    // Evento do Campo de Busca da Biblioteca (+500 Treinos)
    if (searchVideoInput) {
        searchVideoInput.addEventListener('input', (e) => {
            const query = e.target.value.trim().toLowerCase();
            const allBiblio = (typeof VIDEOS_DATABASE !== 'undefined' && VIDEOS_DATABASE['biblioteca']) ? VIDEOS_DATABASE['biblioteca'] : [];
            
            if (!query) {
                renderVideoGrid(allBiblio, "Biblioteca");
            } else {
                const filtered = allBiblio.filter(v => v.title.toLowerCase().includes(query));
                renderVideoGrid(filtered, "Biblioteca");
            }
        });
    }

    // Fechar Modal
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        if (mainIframe) mainIframe.src = '';
    }

    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (backdrop) backdrop.addEventListener('click', closeModal);

    // Marcar / Desmarcar Módulo Concluído
    function updateCompletionButtonState(moduleKey) {
        const isDone = completedModules.includes(moduleKey);
        if (isDone) {
            markCompleteBtn.classList.add('completed');
            completeBtnText.textContent = 'Módulo Concluído ✓';
        } else {
            markCompleteBtn.classList.remove('completed');
            completeBtnText.textContent = 'Marcar Módulo como Concluído';
        }
    }

    if (markCompleteBtn) {
        markCompleteBtn.addEventListener('click', () => {
            if (!currentActiveModuleKey) return;

            const indexInStorage = completedModules.indexOf(currentActiveModuleKey);

            if (indexInStorage > -1) {
                completedModules.splice(indexInStorage, 1);
            } else {
                completedModules.push(currentActiveModuleKey);
            }

            localStorage.setItem(STORAGE_KEY, JSON.stringify(completedModules));

            updateCompletionButtonState(currentActiveModuleKey);
            updateOverallProgress();
        });
    }

    // Triggers nos Botões dos Cards da Página
    const openBtns = document.querySelectorAll('.open-player-btn');
    openBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const moduleKey = btn.getAttribute('data-module');
            openModulePlayer(moduleKey);
        });
    });

});

