# Makefile for docs

.PHONY: testlink

testlink:
	lychee -b . --verbose --exclude '%23.*' './**/*.md'
