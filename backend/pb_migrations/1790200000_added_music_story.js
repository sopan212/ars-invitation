/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_1687431684")

  // music_url — file MP3 custom (max 10MB) atau URL lagu bawaan
  collection.fields.addAt(21, new Field({
    "hidden": false,
    "id": "file4008001200",
    "maxSelect": 1,
    "maxSize": 10485760,
    "mimeTypes": ["audio/mpeg", "audio/mp3", "audio/mpeg3"],
    "name": "music_url",
    "presentable": false,
    "protected": false,
    "required": false,
    "system": false,
    "thumbs": [],
    "type": "file"
  }))

  // music_track — nama lagu bawaan (dari /public/music/) kalau user tidak upload
  collection.fields.addAt(22, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "text4012008800",
    "max": 100,
    "min": 0,
    "name": "music_track",
    "pattern": "",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  // story_mood — suasana cerita premium (default dari template)
  collection.fields.addAt(23, new Field({
    "hidden": false,
    "id": "bool4016004400",
    "name": "story_mood",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "bool"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1687431684")

  collection.fields.removeById("file4008001200")
  collection.fields.removeById("text4012008800")
  collection.fields.removeById("bool4016004400")

  return app.save(collection)
})
