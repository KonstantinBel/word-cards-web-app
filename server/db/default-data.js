const db = require('../models')

module.exports = function () {
  return Promise.resolve()

    // Materials sport
    .then(() => {
      db.Img.create({
        img_id: 7,
        name: 'no_hand',
        file_name: 'no_hand',
        file_path: '/static-img/materials/sport/'
      })
    })
    .then(() => {
      db.Img.create({
        img_id: 8,
        name: 'velo_razvod',
        file_name: 'velo_razvod',
        file_path: '/static-img/materials/sport/'
      })
    })
    .then(() => {
      db.Img.create({
        img_id: 9,
        name: 'velo_itogi_2017',
        file_name: 'velo_itogi_2017',
        file_path: '/static-img/materials/sport/'
      })
    })

    // Material travel
    .then(() => {
      db.Img.create({
        img_id: 10,
        name: 'krugosvet',
        file_name: 'krugosvet',
        file_path: '/static-img/materials/travel/'
      })
    })
    .then(() => {
      db.Img.create({
        img_id: 11,
        name: 'tailand',
        file_name: 'tailand',
        file_path: '/static-img/materials/travel/'
      })
    })
    .then(() => {
      db.Img.create({
        img_id: 12,
        name: 'mesta_rossii',
        file_name: 'mesta_rossii',
        file_path: '/static-img/materials/travel/'
      })
    })

    // Materials pograming
    .then(() => {
      db.Img.create({
        img_id: 13,
        name: 'MPI_tech',
        file_name: 'MPI_tech.png',
        file_path: '/static-img/materials/programing/'
      })
    })
    .then(() => {
      db.Img.create({
        img_id: 14,
        name: 'openMP_book',
        file_name: 'openMP_book.png',
        file_path: '/static-img/materials/programing/'
      })
    })
    .then(() => {
      db.Img.create({
        img_id: 15,
        name: 'analise_alg',
        file_name: 'analise_alg.png',
        file_path: '/static-img/materials/programing/'
      })
    })

    // Banners
    .then(() => {
      db.Img.create({
        img_id: 16,
        name: 'example',
        file_name: 'example.png',
        file_path: '/static-img/banners/'
      })
    })
    .then(() => {
      db.Banner.create({
        id: 1,
        slot: 1,
        url: 'http://snowboards.com',
        text: 'Купить новый отличный сноуборд!',
        img_id: 16
      })
    })
    .then(() => {
      db.Banner.create({
        id: 2,
        slot: 1,
        url: 'http://velo.ru',
        text: 'Распродажа велосипедов',
        img_id: 16
      })
    })
    .then(() => {
      db.Banner.create({
        id: 3,
        slot: 1,
        url: 'http://putevka.ru',
        text: 'Горячие туры',
        img_id: 16
      })
    })
    .then(() => {
      db.Banner.create({
        id: 4,
        slot: 1,
        url: 'http://tickets.ru',
        text: 'Дешевые билеты',
        img_id: 16
      })
    })
    .then(() => {
      db.Banner.create({
        id: 5,
        slot: 1,
        url: 'http://academy.ru',
        text: 'Курсы для программистов',
        img_id: 16
      })
    })
    .then(() => {
      db.Banner.create({
        id: 6,
        slot: 1,
        url: 'http://it-books.ru',
        text: 'Лучшие книги по IT',
        img_id: 16
      })
    })
    .then(() => {
      db.Banner.create({
        id: 7,
        slot: 1,
        url: 'http://spring2017.ru',
        text: 'Специальное ИТОГОВОЕ предложение',
        img_id: 16
      })
    })

    // Infos
    .then(() => {
      db.Info.create({
        id: 1,
        slot: 1,
        text: 'Специальная информация для путешественников'
      })
    })
    .then(() => {
      db.Info.create({
        id: 2,
        slot: 1,
        text: 'Дополнительная заметка про итоги года'
      })
    })
}
