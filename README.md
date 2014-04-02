# Fakturama

Fakturama to prosta aplikacja do fakturowania, napisana w całości w języku JavaScript, z wykorzystaniem frameworka Ember.js. Dane składowane są w bazie danych Firebase, kursy walut ściąganę są za pośrednictwem YQL z serwerów Narodowego Banku Polskiego. Ogólnodostępna wersja aplikacji znajduje się pod adresem https://fakturama.pl/, ale nic nie stoi na przeszkodzie, aby uruchomić własną.

## Uruchamianie środowiska programistycznego

Aby uruchomić aplikację lokalnie, musisz posiadać node.js (wersja w okolicy 0.10.26) i npm (okolice 1.4.3). Wszelkie zależności aplikacji instalowane są po wywołaniu `npm install`. Aby uruchomić lokalną wersję serwera w środowisku `development`, należy uruchomić polecenie `grunt server` i otworzyć w przeglądarce adres http://localhost:8000/.

## Budowanie wersji produkcyjnej

Do budowania wersji produkcyjnej aplikacji służy polecenie `grunt dist`.

## Publikowanie

Ogólnodostępna wersja hostowana jest przy pomocy GitHub Pages i Cloudflare. Do publikowania aplikacji służy polecenie `grunt deploy`.

## Licencja

Autorem Fakturamy jest Kuba Kuźma. Kod aplikacji udostępniany jest na zasadach licencji MIT.
