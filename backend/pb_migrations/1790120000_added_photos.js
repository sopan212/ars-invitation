/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_1687431684")

  // add field
  collection.fields.addAt(19, new Field({
    "hidden": false,
    "id": "file8301200451",
    "maxSelect": 1,
    "maxSize": 5242880,
    "mimeTypes": ["image/jpeg", "image/png", "image/webp", "image/jpg"],
    "name": "photo_bg",
    "presentable": false,
    "protected": false,
    "required": false,
    "system": false,
    "thumbs": [],
    "type": "file"
  }))

  // add field
  collection.fields.addAt(20, new Field({
    "hidden": false,
    "id": "file2913405776",
    "maxSelect": 10,
    "maxSize": 5242880,
    "mimeTypes": ["image/jpeg", "image/png", "image/webp", "image/jpg"],
    "name": "gallery",
    "presentable": false,
    "protected": false,
    "required": false,
    "system": false,
    "thumbs": [],
    "type": "file"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1687431684")

  // remove field
  collection.fields.removeById("file8301200451")

  // remove field
  collection.fields.removeById("file2913405776")

  return app.save(collection)
})
