exports.up = pgm => {
  pgm.sql('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
  pgm.createTable('open_places', {
    id: {type: 'uuid', default: pgm.func('uuid_generate_v4()'), primaryKey: true, notNull: true},
    phone_number: { type: 'text', notNull: true },
    address: { type: 'text', notNull: true },
    zip: { type: 'text', notNull: true },
    city: { type: 'text', notNull: true },
    extras: { type: 'text', notNull: false }
  })
}

exports.down = pgm => {
  pgm.dropTable('open_places')
}
