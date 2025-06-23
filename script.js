document.addEventListener('DOMContentLoaded', function() {
    const menuIcon = document.getElementById('menu-icon');
    const sidebar = document.getElementById('sidebar');
    const sidebarOverlay = document.getElementById('sidebar-overlay');
    const closeSidebarBtn = document.getElementById('close-sidebar');
    const signInBtn = document.getElementById('custom-signin-btn');

    function openSidebar() {
        sidebar.classList.add('active');
        sidebarOverlay.classList.add('active');
        // Trap focus for accessibility
        sidebar.setAttribute('tabindex', '-1');
        sidebar.focus();
    }

    function closeSidebar() {
        sidebar.classList.remove('active');
        sidebarOverlay.classList.remove('active');
    }

    menuIcon.addEventListener('click', openSidebar);
    menuIcon.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') openSidebar();
    });
    sidebarOverlay.addEventListener('click', closeSidebar);

    if (closeSidebarBtn) {
        closeSidebarBtn.addEventListener('click', closeSidebar);
    }

    // Clerk sign-in logic
    window.addEventListener('load', async function () {
        await Clerk.load();
        const authDiv = document.getElementById('clerk-auth');
        const signInBtn = document.getElementById('custom-signin-btn');
        if (!authDiv || !signInBtn) return;
        authDiv.style.display = "none";
        signInBtn.style.display = "block";
        signInBtn.onclick = function() {
            Clerk.openSignIn();
        };
        if (Clerk.user) {
            signInBtn.style.display = "none";
            authDiv.style.display = "block";
            authDiv.innerHTML = `<div id="user-button"></div>`;
            Clerk.mountUserButton(document.getElementById('user-button'));
        }
    });
});