# Neko TODO

## 1. Browser JavaScript

### 1. Документ
- [ ] 1.1 Браузерне середовище, специфікації
- [ ] 1.2 DOM дерево
- [ ] 1.3 Навігація по DOM
- [ ] 1.4 Пошук: getElement*, querySelector*
- [ ] 1.5 Властивості вузлів: тип, тег та вміст
- [ ] 1.6 Атрибути та властивості
- [ ] 1.7 Внесення змін в документ
- [ ] 1.8 Стилі та класи
- [ ] 1.9 Розмір і прокрутка елемента
- [ ] 1.10 Розміри вікна і прокрутка
- [ ] 1.11 Координати

### 2. Вступ до подій
- [ ] 2.1 Вступ до подій браузера
- [ ] 2.2 Бульбашковий механізм (спливання та занурення)
- [ ] 2.3 Делегування подій
- [ ] 2.4 Типові дії браузера
- [ ] 2.5 Запуск користувацьких подій

### 3. Події інтерфейсу
- [ ] 3.1 Події миші
- [ ] 3.2 Переміщення миші: mouseover/out, mouseenter/leave
- [ ] 3.3 Drag'n'Drop з подіями миші
- [ ] 3.4 Події вказівника
- [ ] 3.5 Клавіатура: keydown та keyup
- [ ] 3.6 Прокрутка

### 4. Форми та інтерактивні елементи
- [ ] 4.1 Властивості та методи форми
- [ ] 4.2 Фокусування: focus/blur
- [ ] 4.3 Події: change, input, cut, copy, paste
- [ ] 4.4 Форми: подія та метод submit

### 5. Завантаження документа і ресурсів
- [ ] 5.1 Сторінка: DOMContentLoaded, load, beforeunload, unload
- [ ] 5.2 Скрипти: async, defer
- [ ] 5.3 Завантаження ресурсів: onload та onerror

### 6. Різне
- [ ] 6.1 Mutation Observer (спостерігач за мутаціями)
- [ ] 6.2 Selection і Range
- [ ] 6.3 Цикл подій (event loop): мікрозавдання (microtasks) та макрозавдання (macrotasks)

## 2. Neko Web
- [ ] Plan pages
- [ ] Structure
- [ ] Create project
- [ ] Main page
- [ ] Header / navigation
- [ ] Login page
- [ ] Main Neko UI
- [ ] Notes UI
- [ ] Sport UI

## 3. Backend
- [ ] Backend
- [ ] API
- [ ] Database
- [ ] Registration
- [ ] Authorization
- [ ] Bind data to user
- [ ] Notes -> API
- [ ] Sport -> API
- [ ] Neko Core -> Web
- [ ] Mobile test
- [ ] Responsive layout
- [ ] Deploy

## 4. Swift
- [ ] Syntax
- [ ] let / var / types
- [ ] Functions
- [ ] Optionals
- [ ] struct / class
- [ ] Protocols
- [ ] Closures
- [ ] async / await
- [ ] SwiftUI basics
- [ ] First screen
- [ ] Run Neko on own iPhone

## 5. iPhone sensors
- [ ] Location permission
- [ ] Latitude / longitude
- [ ] GPS accuracy
- [ ] Speed
- [ ] Course
- [ ] Heading
- [ ] headingAccuracy
- [ ] Live debug display

## 6. Direction
- [ ] Detect moving / stopped
- [ ] Stop delay: 0.5 seconds
- [ ] Stopped: course -> heading
- [ ] Moving: heading -> course
- [ ] Smooth direction jumps
- [ ] Bearing to target

## 7. Live arrow
- [ ] Draw arrow
- [ ] Rotate according to direction
- [ ] Account for headingAccuracy
- [ ] Point to coordinate
- [ ] Test while walking
- [ ] Test while stopped
- [ ] Test phone rotation

## 8. Neko integration
- [ ] Pass location state to Neko
- [ ] Neko understands where the user is
- [ ] Neko understands where the phone/user is facing
- [ ] Neko understands movement direction
- [ ] Build direction to target
- [ ] Guide with live arrow
- [ ] Combine TS Core + Web + iPhone
