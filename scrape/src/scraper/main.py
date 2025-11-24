import sys
from .gnw_scraper import process_file


def main(argv=None) -> None:
    """
    Usage:
        python -m src.scraper.main input.csv output.csv

    Where input.csv has NO header and rows like:
        Ticker,Date,Headline
    """
    if argv is None:
        argv = sys.argv[1:]

    if len(argv) != 2:
        print("Usage: python -m src.scraper.main input.csv output.csv", file=sys.stderr)
        sys.exit(1)

    input_csv, output_csv = argv
    process_file(input_csv, output_csv)


if __name__ == "__main__":
    main()