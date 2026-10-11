/**
 * 极简个人主页交互脚本
 * 1. 主题切换（记忆本地设置 + 跟随系统偏好）
 * 2. 邮箱一键复制及反馈交互
 */

(function () {
  'use strict';

  // ==========================================
  // 1. 主题切换逻辑 (Theme Toggle)
  // ==========================================
  const THEME_KEY = 'huhao_site_theme';
  const root = document.documentElement;
  const themeToggleBtn = document.getElementById('theme-toggle');

  // 获取当前生效的主题
  function getPreferredTheme() {
    const savedTheme = localStorage.getItem(THEME_KEY);
    if (savedTheme === 'light' || savedTheme === 'dark') {
      return savedTheme;
    }
    // 未手动选择时，读取操作系统偏好
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  // 应用主题
  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    if (themeToggleBtn) {
      themeToggleBtn.setAttribute(
        'aria-label',
        theme === 'dark' ? '切换到浅色模式' : '切换到深色模式'
      );
      themeToggleBtn.setAttribute(
        'title',
        theme === 'dark' ? '切换到浅色模式' : '切换到深色模式'
      );
    }
  }

  // 初始化主题设置
  const currentTheme = getPreferredTheme();
  applyTheme(currentTheme);

  // 绑定切换按钮点击事件
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const activeTheme = root.getAttribute('data-theme') || 'light';
      const nextTheme = activeTheme === 'dark' ? 'light' : 'dark';
      localStorage.setItem(THEME_KEY, nextTheme);
      applyTheme(nextTheme);
    });
  }

  // 监听操作系统主题变化（当用户未手动锁死偏好时）
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem(THEME_KEY)) {
      applyTheme(e.matches ? 'dark' : 'light');
    }
  });

  // ==========================================
  // 2. 邮箱一键复制交互 (Copy Email)
  // ==========================================
  const copyBtn = document.getElementById('copy-email-btn');
  const emailToCopy = 'huhao121121@gmail.com';

  if (copyBtn) {
    copyBtn.addEventListener('click', async (e) => {
      e.stopPropagation();
      e.preventDefault();

      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(emailToCopy);
        } else {
          // 备用兜底复制
          const textArea = document.createElement('textarea');
          textArea.value = emailToCopy;
          textArea.style.position = 'fixed';
          textArea.style.left = '-999999px';
          document.body.appendChild(textArea);
          textArea.focus();
          textArea.select();
          document.execCommand('copy');
          textArea.remove();
        }

        // 成功反馈效果
        const copyText = copyBtn.querySelector('.copy-text');
        const originalText = copyText ? copyText.textContent : '复制';
        
        copyBtn.classList.add('copied');
        if (copyText) copyText.textContent = '已复制 ✓';

        setTimeout(() => {
          copyBtn.classList.remove('copied');
          if (copyText) copyText.textContent = originalText;
        }, 2000);
      } catch (err) {
        console.error('复制失败:', err);
      }
    });
  }

})();
