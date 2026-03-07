import tempfile
from pydub import AudioSegment


def convert_to_wav(audio_path: str) -> str:
    """
    Convert any audio format to 16kHz mono WAV
    Returns path to temporary WAV file
    """
    audio = AudioSegment.from_file(audio_path)
    audio = audio.set_channels(1).set_frame_rate(16000)

    tmp_file = tempfile.NamedTemporaryFile(delete=False, suffix=".wav").name
    audio.export(tmp_file, format="wav")
    return tmp_file


def chunk_audio(audio_path: str, chunk_length_ms: int) -> list[str]:
    """
    Split WAV audio into chunks (temp files)
    Returns list of chunk file paths
    """
    audio = AudioSegment.from_file(audio_path)
    chunk_files = []

    for i in range(0, len(audio), chunk_length_ms):
        chunk = audio[i : i + chunk_length_ms]
        tmp_file = tempfile.NamedTemporaryFile(delete=False, suffix=".wav").name
        chunk.export(tmp_file, format="wav")
        chunk_files.append(tmp_file)

    return chunk_files
