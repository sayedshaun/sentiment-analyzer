import litserve as ls
from tts.infer import ASRLitAPI


def main():
    asr_api = ASRLitAPI(api_path="/transcribe")
    server = ls.LitServer(asr_api)
    server.run(port=8000, generate_client_file=False)


if __name__ == "__main__":
    main()
