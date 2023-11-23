# Plantify
Plantify is a wiki app about plants.

</br>
</br>

## Resources
- [ionic framework](https://ionicframework.com)
- [@capacitor-community/sqlite](https://github.com/capacitor-community/sqlite)
- [ionic7-angular-sqlite-starter - jepiqueau](https://github.com/jepiqueau/ionic7-angular-sqlite-starter)
- [CRUD App Example Tutorial - @capacitor-community/sqlite](https://jepiqueau.github.io/2023/08/26/Ionic7Angular-SQLite-CRUD-App.html)

</br>
</br>

## Features
- [x] Cross plantaform
- [ ] Local database for caching
- [ ] Find a plant using a picture

</br>
</br>

## Important
You need to copy manually the sqlite wasm file so the app can run on the web.
[Web Quirks - @capacitor-community/sqlite](https://github.com/capacitor-community/sqlite/tree/master#web-quirks)

- unix: `cp node_modules/sql.js/dist/sql-wasm.wasm src/assets`
- powershell: `Copy-Item -Path node_modules/sql.js/dist/sql-wasm.wasm -Destination src/assets`
