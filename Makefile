
build: sum_test

test: build
	./sum_test || (echo "failure")

clean:
	rm -f sum_test


sum_test: sum_test.cpp sum.h
	g++ -std=c++2a -I . -o sum_test sum_test.cpp
	chmod +x sum_test


.PHONY: build test clean
