О проекте: 
SPA на React: каталог товаров, корзина, заказы пользователя, авторизация по JWT, цифровая пагинация, уведомления.

Стек:
React, React Router, axios, react‑toastify. Сборка: CRA (create‑react‑app). Деплой: Railway Static Site.


Архитектура проекта:

marketplace-frontend/
├─ build/                     # продакшн‑сборка (генерируется npm run build)
├─ node_modules/              # зависимости (в Git не храним)
├─ public/
│  └─ index.html              # HTML‑шаблон для SPA
├─ src/
│  ├─ api/
│  │  └─ products.js          # функции работы с товарами (getProducts и т.п.)
│  ├─ components/
│  │  ├─ Cart.js              # компонент корзины (отображение, изменение qty)
│  │  ├─ LoginForm.js         # форма входа (отправка cred, обработка ошибок)
│  │  ├─ MyOrders.js          # список заказов пользователя (пагинация, next)
│  │  ├─ NavBar.js            # навигация (isAuthenticated, logout)
│  │  ├─ Pagination.js        # UI‑компонент пагинации (исп. usePagination)
│  │  ├─ Product.js           # карточка товара
│  │  └─ ProductList.js       # список товаров
│  ├─ pages/
│  │  ├─ Catalog.js           # страница каталога (интегр. пагинацию, загрузку)
│  │  ├─ Home.js              # главная
│  │  └─ Login.js             # страница логина (оборачивает LoginForm)
│  ├─ App.css                 # общие стили
│  ├─ App.js                  # корневой компонент (роуты, ToastContainer)
│  ├─ axiosInstance.js        # axios с базовым URL, токеном и refresh‑перехватчиком
│  ├─ index.css               # базовые стили
│  ├─ index.js                # входная точка React (render <App />)
│  ├─ logo.svg                # ассеты
│  ├─ reportWebVitals.js      # метрики (CRA)
│  └─ setupTests.js           # тестовая конфигурация (CRA)
├─ .env                       # переменные окружения фронта (не коммитить в паблик)
├─ .gitignore                 # исключения Git
├─ package.json               # зависимости и npm‑скрипты
├─ package-lock.json          # lock‑файл npm
├─ README.md                  # этот файл
└─ static.json                # (опционально) подсказки статическому хосту/rewrites


Ключевые узлы:
axiosInstance.js
Добавляет Authorization: Bearer <access> ко всем запросам; при 401 запрашивает /users/token/refresh/, повторяет оригинальный запрос, при неудаче — чистит токены и редиректит на /login.
Pagination.js + usePagination
Рендерит цифровую пагинацию. Хук возвращает массив страниц и DOTS; компонент мапит это в кнопки.
Cart.js / ProductList.js / MyOrders.js
Основные точки пользовательского потока: добавление в корзину, оформление заказа, просмотр заказов.


Маршруты SPA:
/ — главная
/products — каталог товаров
/cart — корзина
/my-orders — заказы пользователя
/login — вход