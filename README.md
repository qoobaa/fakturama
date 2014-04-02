# Fakturama

Fakturama to prosta aplikacja do fakturowania, napisana w całości w języku JavaScript, z wykorzystaniem frameworka [Ember](http://emberjs.com/). Dane składowane są w bazie danych [Firebase](https://www.firebase.com/), kursy walut ściąganę są za pośrednictwem [YQL](http://developer.yahoo.com/yql/) z serwerów [Narodowego Banku Polskiego](http://www.nbp.pl/kursy/xml/). Ogólnodostępna wersja aplikacji znajduje się pod adresem [https://fakturama.pl/](https://fakturama.pl/), ale nic nie stoi na przeszkodzie, aby uruchomić własną.

## Uruchamianie środowiska programistycznego

Aby uruchomić aplikację lokalnie, musisz posiadać node.js (wersja w okolicy 0.10.26) i npm (okolice 1.4.3). Wszelkie zależności aplikacji instalowane są po wywołaniu `npm install`. Aby uruchomić lokalną wersję serwera w środowisku `development`, należy uruchomić polecenie `grunt server` i otworzyć w przeglądarce adres [http://localhost:8000/](http://localhost:8000/).

## Budowanie wersji produkcyjnej

Do budowania wersji produkcyjnej aplikacji służy polecenie `grunt dist`. Po wykonaniu polecenia w katalogu `dist` powinno znajdować się kilka plików, wśród których najważniejsze to:

* `index.html` - strona powitalna (tzw. „landing page”)
* `app.html` - strona startowa
* `assets/xxxxxxxx.app.min.css` - arkusz styli
* `assets/xxxxxxxx.app.min.js` - kod źródłowy aplikacji
* `assets/xxxxxxxx.vendor.min.js` - kod źródłowy zależności (zewnętrznych bibliotek)
* `assets/xxxxxxxx.config.min.js` - konfiguracja aplikacji (definicja obiektu `window.ENV`)

## Publikowanie

Ogólnodostępna wersja hostowana jest przy pomocy GitHub Pages i Cloudflare. Do publikowania aplikacji służy polecenie `grunt deploy`.

## Licencja

Autorem Fakturamy jest [Kuba Kuźma](https://kubakuzma.com/). Kod aplikacji udostępniany jest na zasadach licencji [MIT](https://raw.githubusercontent.com/cowbell/fakturama/master/LICENSE).
