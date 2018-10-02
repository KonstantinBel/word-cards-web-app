module.exports = function (db) {
  console.log('Inserting default data');

  let userVar, descVar

  return Promise.resolve()
    .then(() => db.Rubric.create({rubric_id: 1, name: 'test rubric 1'}))
    .then(() => db.Rubric.create({rubric_id: 2, name: 'test rubric 2'}))

    .then(() => db.User.create({user_id: 1, local_name: 'Test User', email: 'test@user.ru', access_group: 'user', password: '123'}))
    .then((user) => {user.createDesc({desc_id: 1, name: 'test desc 1', rubric_id: 1}); return user})
    .then((user) => {user.createDesc({desc_id: 2, name: 'test desc 2', rubric_id: 2}); return user})

    .then(() => db.User.create({user_id: 2, local_name: 'Test Admin', email: 'test@admin.ru', access_group: 'admin', password: '123'}))
    .then((user) => {user.createDesc({desc_id: 3, name: 'test desc 3', rubric_id: 1}); return user})
    .then((user) => {user.createDesc({desc_id: 4, name: 'test desc 4', rubric_id: 2}); return user})

    .then(() => db.Desc.findById(1))
    .then((desc) => {desc.createWord({word_id: 1, russian: 'курица', english: 'chicken', german: 'hähnchen'}); return desc})
    .then((desc) => {desc.createWord({word_id: 2, russian: 'говядина', english: 'beef', german: 'rindfleisch'}); return desc})
    .then((desc) => {desc.createWord({word_id: 3, russian: 'свинина', english: 'pork', german: 'schweinefleisch'}); return desc})

    .then(() => db.Desc.findById(2))
    .then((desc) => {desc.createWord({word_id: 4, russian: 'курица', english: 'chicken', german: 'hähnchen'}); return desc})
    .then((desc) => {desc.createWord({word_id: 5, russian: 'говядина', english: 'beef', german: 'rindfleisch'}); return desc})
    .then((desc) => {desc.createWord({word_id: 6, russian: 'свинина', english: 'pork', german: 'schweinefleisch'}); return desc})

    .then(() => db.Desc.findById(3))
    .then((desc) => {desc.createWord({word_id: 7, russian: 'курица', english: 'chicken', german: 'hähnchen'}); return desc})
    .then((desc) => {desc.createWord({word_id: 8, russian: 'говядина', english: 'beef', german: 'rindfleisch'}); return desc})
    .then((desc) => {desc.createWord({word_id: 9, russian: 'свинина', english: 'pork', german: 'schweinefleisch'}); return desc})

    .then(() => db.Desc.findById(4))
    .then((desc) => {desc.createWord({word_id: 10, russian: 'курица', english: 'chicken', german: 'hähnchen'}); return desc})
    .then((desc) => {desc.createWord({word_id: 11, russian: 'говядина', english: 'beef', german: 'rindfleisch'}); return desc})
    .then((desc) => {desc.createWord({word_id: 12, russian: 'свинина', english: 'pork', german: 'schweinefleisch'}); return desc})

    .then(() => db.Language.create({language_id: 1, name: 'russian'}))
    .then(() => db.Language.create({language_id: 2, name: 'english'}))
    .then(() => db.Language.create({language_id: 3, name: 'german'}))
}
