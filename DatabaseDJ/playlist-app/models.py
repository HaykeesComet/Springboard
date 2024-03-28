"""Models for Playlist app."""

from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Playlist(db.Model):
    """Playlist."""
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), index=True, unique=True, nullable=False)
    description = db.Column(db.String(200), index=True, unique=False, nullable=True)
    songs = db.relationship('Song', backref='playlist', lazy='dynamic', cascade="all, delete, delete-orphan")

    def __repr__(self):
        return f"ID: {self.id}, Playlist: {self.name}"

class Song(db.Model):
    """Song."""
    id = db.Column(db.Integer, primary_key=True)
    playlist_id = db.Column(db.Integer, db.ForeignKey('playlist.id'), nullable=False)
    song_id = db.Column(db.Integer, db.ForeignKey('playlistsong.id'), nullable=False)

    def __repr__(self):
        return f"ID: {self.id}, Playlist ID: {self.playlist_id}, Song ID: {self.song_id}"

class PlaylistSong(db.Model):
    """Mapping of a playlist to a song."""
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), index=True, unique=False)
    artist = db.Column(db.String(100), index=True, unique=False)
    song_id = db.Column(db.Integer, db.ForeignKey('song.id'), nullable=False)  # Update foreign key
    songs = db.relationship('Song', backref='playlist_song', lazy='dynamic', cascade="all, delete, delete-orphan")

    def __repr__(self):
        return f"ID: {self.id}, Song: {self.title}, Artist: {self.artist}"
