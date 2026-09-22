/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_1687431684")

  // add field
  collection.fields.addAt(6, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "text195033011",
    "max": 0,
    "min": 0,
    "name": "groom_name",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  // add field
  collection.fields.addAt(7, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "text374603105",
    "max": 0,
    "min": 0,
    "name": "groom_parents",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  // add field
  collection.fields.addAt(8, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "text3314410471",
    "max": 0,
    "min": 0,
    "name": "bride_name",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  // add field
  collection.fields.addAt(9, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "text2700205534",
    "max": 0,
    "min": 0,
    "name": "bride_parents",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  // add field
  collection.fields.addAt(10, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "text1789339898",
    "max": 0,
    "min": 0,
    "name": "akad_time",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  // add field
  collection.fields.addAt(11, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "text857015289",
    "max": 0,
    "min": 0,
    "name": "resepsi_time",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  // add field
  collection.fields.addAt(12, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "text358611500",
    "max": 0,
    "min": 0,
    "name": "address_detail",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  // add field
  collection.fields.addAt(13, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "text772028868",
    "max": 0,
    "min": 0,
    "name": "maps_url",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  // add field
  collection.fields.addAt(14, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "text4098043016",
    "max": 0,
    "min": 0,
    "name": "bank_name",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  // add field
  collection.fields.addAt(15, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "text1403141642",
    "max": 0,
    "min": 0,
    "name": "bank_account",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  // add field
  collection.fields.addAt(16, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "text4140648384",
    "max": 0,
    "min": 0,
    "name": "bank_holder",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  // add field
  collection.fields.addAt(17, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "text1802619892",
    "max": 0,
    "min": 0,
    "name": "quote",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  // add field
  collection.fields.addAt(18, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "text98176952",
    "max": 0,
    "min": 0,
    "name": "template_id",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1687431684")

  // remove field
  collection.fields.removeById("text195033011")

  // remove field
  collection.fields.removeById("text374603105")

  // remove field
  collection.fields.removeById("text3314410471")

  // remove field
  collection.fields.removeById("text2700205534")

  // remove field
  collection.fields.removeById("text1789339898")

  // remove field
  collection.fields.removeById("text857015289")

  // remove field
  collection.fields.removeById("text358611500")

  // remove field
  collection.fields.removeById("text772028868")

  // remove field
  collection.fields.removeById("text4098043016")

  // remove field
  collection.fields.removeById("text1403141642")

  // remove field
  collection.fields.removeById("text4140648384")

  // remove field
  collection.fields.removeById("text1802619892")

  // remove field
  collection.fields.removeById("text98176952")

  return app.save(collection)
})
