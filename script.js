let projectsData = [];

const searchInput = document.getElementById('searchInput');
const resultsContainer = document.getElementById('resultsContainer');

// Fetch project list from projects.json
fetch('projects.json')
  .then(response => response.json())
  .then(data => {
    projectsData = data;
  })
  .catch(error => {
    console.error('Error loading projects.json:', error);
  });

// Handle real-time input and instant paste matching
searchInput.addEventListener('input', () => {
  const query = searchInput.value.trim().toLowerCase();

  resultsContainer.innerHTML = '';

  if (query === '') {
    return;
  }

  // Strict Prefix Matching (Case-Insensitive)
  const filteredProjects = projectsData.filter(project =>
    project.toLowerCase().startsWith(query)
  );

  if (filteredProjects.length === 0) {
    resultsContainer.innerHTML = `<div class="no-result">No project found</div>`;
    return;
  }

  // Render search results
  filteredProjects.forEach(projectName => {
    const card = document.createElement('div');
    card.className = 'card';

    const title = document.createElement('div');
    title.className = 'project-title';
    title.textContent = projectName;

    const btnGroup = document.createElement('div');
    btnGroup.className = 'button-group';

    // Website Search Button
    const webBtn = document.createElement('a');
    webBtn.className = 'btn btn-website';
    webBtn.textContent = '🌐 Website Search';
    webBtn.href = `https://www.google.com/search?q=${encodeURIComponent(projectName)}`;
    webBtn.target = '_blank';
    webBtn.rel = 'noopener noreferrer';

    // App Search Button
    const appBtn = document.createElement('a');
    appBtn.className = 'btn btn-app';
    appBtn.textContent = '📱 App Search';
    appBtn.href = `https://www.google.com/search?q=${encodeURIComponent(projectName + ' app')}`;
    appBtn.target = '_blank';
    appBtn.rel = 'noopener noreferrer';

    btnGroup.appendChild(webBtn);
    btnGroup.appendChild(appBtn);

    card.appendChild(title);
    card.appendChild(btnGroup);

    resultsContainer.appendChild(card);
  });
});
