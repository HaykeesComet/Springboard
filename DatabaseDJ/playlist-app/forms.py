"""Forms for playlist app."""

from wtforms import StringField, SelectField
from flask_wtf import FlaskForm
from wtforms.validators import InputRequired

class PlaylistForm(FlaskForm):
    """Form for adding playlists."""
    name = StringField('Name', validators=[InputRequired()])
    description = StringField('Description', validators=[InputRequired()])

class SongForm(FlaskForm):
    """Form for adding songs."""
    playlist_id = SelectField('Playlist ID', coerce=int)
    song_id = StringField('Song ID', validators=[InputRequired()])

class NewSongForPlaylistForm(FlaskForm):
    """Form for adding a song to playlist."""
    song = SelectField('Song To Add', coerce=int)
