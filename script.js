(async () => {
  const version = '20260712-demos';
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = `./project-demos.css?v=${version}`;
  document.head.appendChild(link);
  await import(`./desktop-core.js?v=${version}`);
  await import(`./project-demos.js?v=${version}`);
})();