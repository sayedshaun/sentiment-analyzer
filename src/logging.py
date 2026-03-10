import logging
from logging.handlers import RotatingFileHandler
import os

LOG_DIR = "logs"  # Directory to store log files
os.makedirs(LOG_DIR, exist_ok=True)  # Ensure the log directory exists
LOG_FILE = os.path.join(LOG_DIR, "app.log")  # Name of the log file


def configure_logger(name: str = __name__) -> logging.Logger:
    """
    Configure and return a logger that logs to both console and a file.
    """
    logger = logging.getLogger(name)

    if not logger.hasHandlers():  # Prevent adding handlers multiple times
        logger.setLevel(logging.INFO)

        # ----- Console Handler -----
        ch = logging.StreamHandler()
        ch.setLevel(logging.INFO)
        ch_formatter = logging.Formatter(
            "%(asctime)s - %(levelname)s - %(message)s", datefmt="%Y-%m-%d %H:%M:%S"
        )
        ch.setFormatter(ch_formatter)
        logger.addHandler(ch)

        # ----- File Handler -----
        # Ensure the directory exists
        log_dir = os.path.dirname(LOG_FILE)
        if log_dir and not os.path.exists(log_dir):
            os.makedirs(log_dir)

        fh = RotatingFileHandler(
            LOG_FILE, maxBytes=5 * 1024 * 1024, backupCount=3
        )  # 5 MB per file, keep 3 backups
        fh.setLevel(logging.INFO)
        fh_formatter = logging.Formatter(
            "%(asctime)s - %(levelname)s - %(name)s - %(message)s",
            datefmt="%Y-%m-%d %H:%M:%S",
        )
        fh.setFormatter(fh_formatter)
        logger.addHandler(fh)

    return logger
