exports.up = (pgm) => {
  pgm.sql(`
    ALTER TABLE open_places
    ADD COLUMN verification_code TEXT NOT NULL;
  `)
}

exports.down = (pgm) => {
  pgm.sql(`
    ALTER TABLE open_places
    DROP COLUMN verification_code;
`)
}
