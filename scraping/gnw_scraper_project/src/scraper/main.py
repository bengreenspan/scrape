import sys
import os
from .gnw_scraper import process_file

def main():
    if len(sys.argv) != 3:
        print("Usage: python -m src.scraper.main <input_csv> <output_csv>")
        sys.exit(1)
        
    input_path = sys.argv[1]
    output_path = sys.argv[2]
    
    if not os.path.exists(input_path):
        print(f"Error: Input file '{input_path}' not found.")
        sys.exit(1)
        
    process_file(input_path, output_path)

if __name__ == "__main__":
    main()
