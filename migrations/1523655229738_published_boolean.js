exports.up = (pgm) => {
  pgm.sql(`
    ALTER TABLE open_places
    ADD COLUMN published boolean DEFAULT false;
  `)
}

exports.down = (pgm) => {
  pgm.sql(`
    ALTER TABLE open_places
    DROP COLUMN published;
`)
}
