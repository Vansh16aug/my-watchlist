/**
 * Add entries: { id, title, url, note?, image?, watching?, showCopyLink?, openInBrave? }
 * watching: true = front-and-center; false = on-hold styling (dimmed / badge).
 * UI order: currently watching first, then on hold (sorted in main.js).
 * Posters in public/posters/: houseofdragons.jpg, ertugrul.jpg, therookie.jpg
 */
export const watchlist = [
  {
    id: 'house-of-the-dragon',
    title: 'House of the Dragon',
    url: 'https://www.hotstar.com/in/shows/house-of-the-dragon/1971002877',
    note: 'Disney+ Hotstar — the Targaryen civil war. Watching now.',
    image: '/posters/houseofdragons.jpg',
    watching: true,
  },
  {
    id: 'resurrection-ertugrul',
    title: 'Resurrection: Ertuğrul',
    url: 'https://streamex.sh/watch/tv/66017?s=1&e=1&server=vidpro',
    note: 'Turkish historical drama (Diriliş: Ertuğrul). On the shelf for now — not watching at the moment.',
    image: '/posters/ertugrul.jpg',
    watching: false,
    openInBrave: true,
    showCopyLink: true,
  },
  {
    id: 'the-rookie',
    title: 'The Rookie',
    url: 'https://streamex.sh/watch/tv/79744?s=8&e=2&server=streamx',
    note: 'LAPD drama — watching now; new episodes land midnight Mondays.',
    image: '/posters/therookie.jpg',
    watching: true,
    openInBrave: true,
    showCopyLink: true,
  },
];
