const mediumUsername = 'isharadh2002';
const feedUrl = `https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@${mediumUsername}`;

fetch(feedUrl)
    .then(response => response.json())
    .then(data => {
        const blogContainer = document.getElementById('blog-posts');
        const items = data.items.slice(0, 6); // Get latest 6 posts

        items.forEach(post => {
            const imageMatch = post.description.match(/<img.*?src="(.*?)"/);
            const thumbnail = imageMatch ? imageMatch[1] : 'https://via.placeholder.com/600x300.png?text=Medium+Post';

            const card = document.createElement('div');
            card.className = "bg-blue-50 shadow-md rounded-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:bg-blue-100 flex flex-col";

            card.innerHTML = `
          <img src="${thumbnail}" alt="${post.title}" class="w-full h-48 object-cover">
          <div class="p-4 flex flex-col flex-grow">
            <h3 class="text-xl font-semibold mb-1">${post.title}</h3>
            <p class="text-gray-600 text-sm mb-2">${post.pubDate.split(' ')[0]}</p>
            <p class="text-gray-700 text-sm mb-4 flex-grow">${post.description.replace(/<[^>]*>?/gm, '').substring(0, 100)}...</p>
            <a href="${post.link}" target="_blank" class="text-blue-600 hover:underline font-medium mt-auto">
              Read more →
            </a>
          </div>
        `;

            blogContainer.appendChild(card);
        });
    })
    .catch(err => {
        console.error('Failed to fetch Medium posts:', err);
        document.getElementById('blog-posts').innerHTML =
            '<p class="text-red-600 text-center">Failed to load blog posts.</p>';
    });