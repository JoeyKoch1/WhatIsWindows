document.addEventListener('DOMContentLoaded', function() {
  const searchTrigger = document.querySelector('.search-trigger');
  const searchModal = document.getElementById('searchModal');
  const searchInput = document.getElementById('searchInput');
  const searchResults = document.getElementById('searchResults');

  const searchData = [
    { title: 'Architecture Overview', path: 'architecture/overview.html', category: 'Architecture', keywords: 'windows architecture ring0 ring1 ring2 ring3 user mode kernel mode executive subsystem hal hardware abstraction ntoskrnl.exe' },
    { title: 'Memory Model', path: 'architecture/memory-model.html', category: 'Architecture', keywords: 'virtual memory page tables VAD tree address space PML4 PDP PT MMU memory management commit reserve free' },
    { title: 'ntdll.dll', path: 'dlls/ntdll.html', category: 'DLLs', keywords: 'native API syscall system call NtCreateFile NtAllocateVirtualMemory NtQuerySystemInformation Rtl Ldr loader thunk' },
    { title: 'kernel32.dll', path: 'dlls/kernel32.html', category: 'DLLs', keywords: 'process thread file I/O memory allocation CreateFile VirtualAlloc HeapAlloc GetProcAddress LoadLibrary' },
    { title: 'user32.dll', path: 'dlls/user32.html', category: 'DLLs', keywords: 'window management GUI message loop WNDCLASS CreateWindowDefWindowProc HWND WM messages' },
    { title: 'advapi32.dll', path: 'dlls/advapi32.html', category: 'DLLs', keywords: 'registry security service control manager RegOpenKeyEx RegQueryValueEx StartServiceCtrlDispatcher' },
    { title: 'gdi32.dll', path: 'dlls/gdi32.html', category: 'DLLs', keywords: 'graphics device interface GDI drawing HDC CreateDC BitBlt font rendering' },
    { title: 'msvcrt.dll', path: 'dlls/msvcrt.html', category: 'DLLs', keywords: 'C runtime library malloc printf strcpy CRT standard library' },
    { title: 'Memory Management', path: 'functions/memory-management.html', category: 'Functions', keywords: 'VirtualAlloc HeapAlloc HeapCreate memory allocation page commit reserve virtual memory' },
    { title: 'Process & Threads', path: 'functions/process-threads.html', category: 'Functions', keywords: 'CreateProcess CreateThread synchronization mutex event semaphore WaitForSingleObject' },
    { title: 'File I/O', path: 'functions/file-io.html', category: 'Functions', keywords: 'CreateFile ReadFile WriteFile overlapped I/O asynchronous file handle device I/O' },
    { title: 'Registry API', path: 'functions/registry-api.html', category: 'Functions', keywords: 'RegOpenKeyEx RegQueryValueEx RegSetValueEx registry key value configuration' },
    { title: 'Executive Subsystem', path: 'subsystems/executive.html', category: 'Subsystems', keywords: 'I/O manager memory manager process manager security reference monitor configuration manager PnP power manager IRP' },
    { title: 'Kernel Subsystem', path: 'subsystems/kernel.html', category: 'Subsystems', keywords: 'thread scheduling interrupt IRQL dispatcher spinlock context switch priority quantum' },
    { title: 'HAL', path: 'subsystems/hal.html', category: 'Subsystems', keywords: 'hardware abstraction layer interrupt controller I/O port MMU cache coherency hal.dll' },
    { title: 'win32k.sys', path: 'subsystems/win32k.html', category: 'Subsystems', keywords: 'window management GDI kernel mode graphics desktop session input keyboard mouse' },
    { title: 'LSA', path: 'subsystems/lsa.html', category: 'Subsystems', keywords: 'local security authority authentication LSASS Kerberos NTLM access token logon password policy' },
    { title: 'Driver Overview', path: 'drivers/overview.html', category: 'Drivers', keywords: 'kernel mode driver file system device driver filter driver minifilter driver stack IRP' },
    { title: 'WDM', path: 'drivers/wdm.html', category: 'Drivers', keywords: 'windows driver model DriverEntry IRP PnP power management miniport class driver' },
    { title: 'Registry Structure', path: 'registry/structure.html', category: 'Registry', keywords: 'registry hive key value HKLM HKCU HKCR configuration database' },
    { title: 'Registry Hives', path: 'registry/hives.html', category: 'Registry', keywords: 'SAM SECURITY SOFTWARE SYSTEM DEFAULT NTUSER.DAT hive file configuration' },
    { title: 'Registry Index', path: 'registry/index.html', category: 'Registry', keywords: 'registry overview structure hives configuration management' }
  ];

  function openSearch() {
    searchModal.classList.add('active');
    searchInput.focus();
  }

  function closeSearch() {
    searchModal.classList.remove('active');
    searchInput.value = '';
    searchResults.innerHTML = '';
  }

  function performSearch(query) {
    if (!query.trim()) {
      searchResults.innerHTML = '';
      return;
    }

    const lowerQuery = query.toLowerCase();
    const results = searchData.filter(function(item) {
      return item.title.toLowerCase().includes(lowerQuery) ||
             item.category.toLowerCase().includes(lowerQuery) ||
             (item.keywords && item.keywords.toLowerCase().includes(lowerQuery));
    });

    if (results.length === 0) {
      searchResults.innerHTML = '<div class="search-empty">No results found</div>';
      return;
    }

    searchResults.innerHTML = results.map(function(result) {
      const highlightedTitle = result.title.replace(
        new RegExp('(' + query + ')', 'gi'),
        '<span class="search-result-highlight">$1</span>'
      );
      
      return '<div class="search-result-item" onclick="window.location.href=\'' + result.path + '\'">' +
               '<div class="search-result-title">' + highlightedTitle + '</div>' +
               '<div class="search-result-path">' + result.category + '</div>' +
             '</div>';
    }).join('');
  }

  if (searchTrigger) {
    searchTrigger.addEventListener('click', openSearch);
  }

  if (searchModal) {
    searchModal.addEventListener('click', function(event) {
      if (event.target === searchModal) {
        closeSearch();
      }
    });
  }

  if (searchInput) {
    searchInput.addEventListener('input', function() {
      performSearch(this.value);
    });
  }

  document.addEventListener('keydown', function(event) {
    if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
      event.preventDefault();
      if (searchModal.classList.contains('active')) {
        closeSearch();
      } else {
        openSearch();
      }
    }

    if (event.key === 'Escape' && searchModal.classList.contains('active')) {
      closeSearch();
    }
  });
});
