exports.up = pgm => {
  pgm.sql('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
  pgm.createTable('public_information', {
    id: {type: 'uuid', default: pgm.func('uuid_generate_v4()'), primaryKey: true, notNull: true},
    information: { type: 'text', notNull: true },
    lat: { type: 'text', notNull: true },
    long: { type: 'text', notNull: true },
    expires: { type: 'timestamp', notNull: true },
    created_at: { type: 'timestamp', notNull: true, default: pgm.func('NOW()') }
  })
}

exports.down = pgm => {
  pgm.dropTable('public_information')
}
