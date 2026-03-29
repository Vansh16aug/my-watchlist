/** Add new entries here: { id, title, url, note?, showCopyLink?, openInBrave? } — openInBrave uses watchlist-brave: (see tools/). */
export const watchlist = [
  {
    id: 'house-of-the-dragon',
    title: 'House of the Dragon',
    url: 'https://www.hotstar.com/in/shows/house-of-the-dragon/1971002877',
    note: 'Disney+ Hotstar — picks up after Game of Thrones.',
  },
  {
    id: 'resurrection-ertugrul',
    title: 'Resurrection: Ertuğrul',
    url: 'https://streamex.sh/watch/tv/66017?s=1&e=1&server=vidpro',
    note:
      'Watch Now opens in Brave after a one-time setup: run tools\\Register-WatchlistBraveProtocol.ps1 on this PC. First click may ask to allow the watchlist-brave link.',
    openInBrave: true,
    showCopyLink: true,
  },
];
