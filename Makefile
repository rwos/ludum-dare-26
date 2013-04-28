JS_FILES=game.js.gz global.js.gz levels.js.gz run.js.gz world.js.gz
HTML_FILES=index.html.gz

all: $(JS_FILES) $(HTML_FILES)

%.gz: %
	gzip -c $^ > $@

clean:
	rm -f $(JS_FILES) $(HTML_FILES)

