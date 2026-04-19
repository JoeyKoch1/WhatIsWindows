document.addEventListener('DOMContentLoaded', function() {
  const codeBlocks = document.querySelectorAll('pre code');
  
  codeBlocks.forEach(function(block) {
    const pre = block.parentNode;
    if (pre.parentNode && pre.parentNode.classList.contains('code-block-wrapper')) {
      return;
    }
    if (pre.classList && pre.classList.contains('code-block-wrapper')) {
      return;
    }
    
    const wrapper = document.createElement('div');
    wrapper.className = 'code-block-wrapper';
    
    const header = document.createElement('div');
    header.className = 'code-block-header';
    
    const language = document.createElement('span');
    language.className = 'code-block-language';
    
    const classes = block.className.split(' ');
    let langName = 'text';
    
    for (let i = 0; i < classes.length; i++) {
      if (classes[i].startsWith('language-')) {
        langName = classes[i].replace('language-', '');
        break;
      }
    }
    
    language.textContent = langName;
    
    const copyButton = document.createElement('button');
    copyButton.className = 'code-block-copy';
    copyButton.innerHTML = '<i class="fa-regular fa-copy"></i> Copy';
    
    copyButton.addEventListener('click', function() {
      const code = block.textContent;
      navigator.clipboard.writeText(code).then(function() {
        copyButton.innerHTML = '<i class="fa-solid fa-check"></i> Copied';
        setTimeout(function() {
          copyButton.innerHTML = '<i class="fa-regular fa-copy"></i> Copy';
        }, 2000);
      });
    });
    
    header.appendChild(language);
    header.appendChild(copyButton);
    
    pre.parentNode.insertBefore(wrapper, pre);
    wrapper.appendChild(header);
    wrapper.appendChild(pre);
  });
  
  if (typeof hljs !== 'undefined') {
    hljs.highlightAll();
  }
});