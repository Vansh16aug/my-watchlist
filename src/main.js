import './style.css';
import { watchlist } from './data/watchlist.js';

const app = document.querySelector('#app');

/** Base64url (no +/=) so cmd.exe does not eat `%` in percent-encoded URLs when the protocol runs. */
function base64UrlEncode(utf8String) {
  const bytes = new TextEncoder().encode(utf8String);
  let bin = '';
  for (let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
  return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

/** Windows: tools/Register-WatchlistBraveProtocol.ps1 */
function hrefForWatchNow(item) {
  if (item.openInBrave) {
    return `watchlist-brave:${base64UrlEncode(item.url)}`;
  }
  return item.url;
}

function showToast(message) {
  let el = document.querySelector('.toast');
  if (!el) {
    el = document.createElement('div');
    el.className = 'toast';
    el.setAttribute('role', 'status');
    el.setAttribute('aria-live', 'polite');
    document.body.appendChild(el);
  }
  el.textContent = message;
  el.classList.add('toast--visible');
  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => el.classList.remove('toast--visible'), 2200);
}

async function copyUrl(url) {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(url);
      showToast('Link copied — paste in Brave if you like.');
      return;
    }
  } catch {
    /* fall through */
  }
  showToast('Copy not available — select the URL from the address bar after opening.');
}

function render() {
  const list = document.createElement('ul');
  list.className = 'watchlist';

  for (const item of watchlist) {
    const li = document.createElement('li');
    li.className = 'card';

    const title = document.createElement('h2');
    title.className = 'card__title';
    title.textContent = item.title;

    const note = document.createElement('p');
    note.className = 'card__note';
    note.textContent = item.note ?? '';

    const actions = document.createElement('div');
    actions.className = 'card__actions';

    const watch = document.createElement('a');
    watch.className = 'btn btn--primary';
    watch.href = hrefForWatchNow(item);
    watch.textContent = 'Watch Now';
    if (item.openInBrave) {
      watch.title =
        'Opens Brave with this link (requires watchlist-brave: registered — see tools folder).';
      const fallback = document.createElement('a');
      fallback.className = 'card__fallback';
      fallback.href = item.url;
      fallback.target = '_blank';
      fallback.rel = 'noopener noreferrer';
      fallback.textContent = 'Open in this browser instead';
      actions.append(watch, fallback);
    } else {
      watch.target = '_blank';
      watch.rel = 'noopener noreferrer';
      actions.append(watch);
    }

    if (item.showCopyLink) {
      const copyBtn = document.createElement('button');
      copyBtn.type = 'button';
      copyBtn.className = 'btn btn--secondary';
      copyBtn.textContent = 'Copy link';
      copyBtn.addEventListener('click', () => copyUrl(item.url));
      actions.append(copyBtn);
    }

    li.append(title, note, actions);
    list.append(li);
  }

  app.innerHTML = '';
  const header = document.createElement('header');
  header.className = 'page-header';
  const h1 = document.createElement('h1');
  h1.textContent = 'My watchlist';
  const sub = document.createElement('p');
  sub.className = 'page-header__sub';
  sub.textContent = "What I'm watching next.";
  header.append(h1, sub);

  app.append(header, list);
}

render();
