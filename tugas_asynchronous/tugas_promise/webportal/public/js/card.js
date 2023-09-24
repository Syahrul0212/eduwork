const apiKey = "c59c8887f5ea4271a82766c8ef110fb3";
const newsApiUrl =
  "https://newsapi.org/v2/everything?q=apple&from=2023-09-23&to=2023-09-23&sor";

const searchInput = document.getElementById("searchInput");
const newsList = document.getElementById("newsList");
let articles = [];
// Fungsi untuk mendapatkan data berita dari API

const getNews = async () => {
  try {
    const res = await axios.get(`${newsApiUrl}&apiKey=${apiKey}`);
    articles = res.data.articles;
    displayNews(articles);
  } catch (err) {
    console.log("Error fetching news:", err);
  }
};

// Fungsi untuk menampilkan data berita
const displayNews = (articles) => {
  newsList.innerHTML = "";

  const newsItems = articles
    .map(
      (article) => `
      <div class="max-w-sm rounded overflow-hidden shadow-lg col-md-3">
        <img
          class="w-full h-[200px] object-cover"
          src="${article.urlToImage}"
          alt="${article.title}"
        />
        <div class="px-6 py-4">
          <div class="font-bold text-xl mb-2">${article.title}</div>
          <p class="text-gray-700 text-base">
            ${article.description}
          </p>
        </div>
        <div class="px-6 pt-4 pb-2">
          <button
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
          >
          <a href="${article.url}" target="_blank">Read More. . .</a>
          </button>
        </div>
      </div>
  `
    )
    .join("");

  newsList.innerHTML = newsItems;
};

// Panggil fungsi getNews untuk memuat berita saat halaman dimuat
getNews();

// Tambahkan event listener untuk live search
searchInput.addEventListener("input", () => {
  const query = searchInput.value.toLowerCase();
  query.length > 0 ? searchArticle(query) : displayNews(articles);
});

const searchArticle = (query) => {
  const filteredNews = articles.filter((article) => {
    return article.title.toLowerCase().includes(query);
  });
  displayNews(filteredNews);
};
