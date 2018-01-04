# Fakturama

Fakturama to prosta aplikacja do fakturowania, napisana w całości w języku JavaScript, z wykorzystaniem frameworka [Ember](http://emberjs.com/). Dane składowane są w bazie danych [Firebase](https://www.firebase.com/), kursy walut ściąganę są za pośrednictwem [YQL](http://developer.yahoo.com/yql/) z serwerów [Narodowego Banku Polskiego](http://www.nbp.pl/kursy/xml/). Ogólnodostępna wersja aplikacji znajduje się pod adresem [https://fakturama.pl/](https://fakturama.pl/), ale nic nie stoi na przeszkodzie, aby uruchomić własną.

## Uruchamianie środowiska programistycznego

Aby uruchomić aplikację lokalnie, musisz posiadać node.js (wersja w okolicy 8.9.0) i yarn (okolice 1.3.2). Wszelkie zależności aplikacji instalowane są po wywołaniu `yarn install`. Aby uruchomić lokalną wersję serwera w środowisku `development`, należy uruchomić polecenie `ember server` i otworzyć w przeglądarce adres [http://localhost:8000/](http://localhost:8000/).

## Budowanie wersji produkcyjnej

Do budowania wersji produkcyjnej aplikacji służy polecenie `ember build --environment production`. Po wykonaniu polecenia w katalogu `dist` powinno znajdować się kilka plików, wśród których najważniejsze to:

* `index.html` - strona startowa
* `assets/fakturama.xxxxxxxx.css` - arkusz styli
* `assets/fakturama.xxxxxxxx.js` - kod źródłowy aplikacji
* `assets/vendor.xxxxxxxx.js` - kod źródłowy zależności (zewnętrznych bibliotek)
* `assets/vendor.xxxxxxxx.css` - arkusz styli zależności

## Publikowanie

Ogólnodostępna wersja hostowana jest przy pomocy [GitHub Pages](https://pages.github.com/) i [Cloudflare](https://www.cloudflare.com/). Do publikowania aplikacji służy polecenie `grunt deploy`.

## Licencja

Autorem Fakturamy jest [Kuba Kuźma](https://kubakuzma.com/). Kod aplikacji udostępniany jest na zasadach licencji [MIT](https://raw.githubusercontent.com/cowbell/fakturama/master/LICENSE).
