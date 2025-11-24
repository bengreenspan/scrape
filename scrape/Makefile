PY=python3
PIP=pip3
VENV=.venv

venv:
	$(PY) -m venv $(VENV)
	. $(VENV)/bin/activate; $(PIP) install -U pip

install:
	. $(VENV)/bin/activate; $(PIP) install -r requirements.txt

run:
	. $(VENV)/bin/activate; $(PY) -m src.scraper.main
