document.addEventListener("DOMContentLoaded", function () {
    const sidebarLinks = document.querySelectorAll(".sidebar nav ul li");
    const contentPanels = document.querySelectorAll(".dashboard-panels .content-panel");
    const mainTitle = document.getElementById("main-title");

    const settingsIcon = document.getElementById("header-settings-icon");
    const notificationBell = document.getElementById("header-notification-bell");
    
    const navConfiguracoes = document.getElementById("nav-configuracoes");
    const navNotificacoes = document.getElementById("nav-notificacoes");

    const panelTabelas = document.getElementById("panel-tabelas");
    const tabelasSectionTitle = document.getElementById("tabelas-section-title");
    const reportOptionsContainer = panelTabelas ? panelTabelas.querySelector(".report-options-container") : null;
    const reportCardButtons = panelTabelas ? panelTabelas.querySelectorAll(".report-card .btn-view-report") : [];
    const tabelasPowerBiContainer = document.getElementById("tabelas-powerbi-embed-container");
    const tabelasIframe = tabelasPowerBiContainer ? tabelasPowerBiContainer.querySelector("iframe") : null;
    const backToReportListBtn = document.getElementById("backToReportListBtn");

    const decreaseFontBtn = document.getElementById("decreaseFontBtn");
    const increaseFontBtn = document.getElementById("increaseFontBtn");
    const resetFontBtn = document.getElementById("resetFontBtn");
    const fontSizePreview = document.getElementById("currentFontSizePreview");

    function showPanel(targetPanelId) {
        const targetNavLink = document.querySelector(`.sidebar nav ul li[data-target='${targetPanelId}']`);

        if (!targetNavLink) {
            console.error("Link de navegação não encontrado para o painel:", targetPanelId);
            return;
        }

        const targetTitle = targetNavLink.getAttribute("data-title");

        if (mainTitle) mainTitle.textContent = targetTitle;

        sidebarLinks.forEach(link => link.classList.remove("active"));

        contentPanels.forEach(panel => panel.classList.remove('active'));

        targetNavLink.classList.add("active");
        const panelToShow = document.getElementById(targetPanelId);
        if(panelToShow) {
            panelToShow.classList.add('active');
        }

        if (targetPanelId !== 'panel-tabelas' && reportOptionsContainer && tabelasPowerBiContainer) {
            reportOptionsContainer.style.display = 'block';
            tabelasPowerBiContainer.style.display = 'none';
            if (tabelasIframe) tabelasIframe.src = '';
            if (backToReportListBtn) backToReportListBtn.style.display = 'none';
            if (tabelasSectionTitle) tabelasSectionTitle.textContent = '';
        }
    }

    sidebarLinks.forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault();
            const targetPanelId = this.getAttribute("data-target");
            if (targetPanelId) {
                showPanel(targetPanelId);
            }
        });
    });

    if (settingsIcon && navConfiguracoes) {
        settingsIcon.addEventListener('click', () => {
            navConfiguracoes.querySelector('a').click();
        });
    }

    if (notificationBell && navNotificacoes) {
        notificationBell.addEventListener('click', () => {
            navNotificacoes.querySelector('a').click();
        });
    }

    if (reportCardButtons.length > 0 && tabelasIframe && reportOptionsContainer && tabelasPowerBiContainer && backToReportListBtn) {
        reportCardButtons.forEach(button => {
            button.addEventListener("click", function () {
                const card = this.closest(".report-card");
                const url = card.getAttribute("data-url");

                if (url && url !== "URL_DO_SEU_OUTRO_RELATORIO_POWERBI_AQUI") {
                    if (tabelasSectionTitle) tabelasSectionTitle.textContent = "";
                    tabelasIframe.src = url;
                    reportOptionsContainer.style.display = "none";
                    tabelasPowerBiContainer.style.display = "flex";
                    backToReportListBtn.style.display = "inline-flex";
                } else {
                    alert("Por favor, configure a URL para este relatório.");
                }
            });
        });

        backToReportListBtn.addEventListener("click", function () {
            reportOptionsContainer.style.display = "block";
            tabelasPowerBiContainer.style.display = "none";
            if (tabelasIframe) tabelasIframe.src = "";
            this.style.display = "none";
            if (tabelasSectionTitle) tabelasSectionTitle.textContent = "";
        });
    }

    let currentFontStep = 0;
    const FONT_STEP_PERCENT = 10;
    const MAX_FONT_STEP = 3;
    const MIN_FONT_STEP = -2;
    let initialBodyFontSize = "";

    function updateFontSize() {
        if (initialBodyFontSize === "") {
            initialBodyFontSize = window.getComputedStyle(document.body).fontSize;
        }
        const baseSize = parseFloat(initialBodyFontSize);
        if (isNaN(baseSize)) return;

        let newSize;
        if (currentFontStep === 0) {
            newSize = ''; 
            if(fontSizePreview) fontSizePreview.textContent = "Normal";
        } else {
            const multiplier = 1 + (currentFontStep * FONT_STEP_PERCENT) / 100;
            newSize = baseSize * multiplier + "px";
            if (fontSizePreview) fontSizePreview.textContent = `${(multiplier * 100).toFixed(0)}%`;
        }
        document.body.style.fontSize = newSize;
    }

    if (decreaseFontBtn && increaseFontBtn && resetFontBtn) {
        decreaseFontBtn.addEventListener("click", () => {
            if (currentFontStep > MIN_FONT_STEP) {
                currentFontStep--;
                updateFontSize();
            }
        });
        increaseFontBtn.addEventListener("click", () => {
            if (currentFontStep < MAX_FONT_STEP) {
                currentFontStep++;
                updateFontSize();
            }
        });
        resetFontBtn.addEventListener("click", () => {
            currentFontStep = 0;
            updateFontSize();
        });
    }

    const activeLink = document.querySelector(".sidebar nav ul li.active");
    if (activeLink) {
        const initialPanelId = activeLink.getAttribute('data-target');
        showPanel(initialPanelId);
    } else {
        showPanel('panel-inicio'); 
    }
});
