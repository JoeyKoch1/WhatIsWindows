document.addEventListener('DOMContentLoaded', function() {
  const mobileToggle = document.querySelector('.mobile-menu-toggle');
  const sidebar = document.querySelector('.sidebar');
  const navLinks = document.querySelectorAll('.nav-link');
  const currentPage = window.location.pathname.split('/').pop();

  if (mobileToggle && sidebar) {
    mobileToggle.addEventListener('click', function() {
      sidebar.classList.toggle('active');
    });

    document.addEventListener('click', function(event) {
      if (!sidebar.contains(event.target) && event.target !== mobileToggle) {
        sidebar.classList.remove('active');
      }
    });
  }

  navLinks.forEach(function(link) {
    const linkHref = link.getAttribute('href');
    if (linkHref === currentPage || (currentPage === '' && linkHref === 'index.html')) {
      link.classList.add('active');
    }
  });

  const navSections = document.querySelectorAll('.nav-section');
  navSections.forEach(function(section) {
    const title = section.querySelector('.nav-section-title');
    const list = section.querySelector('.nav-list');
    
    if (title && list) {
      title.style.cursor = 'pointer';
      
      const hasActiveLink = list.querySelector('.nav-link.active');
      if (hasActiveLink) {
        section.classList.add('active-section');
        list.style.display = 'block';
      } else {
        list.style.display = 'none';
      }

      title.addEventListener('click', function() {
        const isVisible = list.style.display !== 'none';
        list.style.display = isVisible ? 'none' : 'block';
        
        const icon = title.querySelector('i');
        if (icon) {
          icon.className = isVisible ? 'fa-solid fa-chevron-right' : 'fa-solid fa-chevron-down';
        }
      });

      const icon = title.querySelector('i');
      if (icon) {
        const hasActiveLink = list.querySelector('.nav-link.active');
        icon.className = hasActiveLink ? 'fa-solid fa-chevron-down' : 'fa-solid fa-chevron-right';
      }
    }
  });
});
