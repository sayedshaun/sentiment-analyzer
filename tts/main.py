import litserve as ls
from tts.script import ASRLitAPI

def main():
    asr_api = ASRLitAPI()
    server = ls.LitServer(asr_api)
    server.run(port=8000)


if __name__ == "__main__":
    main()