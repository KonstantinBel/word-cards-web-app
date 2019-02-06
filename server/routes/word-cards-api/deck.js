const express = require('express');
const deckCon = require('../../controllers/deck');
const { permissions } = require('../../middlewares');

const router = express.Router();
const { siteEditorAccess, userAccess } = permissions;

router.post('/get', siteEditorAccess, deckCon.get); // {"name": "...", "level": 1, "type": "...", "rubricId": 1, "userId": 1}

// TODO:
// создаем новый набор, требования такие же как для custom-add
// кроме возможности передать любой type
router.post('/add', siteEditorAccess, deckCon.add); // {"name": "...", "level": 1, "type": "...", "rubricId": 1, subjects: [], words: [], languageId: 1}

// удаляем любой набор
router.post('/remove', siteEditorAccess, deckCon.remove); // {"id": 1}

// отдаем названия и id наборов, с указанной рубрикой, уровнем и типом
// (тип private отдаем только если набор принадлежит текущему пользователю)
// если передать type: self должны отдать только набора этого пользователя
router.post('/custom-get', userAccess, deckCon.customGet); // {"name": "...", "level": 1, "type": "public" || "paid" || "self", "rubricId": 1}

// пользователь добавляет себе набор
// платные наборы пока добавляем так же как обычные
router.post('/custom-take', userAccess, deckCon.customTake); // {"id": 1}

// пользователь удаляет набор из своего списка
router.post('/custom-remove', userAccess, deckCon.customRemove); // {"id": 1}

// пользователь создает пустой набор
// type автоматом private, rubric не обязательно
// но должна быть возможность передать id рубрики для привязки
// предусмотреть возможность передачи списка
// subjects (сущности слов, при копировании из другого списка)
// или списка слов массивом (в таком случае обязательно должен быть передан langId)
router.post('/custom-add', userAccess, deckCon.customAdd); // {"name": "...", rubricId: 1, subjects: [], words: [], languageId: 1}

module.exports = router;
